<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CVFile;
use Illuminate\Support\Facades\Storage;

class CVSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create sample CV entry (without actual file)
        CVFile::create([
            'file_name' => 'sample_cv_rino_portfolio.pdf',
            'original_name' => 'CV Rino Portfolio - Full Stack Developer.pdf',
            'file_path' => 'cv/sample_cv_rino_portfolio.pdf',
            'file_url' => '/storage/cv/sample_cv_rino_portfolio.pdf',
            'description' => 'CV terbaru dengan pengalaman sebagai Full Stack Developer. Mencakup keahlian React, Laravel, dan teknologi modern lainnya.',
            'file_size' => '2.3 MB',
            'file_type' => 'application/pdf',
            'is_active' => true,
            'download_count' => 0
        ]);
    }
}
