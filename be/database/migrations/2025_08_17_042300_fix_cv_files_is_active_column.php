<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Step 1: Add temporary column
        Schema::table('cv_files', function (Blueprint $table) {
            $table->integer('is_active_temp')->default(0);
        });

        // Step 2: Copy data with conversion
        DB::statement('UPDATE cv_files SET is_active_temp = CASE WHEN is_active = true THEN 1 ELSE 0 END');

        // Step 3: Drop old column
        Schema::table('cv_files', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });

        // Step 4: Rename temp column
        Schema::table('cv_files', function (Blueprint $table) {
            $table->renameColumn('is_active_temp', 'is_active');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Step 1: Add temporary boolean column
        Schema::table('cv_files', function (Blueprint $table) {
            $table->boolean('is_active_temp')->default(false);
        });

        // Step 2: Copy data with conversion
        DB::statement('UPDATE cv_files SET is_active_temp = CASE WHEN is_active = 1 THEN true ELSE false END');

        // Step 3: Drop integer column
        Schema::table('cv_files', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });

        // Step 4: Rename temp column back
        Schema::table('cv_files', function (Blueprint $table) {
            $table->renameColumn('is_active_temp', 'is_active');
        });
    }
};
