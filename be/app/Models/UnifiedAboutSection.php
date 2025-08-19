<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnifiedAboutSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'title',
        'subtitle',
        'content',
        'period',
        'institution',
        'degree',
        'company',
        'position',
        'name',
        'logo',
        'image',
        'image_caption',
        'section_title',
        'sort_order'
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];

    // Scopes for different section types
    public function scopeAbout($query)
    {
        return $query->where('type', 'about');
    }

    public function scopeEducation($query)
    {
        return $query->where('type', 'education');
    }

    public function scopeOrganization($query)
    {
        return $query->where('type', 'organization');
    }

    public function scopeWorkExperience($query)
    {
        return $query->where('type', 'workExperience');
    }

    public function scopeCustom($query)
    {
        return $query->where('type', 'custom');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    // Helper methods
    public function isEducation()
    {
        return $this->type === 'education';
    }

    public function isOrganization()
    {
        return $this->type === 'organization';
    }

    public function isWorkExperience()
    {
        return $this->type === 'workExperience';
    }

    public function isCustom()
    {
        return $this->type === 'custom';
    }

    public function isAbout()
    {
        return $this->type === 'about';
    }

    // Get display name based on type
    public function getDisplayNameAttribute()
    {
        switch ($this->type) {
            case 'education':
                return $this->institution;
            case 'organization':
                return $this->name;
            case 'workExperience':
                return $this->company;
            case 'custom':
                return $this->title;
            case 'about':
                return 'About Me';
            default:
                return $this->title;
        }
    }

    // Get primary field based on type
    public function getPrimaryFieldAttribute()
    {
        switch ($this->type) {
            case 'education':
                return $this->degree;
            case 'organization':
            case 'workExperience':
                return $this->position;
            case 'custom':
                return $this->subtitle;
            default:
                return null;
        }
    }
}
