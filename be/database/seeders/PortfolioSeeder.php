<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Profile;
use App\Models\Experience;
use App\Models\Education;
use App\Models\Skill;
use App\Models\Project;
use App\Models\Service;
use App\Models\Testimonial;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create Profile
        Profile::create([
            'full_name' => 'Rino Portfolio',
            'title' => 'Full Stack Developer',
            'bio' => 'Passionate full-stack developer with expertise in modern web technologies.',
            'summary' => 'Experienced Full Stack Developer with 3+ years of experience in building scalable web applications using React, Node.js, Laravel, and modern technologies. Passionate about creating efficient, user-friendly solutions.',
            'email' => 'rino@portfolio.dev',
            'phone' => '+62 812-3456-7890',
            'location' => 'Jakarta, Indonesia',
            'website' => 'https://rinoportfolio.dev',
            'linkedin' => 'https://linkedin.com/in/rinoportfolio',
            'github' => 'https://github.com/rinoportfolio',
            'twitter' => 'https://twitter.com/rinoportfolio',
            'instagram' => 'https://instagram.com/rinoportfolio',
            'languages' => [
                ['name' => 'Indonesian', 'proficiency' => 'Native'],
                ['name' => 'English', 'proficiency' => 'Professional'],
                ['name' => 'Japanese', 'proficiency' => 'Basic']
            ],
            'is_available_for_work' => true
        ]);

        // Create Experiences
        Experience::create([
            'company_name' => 'Tech Solutions Inc',
            'position' => 'Senior Full Stack Developer',
            'employment_type' => 'Full-time',
            'location' => 'Jakarta, Indonesia',
            'start_date' => '2023-01-01',
            'end_date' => null,
            'is_current' => true,
            'description' => 'Lead development of enterprise web applications using React, Laravel, and PostgreSQL. Mentor junior developers and architect scalable solutions.',
            'technologies' => ['React', 'Laravel', 'PostgreSQL', 'Docker', 'AWS'],
            'sort_order' => 1
        ]);

        Experience::create([
            'company_name' => 'Digital Agency Pro',
            'position' => 'Full Stack Developer',
            'employment_type' => 'Full-time',
            'location' => 'Jakarta, Indonesia',
            'start_date' => '2021-06-01',
            'end_date' => '2022-12-31',
            'is_current' => false,
            'description' => 'Developed custom websites and web applications for clients. Collaborated with design team to implement responsive UI/UX.',
            'technologies' => ['Vue.js', 'PHP', 'MySQL', 'WordPress'],
            'sort_order' => 2
        ]);

        // Create Education
        Education::create([
            'institution_name' => 'Universitas Indonesia',
            'degree' => 'Bachelor of Computer Science',
            'field_of_study' => 'Computer Science',
            'location' => 'Jakarta, Indonesia',
            'start_date' => '2017-09-01',
            'end_date' => '2021-06-01',
            'is_current' => false,
            'gpa' => 3.75,
            'description' => 'Focused on software engineering, algorithms, and database systems.',
            'achievements' => ['Dean\'s List 2020', 'Best Final Project Award'],
            'sort_order' => 1
        ]);

        // Create Skills
        $skills = [
            // Programming Languages
            ['name' => 'JavaScript', 'category' => 'Programming Languages', 'proficiency_level' => 9, 'years_of_experience' => 4, 'is_featured' => true],
            ['name' => 'TypeScript', 'category' => 'Programming Languages', 'proficiency_level' => 8, 'years_of_experience' => 3, 'is_featured' => true],
            ['name' => 'PHP', 'category' => 'Programming Languages', 'proficiency_level' => 9, 'years_of_experience' => 4, 'is_featured' => true],
            ['name' => 'Python', 'category' => 'Programming Languages', 'proficiency_level' => 7, 'years_of_experience' => 2],
            
            // Frontend
            ['name' => 'React', 'category' => 'Frontend', 'proficiency_level' => 9, 'years_of_experience' => 3, 'is_featured' => true],
            ['name' => 'Next.js', 'category' => 'Frontend', 'proficiency_level' => 8, 'years_of_experience' => 2, 'is_featured' => true],
            ['name' => 'Vue.js', 'category' => 'Frontend', 'proficiency_level' => 8, 'years_of_experience' => 2],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'proficiency_level' => 9, 'years_of_experience' => 3, 'is_featured' => true],
            
            // Backend
            ['name' => 'Laravel', 'category' => 'Backend', 'proficiency_level' => 9, 'years_of_experience' => 4, 'is_featured' => true],
            ['name' => 'Node.js', 'category' => 'Backend', 'proficiency_level' => 8, 'years_of_experience' => 3, 'is_featured' => true],
            ['name' => 'Express.js', 'category' => 'Backend', 'proficiency_level' => 8, 'years_of_experience' => 3],
            
            // Database
            ['name' => 'PostgreSQL', 'category' => 'Database', 'proficiency_level' => 8, 'years_of_experience' => 3, 'is_featured' => true],
            ['name' => 'MySQL', 'category' => 'Database', 'proficiency_level' => 9, 'years_of_experience' => 4],
            ['name' => 'MongoDB', 'category' => 'Database', 'proficiency_level' => 7, 'years_of_experience' => 2],
            
            // Tools
            ['name' => 'Git', 'category' => 'Tools', 'proficiency_level' => 9, 'years_of_experience' => 4],
            ['name' => 'Docker', 'category' => 'Tools', 'proficiency_level' => 7, 'years_of_experience' => 2],
            ['name' => 'AWS', 'category' => 'Tools', 'proficiency_level' => 6, 'years_of_experience' => 1],
        ];

        foreach ($skills as $index => $skill) {
            Skill::create(array_merge($skill, ['sort_order' => $index + 1]));
        }

        // Create Projects
        Project::create([
            'title' => 'E-Commerce Platform',
            'slug' => 'e-commerce-platform',
            'description' => 'A full-featured e-commerce platform built with React and Laravel. Features include product management, shopping cart, payment integration, and admin dashboard.',
            'short_description' => 'Modern e-commerce platform with React and Laravel',
            'technologies' => ['React', 'Laravel', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
            'live_url' => 'https://ecommerce-demo.rinoportfolio.dev',
            'github_url' => 'https://github.com/rinoportfolio/ecommerce-platform',
            'category' => 'Web Development',
            'status' => 'completed',
            'completion_date' => '2023-08-15',
            'is_featured' => true,
            'is_published' => true,
            'sort_order' => 1
        ]);

        Project::create([
            'title' => 'Task Management App',
            'slug' => 'task-management-app',
            'description' => 'A collaborative task management application with real-time updates, team collaboration features, and project tracking.',
            'short_description' => 'Collaborative task management with real-time updates',
            'technologies' => ['Next.js', 'Node.js', 'Socket.io', 'MongoDB', 'Chakra UI'],
            'live_url' => 'https://taskapp-demo.rinoportfolio.dev',
            'github_url' => 'https://github.com/rinoportfolio/task-management',
            'category' => 'Web Development',
            'status' => 'completed',
            'completion_date' => '2023-06-20',
            'is_featured' => true,
            'is_published' => true,
            'sort_order' => 2
        ]);

        // Create Services
        Service::create([
            'title' => 'Full Stack Web Development',
            'slug' => 'full-stack-web-development',
            'description' => 'Complete web development services from frontend to backend, including database design, API development, and deployment.',
            'short_description' => 'End-to-end web development solutions',
            'features' => [
                'Responsive Frontend Development',
                'Backend API Development',
                'Database Design & Optimization',
                'Third-party Integrations',
                'Deployment & Hosting Setup'
            ],
            'price_from' => 500.00,
            'price_to' => 5000.00,
            'price_type' => 'project',
            'delivery_time' => '2-8 weeks',
            'is_featured' => true,
            'is_active' => true,
            'sort_order' => 1
        ]);

        Service::create([
            'title' => 'React/Next.js Development',
            'slug' => 'react-nextjs-development',
            'description' => 'Modern React and Next.js development services for fast, SEO-friendly web applications.',
            'short_description' => 'Modern React & Next.js applications',
            'features' => [
                'React/Next.js Development',
                'State Management (Redux/Zustand)',
                'SSR/SSG Implementation',
                'Performance Optimization',
                'Component Library Creation'
            ],
            'price_from' => 50.00,
            'price_to' => 100.00,
            'price_type' => 'hourly',
            'delivery_time' => '1-4 weeks',
            'is_featured' => true,
            'is_active' => true,
            'sort_order' => 2
        ]);

        // Create Testimonials
        Testimonial::create([
            'client_name' => 'Sarah Johnson',
            'client_position' => 'Project Manager',
            'client_company' => 'Digital Innovations Ltd',
            'testimonial' => 'Rino delivered an exceptional e-commerce platform that exceeded our expectations. The code quality is excellent and the project was delivered on time.',
            'rating' => 5,
            'project_name' => 'E-Commerce Platform',
            'testimonial_date' => '2023-09-01',
            'is_featured' => true,
            'is_published' => true,
            'sort_order' => 1
        ]);

        Testimonial::create([
            'client_name' => 'Michael Chen',
            'client_position' => 'CEO',
            'client_company' => 'StartupTech',
            'testimonial' => 'Working with Rino was a great experience. He understood our requirements perfectly and delivered a scalable solution for our growing business.',
            'rating' => 5,
            'project_name' => 'Task Management App',
            'testimonial_date' => '2023-07-15',
            'is_featured' => true,
            'is_published' => true,
            'sort_order' => 2
        ]);
    }
}
