
import React, { useState, useEffect } from 'react';

interface SlugSelectorProps {
  currentSlug: string;
  onSelectSlug: (slug: string) => void;
  onClose: () => void;
}

export default function SlugSelector({ currentSlug, onSelectSlug, onClose }: SlugSelectorProps) {
  const [suggestedSlugs, setSuggestedSlugs] = useState<string[]>([]);
  const [newSlug, setNewSlug] = useState(currentSlug);
  const [error, setError] = useState('');

  useEffect(() => {
    setNewSlug(currentSlug);
  }, [currentSlug]);

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    setNewSlug(slug);
    setError('');
  };

  const handleSubmit = () => {
    if (!newSlug) {
      setError('Slug tidak boleh kosong.');
      return;
    }
    if (!/^[a-z0-9-]+$/.test(newSlug)) {
      setError('Slug hanya boleh berisi huruf, angka, dan tanda hubung.');
      return;
    }
    onSelectSlug(newSlug);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="relative p-6 border w-96 max-w-sm shadow-2xl rounded-xl bg-white">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Pilih Slug URL</h3>
          <p className="text-sm text-gray-500 mt-1">Pilih slug yang unik untuk proyek Anda.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug URL
            </label>
            <input
              type="text"
              value={newSlug}
              onChange={handleSlugChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 transition-colors ${
                error ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
              } focus:ring-indigo-200`}
              placeholder="contoh: project-keren"
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          {suggestedSlugs.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Saran Slug
              </label>
              <div className="flex flex-wrap gap-2">
                {suggestedSlugs.map((slug) => (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => setNewSlug(slug)}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {slug}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Pilih Slug
          </button>
        </div>
      </div>
    </div>
  );
}
