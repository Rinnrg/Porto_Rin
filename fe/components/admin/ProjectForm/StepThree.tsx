
import React, { useState } from 'react';

interface StepThreeProps {
  formData: any;
  setFormData: (data: any) => void;
  customSectionFiles: any;
  setCustomSectionFiles: (files: any) => void;
}

interface CustomSection {
  id: string;
  name: string;
  sectionName: string;
  description: string;
  largeImages: string[];
  smallImages: string[];
  videos: string[];
}

export default function StepThree({ 
  formData, 
  setFormData, 
  customSectionFiles, 
  setCustomSectionFiles 
}: StepThreeProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const addCustomSection = (type: 'section' | 'largeImage' | 'smallImage' | 'video') => {
    const newId = Date.now().toString();
    let sectionName = '';

    switch (type) {
      case 'section':
        sectionName = 'Section';
        break;
      case 'largeImage':
        sectionName = 'Gambar Large';
        break;
      case 'smallImage':
        sectionName = 'Gambar Small';
        break;
      case 'video':
        sectionName = 'Video';
        break;
    }

    const newSection: CustomSection = {
      id: newId,
      name: sectionName,
      sectionName: '',
      description: '',
      largeImages: [],
      smallImages: [],
      videos: []
    };
    setFormData((prev: any) => ({
      ...prev,
      customSections: [...(prev.customSections || []), newSection]
    }));
    setCustomSectionFiles((prev: any) => ({
      ...prev,
      [newId]: { largeImages: [], smallImages: [], videos: [] }
    }));
  };

  const removeCustomSection = (sectionId: string) => {
    setFormData((prev: any) => ({
      ...prev,
      customSections: prev.customSections?.filter((section: any) => section.id !== sectionId) || []
    }));
    setCustomSectionFiles((prev: any) => {
      const newFiles = { ...prev };
      delete newFiles[sectionId];
      return newFiles;
    });
  };

  const updateCustomSection = (sectionId: string, field: keyof CustomSection, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      customSections: prev.customSections?.map((section: any) =>
        section.id === sectionId ? { ...section, [field]: value } : section
      ) || []
    }));
  };

  const handleCustomSectionFileChange = (sectionId: string, type: 'largeImages' | 'smallImages' | 'videos', files: File[]) => {
    setCustomSectionFiles((prev: any) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [type]: files
      }
    }));
  };

  const handleDragStart = (e: React.MouseEvent, index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const sections = [...(formData.customSections || [])];
    const draggedSection = sections[draggedIndex];

    sections.splice(draggedIndex, 1);
    sections.splice(dropIndex, 0, draggedSection);

    setFormData((prev: any) => ({
      ...prev,
      customSections: sections
    }));

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h4 className="text-2xl font-bold text-gray-900 mb-2">
          Konten Proyek
        </h4>
        <p className="text-gray-600">
          Susun konten proyek Anda dengan fleksibilitas penuh
        </p>
      </div>

      {/* Quick Add Section Toolbar */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h5 className="text-lg font-semibold text-gray-900 mb-1">Tambah Konten</h5>
            <p className="text-sm text-gray-600">Pilih jenis konten yang ingin Anda tambahkan</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Section Button */}
          <button
            type="button"
            onClick={() => addCustomSection('section')}
            className="group relative p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h6 className="font-medium text-gray-900 mb-1">Section</h6>
              <p className="text-xs text-gray-500">Teks + Deskripsi</p>
            </div>
          </button>

          {/* Large Image Button */}
          <button
            type="button"
            onClick={() => addCustomSection('largeImage')}
            className="group relative p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h6 className="font-medium text-gray-900 mb-1">Gambar Large</h6>
              <p className="text-xs text-gray-500">Full Width</p>
            </div>
          </button>

          {/* Small Images Button */}
          <button
            type="button"
            onClick={() => addCustomSection('smallImage')}
            className="group relative p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h6 className="font-medium text-gray-900 mb-1">Gambar Small</h6>
              <p className="text-xs text-gray-500">Side by Side</p>
            </div>
          </button>

          {/* Video Button */}
          <button
            type="button"
            onClick={() => addCustomSection('video')}
            className="group relative p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h6 className="font-medium text-gray-900 mb-1">Video</h6>
              <p className="text-xs text-gray-500">MP4, WebM</p>
            </div>
          </button>
        </div>
      </div>

      {/* Custom Sections List */}
      <div className="space-y-6">
        {formData.customSections?.map((section: any, sectionIndex: number) => (
          <div
            key={section.id}
            className={`group relative bg-white border-2 rounded-2xl p-6 transition-all duration-300 ${
              draggedIndex === sectionIndex 
                ? 'opacity-50 scale-95 border-gray-300' 
                : dragOverIndex === sectionIndex 
                ? 'border-indigo-400 bg-indigo-50 shadow-lg scale-102' 
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
            draggable
            onDragStart={(e) => {
              setDraggedIndex(sectionIndex);
              e.dataTransfer.effectAllowed = 'move';
            }}
            onDragOver={(e) => handleDragOver(e, sectionIndex)}
            onDrop={(e) => handleDrop(e, sectionIndex)}
            onDragEnd={handleDragEnd}
          >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="cursor-move p-2 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
                  onMouseDown={(e) => handleDragStart(e, sectionIndex)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="4" cy="4" r="1.5"/>
                    <circle cx="8" cy="4" r="1.5"/>
                    <circle cx="12" cy="4" r="1.5"/>
                    <circle cx="4" cy="8" r="1.5"/>
                    <circle cx="8" cy="8" r="1.5"/>
                    <circle cx="12" cy="8" r="1.5"/>
                    <circle cx="4" cy="12" r="1.5"/>
                    <circle cx="8" cy="12" r="1.5"/>
                    <circle cx="12" cy="12" r="1.5"/>
                  </svg>
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {section.name}
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {section.sectionName || `Section ${sectionIndex + 1}`}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {section.name === 'Section' && 'Teks dengan deskripsi'}
                    {section.name === 'Gambar Large' && 'Gambar ukuran penuh'}
                    {section.name === 'Gambar Small' && 'Gambar berjejer'}
                    {section.name === 'Video' && 'Video content'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeCustomSection(section.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            {/* Section Content */}
            <div className="space-y-6">
              {section.name === 'Section' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Section
                    </label>
                    <input
                      type="text"
                      value={section.sectionName || ''}
                      onChange={(e) => updateCustomSection(section.id, 'sectionName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                      placeholder="Masukkan nama section"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deskripsi Section
                    </label>
                    <textarea
                      value={section.description}
                      onChange={(e) => updateCustomSection(section.id, 'description', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                      placeholder="Jelaskan detail section ini..."
                    />
                  </div>
                </div>
              )}

              {/* Render different section types based on section.name */}
              {/* Add more section type renderings here... */}
            </div>
          </div>
        ))}

        {(!formData.customSections || formData.customSections.length === 0) && (
          <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="relative">
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-indigo-100 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-purple-100 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center transform rotate-3 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h5 className="text-2xl font-bold text-gray-900 mb-2">Belum ada konten</h5>
                <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
                  Mulai buat konten proyek yang menarik! Pilih jenis konten di atas untuk memulai.
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => addCustomSection('section')}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Mulai dengan Teks
                  </button>
                  <button
                    type="button"
                    onClick={() => addCustomSection('largeImage')}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all transform hover:scale-105"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Tambah Gambar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {formData.customSections && formData.customSections.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-indigo-800 font-medium">
                {formData.customSections.length} section konten siap ditampilkan
              </span>
            </div>
            <div className="text-sm text-indigo-600">
              Drag & drop untuk mengatur ulang urutan
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
