<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UnifiedAboutSection;
use App\Models\AboutMe;
use App\Models\Education;
use App\Models\Organization;
use App\Models\WorkExperience;

class UnifiedAboutSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing unified sections
        UnifiedAboutSection::truncate();

        $sortOrder = 1;

        // Create About Me section with detailed information
        UnifiedAboutSection::create([
            'type' => 'about',
            'title' => 'Tentang Saya',
            'content' => 'Saya adalah seorang mahasiswa aktif di Universitas Negeri Surabaya. Dengan pengalaman dalam berbagai bidang desain, mulai dari desain grafis hingga desain UI/UX, saya selalu berusaha menghadirkan kreativitas yang tak hanya menarik secara visual, tetapi juga fungsional.

Sebagai seorang desainer, saya selalu berusaha terus berkembang dan mengeksplorasi tren desain terkini untuk memberikan hasil yang relevan dan up-to-date.',
            'sort_order' => $sortOrder++
        ]);

        // Migrate existing About Me data if available
        try {
            $aboutMe = AboutMe::first();
            if ($aboutMe && $aboutMe->about_text) {
                // Update the content if there's existing data
                $existingSection = UnifiedAboutSection::where('type', 'about')->first();
                if ($existingSection) {
                    $existingSection->update([
                        'content' => $aboutMe->about_text,
                        'image' => $aboutMe->profile_image,
                    ]);
                }
            }
        } catch (\Exception $e) {
            \Log::warning('Failed to migrate existing AboutMe data: ' . $e->getMessage());
        }

        // Migrate Education data
        try {
            $educations = Education::orderBy('sort_order')->get();
            foreach ($educations as $education) {
                UnifiedAboutSection::create([
                    'type' => 'education',
                    'title' => $education->institution,
                    'content' => $education->description ?? '',
                    'period' => $education->period,
                    'institution' => $education->institution,
                    'degree' => $education->degree,
                    'logo' => $education->logo,
                    'sort_order' => $sortOrder++
                ]);
            }
        } catch (\Exception $e) {
            \Log::warning('Failed to migrate Education data: ' . $e->getMessage());
        }

        // Migrate Organization data
        try {
            $organizations = Organization::orderBy('sort_order')->get();
            foreach ($organizations as $organization) {
                UnifiedAboutSection::create([
                    'type' => 'organization',
                    'title' => $organization->name,
                    'content' => $organization->description ?? '',
                    'period' => $organization->period,
                    'name' => $organization->name,
                    'position' => $organization->position,
                    'logo' => $organization->logo,
                    'sort_order' => $sortOrder++
                ]);
            }
        } catch (\Exception $e) {
            \Log::warning('Failed to migrate Organization data: ' . $e->getMessage());
        }

        // Add sample organization data if no existing data
        if (UnifiedAboutSection::where('type', 'organization')->count() == 0) {
            UnifiedAboutSection::create([
                'type' => 'organization',
                'title' => 'Himpunan Mahasiswa Teknik Informatika',
                'content' => 'Aktif sebagai anggota dalam berbagai kegiatan organisasi kemahasiswaan, mengembangkan soft skills dan leadership.',
                'period' => '2022 - 2023',
                'name' => 'Himpunan Mahasiswa Teknik Informatika',
                'position' => 'Anggota Divisi Kreatif',
                'sort_order' => $sortOrder++
            ]);

            UnifiedAboutSection::create([
                'type' => 'organization',
                'title' => 'Unit Kegiatan Mahasiswa (UKM) Desain',
                'content' => 'Berpartisipasi aktif dalam kegiatan desain grafis dan UI/UX, serta membantu mengorganisir workshop dan seminar desain.',
                'period' => '2021 - 2023',
                'name' => 'Unit Kegiatan Mahasiswa (UKM) Desain',
                'position' => 'Koordinator Desain Grafis',
                'sort_order' => $sortOrder++
            ]);
        }

        // Migrate Work Experience data
        try {
            $workExperiences = WorkExperience::orderBy('sort_order')->get();
            foreach ($workExperiences as $workExperience) {
                UnifiedAboutSection::create([
                    'type' => 'workExperience',
                    'title' => $workExperience->company,
                    'content' => $workExperience->description ?? '',
                    'period' => $workExperience->period,
                    'company' => $workExperience->company,
                    'position' => $workExperience->position,
                    'logo' => $workExperience->logo,
                    'sort_order' => $sortOrder++
                ]);
            }
        } catch (\Exception $e) {
            \Log::warning('Failed to migrate WorkExperience data: ' . $e->getMessage());
        }

        // Add sample work experience data if no existing data
        if (UnifiedAboutSection::where('type', 'workExperience')->count() == 0) {
            UnifiedAboutSection::create([
                'type' => 'workExperience',
                'title' => 'PT. Digital Creative Studio',
                'content' => 'Magang sebagai UI/UX Designer, bertanggung jawab merancang interface aplikasi mobile dan web. Belajar menggunakan tools seperti Figma, Adobe XD, dan berkolaborasi dengan tim developer.',
                'period' => 'Juni 2023 - Agustus 2023',
                'company' => 'PT. Digital Creative Studio',
                'position' => 'UI/UX Designer Intern',
                'sort_order' => $sortOrder++
            ]);

            UnifiedAboutSection::create([
                'type' => 'workExperience',
                'title' => 'Freelance Graphic Designer',
                'content' => 'Menangani berbagai proyek desain grafis untuk UMKM dan startup lokal, mulai dari logo design, branding, hingga social media design.',
                'period' => 'Januari 2022 - Sekarang',
                'company' => 'Freelance',
                'position' => 'Graphic Designer',
                'sort_order' => $sortOrder++
            ]);

            UnifiedAboutSection::create([
                'type' => 'workExperience',
                'title' => 'CV. Tech Innovation',
                'content' => 'Magang sebagai Frontend Developer, mengembangkan website company profile dan landing pages menggunakan React.js dan Next.js.',
                'period' => 'Februari 2024 - April 2024',
                'company' => 'CV. Tech Innovation',
                'position' => 'Frontend Developer Intern',
                'sort_order' => $sortOrder++
            ]);
        }

        // Add some sample custom sections
        UnifiedAboutSection::create([
            'type' => 'custom',
            'title' => 'Frontend Development Certification',
            'subtitle' => 'FreeCodeCamp',
            'content' => 'Completed comprehensive frontend development course covering HTML, CSS, JavaScript, and React.',
            'period' => '2023',
            'section_title' => 'Sertifikat',
            'sort_order' => $sortOrder++
        ]);

        UnifiedAboutSection::create([
            'type' => 'custom',
            'title' => 'UI/UX Design Competition Winner',
            'subtitle' => 'Tech Fest 2023',
            'content' => 'First place winner in university-level UI/UX design competition with innovative mobile app design.',
            'period' => 'November 2023',
            'section_title' => 'Prestasi',
            'sort_order' => $sortOrder++
        ]);

        $this->command->info('Unified About Sections seeded successfully!');
    }
}
