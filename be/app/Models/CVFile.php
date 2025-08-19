<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CVFile extends Model
{
    use HasFactory;

    protected $table = 'cv_files';

    protected $fillable = [
        'file_name',
        'original_name',
        'file_path',
        'file_url',
        'description',
        'file_size',
        'file_type',
        'is_active',
        'download_count'
    ];

    protected $casts = [
        'is_active' => 'integer', // Use integer for PostgreSQL compatibility
        'download_count' => 'integer'
    ];

    protected $attributes = [
        'is_active' => 0, // Use integer 0 instead of boolean false
        'download_count' => 0
    ];

    // Mutator untuk is_active - convert boolean to integer for PostgreSQL
    public function setIsActiveAttribute($value)
    {
        $this->attributes['is_active'] = $value ? 1 : 0;
    }

    // Mutator untuk download_count - pastikan integer
    public function setDownloadCountAttribute($value)
    {
        $this->attributes['download_count'] = (int) $value;
    }

    // Get the current CV (should only be one)
    public static function getCurrentCV()
    {
        return self::first(); // Get the first (and should be only) CV
    }

    // Get currently active CV - check for is_active = 1
    public static function getActiveCv()
    {
        return self::where('is_active', 1)->first() ?: self::first();
    }

    // Set this CV as active using integer values
    public function setAsActive()
    {
        // Deactivate all other CVs first
        self::query()->update(['is_active' => 0]);
        
        // Set this CV as active using integer 1
        $this->update(['is_active' => 1]);
        
        return $this;
    }

    // Increment download count
    public function incrementDownload()
    {
        $this->increment('download_count');
        return $this;
    }

    // Get file size in human readable format
    public function getFormattedSizeAttribute()
    {
        return $this->file_size;
    }

    // Get full file URL
    public function getFullUrlAttribute()
    {
        if (str_starts_with($this->file_url, 'http')) {
            return $this->file_url;
        }
        
        return url($this->file_url);
    }

    // Delete file from storage when model is deleted
    protected static function boot()
    {
        parent::boot();
        
        static::deleting(function ($cvFile) {
            // Delete file from storage
            if (Storage::disk('public')->exists($cvFile->file_path)) {
                Storage::disk('public')->delete($cvFile->file_path);
            }
        });
    }
}
