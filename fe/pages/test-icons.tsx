"use client";
import { useState } from "react";
import { 
  Plus, Edit3, Trash2, GripVertical, FileText, 
  GraduationCap, Building, Briefcase, Star,
  X, Upload, Image as ImageIcon, Type, Sparkles
} from "lucide-react";

// Test all icons used
export default function TestIcons() {
  return (
    <div className="p-8 space-y-4">
      <h1>Test All Icons</h1>
      <div className="flex gap-4 flex-wrap">
        <Plus className="w-6 h-6" />
        <Edit3 className="w-6 h-6" />
        <Trash2 className="w-6 h-6" />
        <GripVertical className="w-6 h-6" />
        <FileText className="w-6 h-6" />
        <GraduationCap className="w-6 h-6" />
        <Building className="w-6 h-6" />
        <Briefcase className="w-6 h-6" />
        <Star className="w-6 h-6" />
        <X className="w-6 h-6" />
        <Upload className="w-6 h-6" />
        <ImageIcon className="w-6 h-6" />
        <Type className="w-6 h-6" />
        <Sparkles className="w-6 h-6" />
      </div>
      <p>All icons loaded successfully!</p>
    </div>
  );
}
