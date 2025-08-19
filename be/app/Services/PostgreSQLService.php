<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class PostgreSQLService
{
    /**
     * Create CV with proper PostgreSQL boolean handling
     */
    public static function createCV(array $data)
    {
        // Convert boolean values to PostgreSQL compatible format
        $data['is_active'] = isset($data['is_active']) ? 
            ($data['is_active'] ? DB::raw('true') : DB::raw('false')) : 
            DB::raw('false');
            
        $data['download_count'] = isset($data['download_count']) ? 
            DB::raw($data['download_count'] . '::integer') : 
            DB::raw('0::integer');
            
        // Add timestamps
        $data['created_at'] = now();
        $data['updated_at'] = now();
        
        // Insert and get ID
        $cvId = DB::table('cv_files')->insertGetId($data);
        
        // Return the created model
        return \App\Models\CVFile::find($cvId);
    }
    
    /**
     * Update CV with proper PostgreSQL boolean handling
     */
    public static function updateCV($id, array $data)
    {
        // Convert boolean values if present
        if (isset($data['is_active'])) {
            $data['is_active'] = $data['is_active'] ? DB::raw('true') : DB::raw('false');
        }
        
        if (isset($data['download_count'])) {
            $data['download_count'] = DB::raw($data['download_count'] . '::integer');
        }
        
        $data['updated_at'] = now();
        
        // Update record
        DB::table('cv_files')->where('id', $id)->update($data);
        
        // Return updated model
        return \App\Models\CVFile::find($id);
    }
}
