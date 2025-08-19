<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Drop unused tables that don't have controllers or routes
        Schema::dropIfExists('blog_posts');
        Schema::dropIfExists('contacts');
        Schema::dropIfExists('services');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('profiles');
        Schema::dropIfExists('passwords');
        
        // Drop old about-related tables that are now unified in unified_about_sections
        Schema::dropIfExists('about_mes');
        Schema::dropIfExists('educations');
        Schema::dropIfExists('experiences');
        Schema::dropIfExists('organizations');
        Schema::dropIfExists('work_experiences');
        Schema::dropIfExists('about_sections');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Recreate tables if needed (though we won't implement full recreation)
        // These would need to be recreated from their original migration files if needed
    }
};
