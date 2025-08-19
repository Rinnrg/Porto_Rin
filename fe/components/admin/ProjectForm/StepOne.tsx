
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface StepOneProps {
  formData: any;
  setFormData: (data: any) => void;
  formErrors: { [key: string]: string };
  setFormErrors: (errors: any) => void;
  setShowSlugSelector: (show: boolean) => void;
  project?: any;
}

export default function StepOne({ 
  formData, 
  setFormData, 
  formErrors, 
  setFormErrors, 
  setShowSlugSelector,
  project 
}: StepOneProps) {
  const [newSubcategory, setNewSubcategory] = useState<string>('');

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev: any) => ({
      ...prev,
      title,
      slug: !project ? generateSlug(title) : prev.slug
    }));

    if (formErrors.title && title.trim()) {
      setFormErrors((prev: any) => ({ ...prev, title: '' }));
    }
  };

  return (
    <div className="space-y-6">
      <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">1</span>
        Informasi Dasar
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Judul Proyek <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className={`w-full p-3 border rounded-lg transition-colors ${
              formErrors.title ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
            } focus:ring-2 focus:ring-indigo-200`}
            placeholder="Masukkan judul proyek yang menarik"
          />
          {formErrors.title && (
            <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => {
              setFormData((prev: any) => ({ ...prev, category: e.target.value }));
              if (formErrors.category && e.target.value) {
                setFormErrors((prev: any) => ({ ...prev, category: '' }));
              }
            }}
            className={`w-full p-3 border rounded-lg transition-colors ${
              formErrors.category ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
            } focus:ring-2 focus:ring-indigo-200`}
          >
            <option value="">Pilih Kategori</option>
            <option value="Logo">Logo</option>
            <option value="Website">Website</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Brand Identity">Brand Identity</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Poster">Poster</option>
            <option value="Feed">Feed</option>
          </select>
          {formErrors.category && (
            <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>
          )}
        </div>
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sub Kategori <span className="text-gray-400">(Opsional)</span>
        </label>

        {formData.subcategory && formData.subcategory.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {formData.subcategory.split(',').map((s: string) => s.trim()).filter((s: string) => s).map((subcat: string, index: number) => (
                <div key={index} className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm animate-fadeIn">
                  {subcat}
                  <button
                    type="button"
                    onClick={() => {
                      const subcats = formData.subcategory.split(',').map((s: string) => s.trim()).filter((s: string) => s);
                      subcats.splice(index, 1);
                      setFormData((prev: any) => ({ ...prev, subcategory: subcats.join(', ') }));
                    }}
                    className="ml-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={newSubcategory || ''}
            onChange={(e) => setNewSubcategory(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (newSubcategory && newSubcategory.trim()) {
                  const existingSubcats = formData.subcategory ? formData.subcategory.split(',').map((s: string) => s.trim()).filter((s: string) => s) : [];
                  const updatedSubcats = [...existingSubcats, newSubcategory.trim()];
                  setFormData((prev: any) => ({ ...prev, subcategory: updatedSubcats.join(', ') }));
                  setNewSubcategory('');
                }
              }
            }}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
            placeholder="Masukkan sub kategori baru dan tekan Enter"
          />
          <button
            type="button"
            onClick={() => {
              if (newSubcategory && newSubcategory.trim()) {
                const existingSubcats = formData.subcategory ? formData.subcategory.split(',').map((s: string) => s.trim()).filter((s: string) => s) : [];
                const updatedSubcats = [...existingSubcats, newSubcategory.trim()];
                setFormData((prev: any) => ({ ...prev, subcategory: updatedSubcats.join(', ') }));
                setNewSubcategory('');
              }
            }}
            className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          Sub kategori akan muncul sebagai tombol di bawah project card.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tanggal <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => {
              setFormData((prev: any) => ({ ...prev, date: e.target.value }));
              if (formErrors.date && e.target.value) {
                setFormErrors((prev: any) => ({ ...prev, date: '' }));
              }
            }}
            className={`w-full p-3 border rounded-lg transition-colors ${
              formErrors.date ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
            } focus:ring-2 focus:ring-indigo-200`}
          />
          {formErrors.date && (
            <p className="mt-1 text-sm text-red-600">{formErrors.date}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug (URL) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => {
                const slug = generateSlug(e.target.value);
                setFormData((prev: any) => ({ ...prev, slug }));
                if (formErrors.slug && slug) {
                  setFormErrors((prev: any) => ({ ...prev, slug: '' }));
                }
              }}
              className={`w-full p-3 border rounded-lg transition-colors ${
                formErrors.slug ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
              } focus:ring-2 focus:ring-indigo-200 pr-20`}
              placeholder="url-proyek"
            />
            <button
              type="button"
              onClick={() => setShowSlugSelector(true)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-sm bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              Pilih
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            URL: /project/{formData.slug || 'slug-proyek'}
          </p>
          {formErrors.slug && (
            <p className="mt-1 text-sm text-red-600">{formErrors.slug}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Deskripsi Singkat <span className="text-gray-400">(Opsional)</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => {
            setFormData((prev: any) => ({ ...prev, description: e.target.value }));
            if (formErrors.description && e.target.value.trim()) {
              setFormErrors((prev: any) => ({ ...prev, description: '' }));
            }
          }}
          className={`w-full p-3 border rounded-lg h-32 transition-colors resize-none ${
            formErrors.description ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
          } focus:ring-2 focus:ring-indigo-200`}
          placeholder="Deskripsi singkat yang menarik untuk preview proyek..."
        />
        <div className="flex justify-between items-center mt-1">
          {formErrors.description ? (
            <p className="text-sm text-red-600">{formErrors.description}</p>
          ) : (
            <p className="text-sm text-gray-500">Opsional - biarkan kosong jika tidak diperlukan</p>
          )}
          <span className="text-sm text-gray-400">
            {formData.description.length}/500
          </span>
        </div>
      </div>
    </div>
  );
}
