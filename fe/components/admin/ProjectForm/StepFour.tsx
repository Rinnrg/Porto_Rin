
import React from 'react';

interface StepFourProps {
  formData: any;
  setFormData: (data: any) => void;
  formErrors: { [key: string]: string };
  setFormErrors: (errors: any) => void;
}

export default function StepFour({ 
  formData, 
  setFormData, 
  formErrors, 
  setFormErrors 
}: StepFourProps) {
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-6">
      <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">4</span>
        Informasi Tambahan
      </h4>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teknologi yang Digunakan
          </label>
          <input
            type="text"
            value={formData.technologies}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, technologies: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
            placeholder="React, Next.js, TypeScript, Tailwind CSS (pisahkan dengan koma)"
          />
          <p className="mt-1 text-sm text-gray-500">
            Teknologi akan ditampilkan sebagai badge di card proyek
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link Live Demo
            </label>
            <input
              type="url"
              value={formData.liveDemo}
              onChange={(e) => {
                setFormData((prev: any) => ({ ...prev, liveDemo: e.target.value }));
                if (formErrors.liveDemo && (!e.target.value || isValidUrl(e.target.value))) {
                  setFormErrors((prev: any) => ({ ...prev, liveDemo: '' }));
                }
              }}
              className={`w-full p-3 border rounded-lg transition-colors ${
                formErrors.liveDemo ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
              } focus:ring-2 focus:ring-indigo-200`}
              placeholder="https://your-project-demo.com"
            />
            {formErrors.liveDemo && (
              <p className="mt-1 text-sm text-red-600">{formErrors.liveDemo}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link GitHub Repository
            </label>
            <input
              type="url"
              value={formData.githubRepo}
              onChange={(e) => {
                setFormData((prev: any) => ({ ...prev, githubRepo: e.target.value }));
                if (formErrors.githubRepo && (!e.target.value || isValidUrl(e.target.value))) {
                  setFormErrors((prev: any) => ({ ...prev, githubRepo: '' }));
                }
              }}
              className={`w-full p-3 border rounded-lg transition-colors ${
                formErrors.githubRepo ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
              } focus:ring-2 focus:ring-indigo-200`}
              placeholder="https://github.com/username/repo"
            />
            {formErrors.githubRepo && (
              <p className="mt-1 text-sm text-red-600">{formErrors.githubRepo}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
