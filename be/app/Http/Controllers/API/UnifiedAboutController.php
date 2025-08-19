<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\UnifiedAboutSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UnifiedAboutController extends Controller
{
    /**
     * Get all unified about sections
     */
    public function index()
    {
        try {
            $sections = UnifiedAboutSection::ordered()->get();
            
            return response()->json([
                'success' => true,
                'data' => $sections
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch sections: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get sections by type
     */
    public function getByType($type)
    {
        try {
            $validTypes = ['about', 'education', 'organization', 'workExperience', 'custom'];
            
            if (!in_array($type, $validTypes)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid section type'
                ], 400);
            }

            $sections = UnifiedAboutSection::byType($type)->ordered()->get();
            
            return response()->json([
                'success' => true,
                'data' => $sections
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch sections: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a new section
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'type' => 'required|in:about,education,organization,workExperience,custom',
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'subtitle' => 'nullable|string|max:255',
                'period' => 'nullable|string|max:255',
                'institution' => 'nullable|string|max:255',
                'degree' => 'nullable|string|max:255',
                'company' => 'nullable|string|max:255',
                'position' => 'nullable|string|max:255',
                'name' => 'nullable|string|max:255',
                'logo' => 'nullable|string|max:500', // Accept logo as URL string
                'image' => 'nullable|string|max:500', // Accept image as URL string
                'image_caption' => 'nullable|string|max:255',
                'section_title' => 'nullable|string|max:255',
                'sort_order' => 'nullable|integer'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $request->all();

            // Handle logo - no need to upload file since it's already a URL
            // Remove the old file upload logic since we're sending URLs now
            
            // Set sort order if not provided
            if (!isset($data['sort_order'])) {
                $maxOrder = UnifiedAboutSection::byType($data['type'])->max('sort_order') ?? 0;
                $data['sort_order'] = $maxOrder + 1;
            }

            $section = UnifiedAboutSection::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Section created successfully',
                'data' => $section
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create section: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show a specific section
     */
    public function show($id)
    {
        try {
            $section = UnifiedAboutSection::findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => $section
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Section not found'
            ], 404);
        }
    }

    /**
     * Update a section
     */
    public function update(Request $request, $id)
    {
        try {
            $section = UnifiedAboutSection::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'type' => 'sometimes|in:about,education,organization,workExperience,custom',
                'title' => 'sometimes|string|max:255',
                'content' => 'sometimes|string',
                'subtitle' => 'nullable|string|max:255',
                'period' => 'nullable|string|max:255',
                'institution' => 'nullable|string|max:255',
                'degree' => 'nullable|string|max:255',
                'company' => 'nullable|string|max:255',
                'position' => 'nullable|string|max:255',
                'name' => 'nullable|string|max:255',
                'logo' => 'nullable|string|max:500', // Accept logo as URL string
                'image' => 'nullable|string|max:500', // Accept image as URL string
                'image_caption' => 'nullable|string|max:255',
                'section_title' => 'nullable|string|max:255',
                'sort_order' => 'nullable|integer'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $request->all();

            // Handle logo - no need to upload file since it's already a URL
            // Remove the old file upload logic since we're sending URLs now

            $section->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Section updated successfully',
                'data' => $section->fresh()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update section: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a section
     */
    public function destroy($id)
    {
        try {
            $section = UnifiedAboutSection::findOrFail($id);

            // Delete logo if exists
            if ($section->logo) {
                $logoPath = str_replace('/storage/', '', $section->logo);
                Storage::disk('public')->delete($logoPath);
            }

            $section->delete();

            return response()->json([
                'success' => true,
                'message' => 'Section deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete section: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update sort order of sections
     */
    public function updateOrder(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'sections' => 'required|array',
                'sections.*.id' => 'required|exists:unified_about_sections,id',
                'sections.*.sort_order' => 'required|integer'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            foreach ($request->sections as $sectionData) {
                UnifiedAboutSection::where('id', $sectionData['id'])
                    ->update(['sort_order' => $sectionData['sort_order']]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Section order updated successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update order: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Upload logo for section
     */
    public function uploadLogo(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'file' => 'required|file|mimes:jpeg,png,jpg,gif,svg,webp|max:10240' // 10MB max, includes SVG
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $file = $request->file('file');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            
            // Store file
            $filePath = $file->storeAs('about-sections', $filename, 'public');
            
            // Return full URL with Laravel backend URL
            $baseUrl = env('APP_URL', 'http://localhost:8000');
            $fileUrl = $baseUrl . '/api/storage/about-sections/' . $filename;

            return response()->json([
                'success' => true,
                'message' => 'File uploaded successfully',
                'data' => [
                    'url' => $fileUrl,
                    'filename' => $filename,
                    'original_name' => $file->getClientOriginalName(),
                    'size' => $file->getSize(),
                    'mime_type' => $file->getMimeType()
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload file: ' . $e->getMessage()
            ], 500);
        }
    }
}
