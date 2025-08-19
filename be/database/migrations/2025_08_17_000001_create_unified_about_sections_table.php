<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('unified_about_sections', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['about', 'education', 'organization', 'workExperience', 'custom']);
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->text('content');
            $table->string('period')->nullable();
            $table->string('institution')->nullable(); // For education
            $table->string('degree')->nullable(); // For education
            $table->string('company')->nullable(); // For work experience
            $table->string('position')->nullable(); // For organization and work experience
            $table->string('name')->nullable(); // For organization
            $table->string('logo')->nullable();
            $table->string('image')->nullable();
            $table->string('image_caption')->nullable();
            $table->string('section_title')->nullable(); // For custom sections
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            
            // Indexes for better performance
            $table->index('type');
            $table->index('sort_order');
            $table->index(['type', 'sort_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unified_about_sections');
    }
};