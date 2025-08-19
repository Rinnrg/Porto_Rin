<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CVFile;
use App\Services\PostgreSQLService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CVController extends Controller
{
    // Get current CV (public endpoint)
    public function index()
    {
        try {
            $cv = CVFile::getCurrentCV();
            
            if (!$cv) {
                return response()->json([
                    'success' => false,
                    'message' => 'No CV found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $cv
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch CV',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Get current CV (for admin) - since we only have one CV
    public function all()
    {
        try {
            $cv = CVFile::getCurrentCV();
            
            // Return as array for compatibility with frontend
            $cvs = $cv ? [$cv] : [];
            
            return response()->json([
                'success' => true,
                'data' => $cvs
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch CVs',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Upload new CV
    public function upload(Request $request)
    {
        try {
            \Log::info('CV Upload started', [
                'user_id' => auth()->id(),
                'user' => auth()->user() ? auth()->user()->username : 'none',
                'request_data' => $request->all()
            ]);

            $validator = Validator::make($request->all(), [
                'file' => 'required|file|mimes:pdf|max:5120', // Max 5MB
                'description' => 'nullable|string|max:500'
            ]);

            if ($validator->fails()) {
                \Log::warning('CV Upload validation failed', ['errors' => $validator->errors()]);
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $file = $request->file('file');
            $description = $request->input('description', '');

            \Log::info('CV Upload file details', [
                'original_name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'mime_type' => $file->getMimeType()
            ]);

            // Generate unique filename
            $fileName = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.pdf';
            
            \Log::info('CV Upload storing file', ['file_name' => $fileName]);
            
            // Store file in public disk
            $filePath = $file->storeAs('cv', $fileName, 'public');
            $fileUrl = Storage::url($filePath);

            \Log::info('CV Upload file stored', [
                'file_path' => $filePath,
                'file_url' => $fileUrl
            ]);

            // Get file size in MB
            $fileSizeBytes = $file->getSize();
            $fileSizeMB = round($fileSizeBytes / (1024 * 1024), 1) . ' MB';

            \Log::info('CV Upload creating database record');

            // Delete old CV files before creating new one (keep only one CV)
            $oldCVs = CVFile::all();
            foreach ($oldCVs as $oldCV) {
                \Log::info('Deleting old CV', ['old_cv_id' => $oldCV->id]);
                
                // Delete file from storage
                if (Storage::disk('public')->exists($oldCV->file_path)) {
                    Storage::disk('public')->delete($oldCV->file_path);
                }
                
                // Delete database record
                $oldCV->delete();
            }

            // Create CV record with integer values for PostgreSQL compatibility
            $cv = CVFile::create([
                'file_name' => $fileName,
                'original_name' => $file->getClientOriginalName(),
                'file_path' => $filePath,
                'file_url' => $fileUrl,
                'description' => $description,
                'file_size' => $fileSizeMB,
                'file_type' => $file->getMimeType(),
                'is_active' => 1, // Use integer 1 instead of boolean true
                'download_count' => 0,
            ]);

            \Log::info('CV Upload record created', ['cv_id' => $cv->id]);

            \Log::info('CV Upload completed successfully', ['cv_id' => $cv->id]);

            return response()->json([
                'success' => true,
                'message' => 'CV uploaded successfully',
                'data' => $cv
            ], 201);

        } catch (\Exception $e) {
            \Log::error('CV Upload failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload CV',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Update CV description
    public function updateDescription(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'description' => 'nullable|string|max:500'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $cv = CVFile::findOrFail($id);
            $cv->update([
                'description' => $request->input('description', '')
            ]);

            return response()->json([
                'success' => true,
                'message' => 'CV description updated successfully',
                'data' => $cv
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'CV not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update CV description',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Set CV as active
    public function setActive($id)
    {
        try {
            $cv = CVFile::findOrFail($id);
            $cv->setAsActive();

            return response()->json([
                'success' => true,
                'message' => 'CV set as active successfully',
                'data' => $cv
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'CV not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to set CV as active',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Download CV (increment counter)
    public function download($id)
    {
        try {
            $cv = CVFile::findOrFail($id);
            
            // Check if file exists
            if (!Storage::disk('public')->exists($cv->file_path)) {
                return response()->json([
                    'success' => false,
                    'message' => 'File not found'
                ], 404);
            }

            // Increment download count
            $cv->incrementDownload();

            // Return file download
            return Storage::disk('public')->download($cv->file_path, $cv->original_name);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'CV not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to download CV',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Delete CV
    public function delete($id)
    {
        try {
            $cv = CVFile::findOrFail($id);
            
            // If this is the active CV and there are other CVs, activate the most recent one
            if ($cv->is_active == 1) {
                $nextCv = CVFile::where('id', '!=', $id)->orderBy('created_at', 'desc')->first();
                if ($nextCv) {
                    $nextCv->setAsActive();
                }
            }

            // Delete the CV (file will be deleted automatically via model boot method)
            $cv->delete();

            return response()->json([
                'success' => true,
                'message' => 'CV deleted successfully'
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'CV not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete CV',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Public endpoint to get current CV for download
    public function publicDownload()
    {
        try {
            $cv = CVFile::getActiveCv();
            
            if (!$cv) {
                return response()->json([
                    'success' => false,
                    'message' => 'No CV available for download'
                ], 404);
            }

            // Increment download count
            $cv->incrementDownload();

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $cv->id,
                    'file_name' => $cv->original_name,
                    'download_url' => route('api.cv.download', $cv->id),
                    'file_url' => $cv->full_url
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get CV for download',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // View PDF with proper headers for embedding
    public function viewPDF($id)
    {
        try {
            $cv = CVFile::findOrFail($id);
            
            $filePath = storage_path('app/public/' . $cv->file_path);
            
            if (!file_exists($filePath)) {
                return response()->json([
                    'success' => false,
                    'message' => 'File not found'
                ], 404);
            }

            // Return as base64 for better compatibility
            $fileContent = file_get_contents($filePath);
            $base64 = base64_encode($fileContent);
            
            return response()->json([
                'success' => true,
                'data' => [
                    'content' => $base64,
                    'filename' => $cv->original_name,
                    'mime_type' => 'application/pdf'
                ]
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'CV not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load PDF',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
