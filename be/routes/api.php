<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\CVController;
use App\Http\Controllers\API\UnifiedAboutController;
use App\Models\User;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Test route
Route::get('/test', function () {
    return response()->json([
        'message' => 'Laravel API is working!',
        'timestamp' => now(),
        'database' => 'Supabase PostgreSQL'
    ]);
});

// Create user route (temporary for setup)
Route::get('/create-user', function () {
    try {
        $user = \App\Models\User::where('username', 'rino')->first();
        
        if ($user) {
            return response()->json([
                'message' => 'User already exists',
                'user' => $user->only(['id', 'username', 'name', 'email'])
            ]);
        }
        
        $user = \App\Models\User::create([
            'username' => 'rino',
            'name' => 'Rino Raihan Gumilang',
            'email' => 'rino@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('sijilorotelu'),
        ]);
        
        return response()->json([
            'message' => 'User created successfully',
            'user' => $user->only(['id', 'username', 'name', 'email'])
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage()
        ], 500);
    }
});

// Test CV creation route
Route::get('/test-cv-creation', function () {
    try {
        \Log::info('Testing CV creation with boolean handling');
        
        // Test direct model creation with explicit boolean
        $testCv = \App\Models\CVFile::create([
            'file_name' => 'test_cv_' . time() . '.pdf',
            'original_name' => 'Test CV.pdf',
            'file_path' => 'cv/test_cv.pdf',
            'file_url' => '/storage/cv/test_cv.pdf',
            'description' => 'Test CV for boolean handling',
            'file_size' => '1.0 MB',
            'file_type' => 'application/pdf',
            'is_active' => false,  // explicit boolean
            'download_count' => 0,
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Test CV created successfully!',
            'cv_data' => $testCv,
            'cv_id' => $testCv->id,
            'is_active_type' => gettype($testCv->is_active),
            'download_count_type' => gettype($testCv->download_count)
        ]);
        
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'CV creation failed!',
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
});

// Clean up CV data - keep only the latest one
Route::get('/cleanup-cv', function () {
    try {
        $cvs = \App\Models\CVFile::orderBy('created_at', 'desc')->get();
        $keepCV = $cvs->first(); // Keep the latest one
        $deletedCount = 0;
        
        if ($keepCV) {
            // Delete all except the first (latest) one
            foreach ($cvs->skip(1) as $cv) {
                // Delete file from storage
                if (\Storage::disk('public')->exists($cv->file_path)) {
                    \Storage::disk('public')->delete($cv->file_path);
                }
                
                // Delete database record
                $cv->delete();
                $deletedCount++;
            }
            
            // Ensure the kept CV is active
            $keepCV->update(['is_active' => true]);
        }
        
        return response()->json([
            'success' => true,
            'message' => 'CV cleanup completed',
            'kept_cv' => $keepCV ? $keepCV->original_name : null,
            'deleted_count' => $deletedCount
        ]);
        
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Cleanup failed',
            'error' => $e->getMessage()
        ], 500);
    }
});

// Create sample data for testing
Route::get('/create-sample-data', function () {
    try {
        // Clear existing data
        \App\Models\UnifiedAboutSection::truncate();
        
        // Create sample data
        $sampleData = [
            [
                'type' => 'education',
                'title' => 'Universitas ABC',
                'subtitle' => 'Sarjana Teknik Informatika',
                'content' => 'Menyelesaikan pendidikan S1 dengan fokus pada pengembangan web dan mobile',
                'period' => '2020 - 2024',
                'institution' => 'Universitas ABC',
                'degree' => 'S1 Teknik Informatika',
                'sort_order' => 1
            ],
            [
                'type' => 'workExperience',
                'title' => 'Frontend Developer',
                'subtitle' => 'PT Technology Solutions',
                'content' => 'Mengembangkan aplikasi web menggunakan React dan Next.js',
                'period' => '2024 - Sekarang',
                'company' => 'PT Technology Solutions',
                'position' => 'Frontend Developer',
                'sort_order' => 2
            ],
            [
                'type' => 'organization',
                'title' => 'Himpunan Mahasiswa Teknik Informatika',
                'subtitle' => 'Ketua Bidang IT',
                'content' => 'Memimpin pengembangan sistem informasi internal organisasi',
                'period' => '2022 - 2023',
                'name' => 'HMTI',
                'sort_order' => 3
            ]
        ];
        
        foreach ($sampleData as $data) {
            \App\Models\UnifiedAboutSection::create($data);
        }
        
        $count = \App\Models\UnifiedAboutSection::count();
        $sections = \App\Models\UnifiedAboutSection::orderBy('sort_order')->get();
        
        return response()->json([
            'success' => true,
            'message' => 'Sample data created successfully!',
            'count' => $count,
            'sections' => $sections
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to create sample data: ' . $e->getMessage(),
            'error' => $e->getTraceAsString()
        ], 500);
    }
});

