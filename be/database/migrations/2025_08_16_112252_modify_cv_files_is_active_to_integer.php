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
        // For PostgreSQL, we need to use raw SQL with USING clause
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE cv_files ALTER COLUMN is_active TYPE INTEGER USING (CASE WHEN is_active THEN 1 ELSE 0 END)');
            DB::statement('ALTER TABLE cv_files ALTER COLUMN is_active SET DEFAULT 0');
        } else {
            // For other databases (MySQL, SQLite)
            Schema::table('cv_files', function (Blueprint $table) {
                $table->integer('is_active')->default(0)->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // For PostgreSQL
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE cv_files ALTER COLUMN is_active TYPE BOOLEAN USING (is_active::boolean)');
            DB::statement('ALTER TABLE cv_files ALTER COLUMN is_active SET DEFAULT false');
        } else {
            // For other databases
            Schema::table('cv_files', function (Blueprint $table) {
                $table->boolean('is_active')->default(false)->change();
            });
        }
    }
};