// Test unified about sections route
Route::get('/test-unified', function () {
    try {
        $sections = \App\Models\UnifiedAboutSection::all();
        $count = \App\Models\UnifiedAboutSection::count();
        
        return response()->json([
            'success' => true,
            'message' => 'Unified About Sections test',
            'count' => $count,
            'sections' => $sections,
            'table_exists' => \Schema::hasTable('unified_about_sections')
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Test failed: ' . $e->getMessage(),
            'error' => $e->getTraceAsString()
        ], 500);
    }
});

// Database test route
Route::get('/test-db', function () {
    try {
        $connection = DB::connection()->getPdo();
        $users = User::all();
        
        // Test boolean handling
        $testData = [
            'boolean_true' => true,
            'boolean_false' => false,
            'integer_1' => 1,
            'integer_0' => 0
        ];
        
        return response()->json([
            'success' => true,
            'message' => 'Database connection successful!',
            'database' => 'Supabase PostgreSQL',
            'users_count' => $users->count(),
            'boolean_test' => $testData,
            'cv_files_count' => \App\Models\CVFile::count(),
            'users' => $users->map(function($user) {
                return [
                    'id' => $user->id,
                    'username' => $user->username,
                    'name' => $user->name,
                    'email' => $user->email,
                ];
            }),
            'tables' => DB::select("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Database connection failed!',
            'error' => $e->getMessage()
        ], 500);
    }
});

// Authentication routes
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// CV API routes
Route::prefix('cv')->group(function () {
    // Public routes
    Route::get('/current', [CVController::class, 'index']); // Get current active CV
    Route::get('/download-info', [CVController::class, 'publicDownload']); // Get download info
    Route::get('/download/{id}', [CVController::class, 'download'])->name('api.cv.download'); // Download CV file
    Route::get('/view/{id}', [CVController::class, 'viewPDF'])->name('api.cv.view'); // View PDF with proper headers
    
    // Protected routes (admin only)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/all', [CVController::class, 'all']); // Get all CVs
        Route::post('/upload', [CVController::class, 'upload']); // Upload new CV
        Route::put('/{id}/description', [CVController::class, 'updateDescription']); // Update description
        Route::put('/{id}/activate', [CVController::class, 'setActive']); // Set as active
        Route::delete('/{id}', [CVController::class, 'delete']); // Delete CV
    });
});

// Unified About Sections API routes
Route::prefix('unified-about')->group(function () {
    // Public routes
    Route::get('/', [UnifiedAboutController::class, 'index']); // Get all sections
    Route::get('/type/{type}', [UnifiedAboutController::class, 'getByType']); // Get sections by type
    Route::get('/{id}', [UnifiedAboutController::class, 'show']); // Get specific section
    
    // Protected routes (admin only)
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [UnifiedAboutController::class, 'store']); // Create section
        Route::put('/{id}', [UnifiedAboutController::class, 'update']); // Update section
        Route::delete('/{id}', [UnifiedAboutController::class, 'destroy']); // Delete section
        Route::put('/order/update', [UnifiedAboutController::class, 'updateOrder']); // Update sort order
        Route::post('/upload-logo', [UnifiedAboutController::class, 'uploadLogo']); // Upload logo (general)
    });
});

// File serving route for uploaded images
Route::get('/storage/{path}', function ($path) {
    $fullPath = storage_path('app/public/' . $path);
    
    if (!file_exists($fullPath)) {
        abort(404);
    }
    
    $mimeType = mime_content_type($fullPath);
    return response()->file($fullPath, [
        'Content-Type' => $mimeType,
        'Cache-Control' => 'public, max-age=31536000', // Cache for 1 year
    ]);
})->where('path', '.*');
