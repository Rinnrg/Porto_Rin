
import React from 'react';
import Image from 'next/image';

interface StepTwoProps {
  formData: any;
  thumbnailFile: File | null;
  setThumbnailFile: (file: File | null) => void;
  thumbnailPreview: string | null;
  setThumbnailPreview: (preview: string | null) => void;
  formErrors: { [key: string]: string };
  setFormErrors: (errors: any) => void;
}

export default function StepTwo({ 
  formData,
  thumbnailFile,
  setThumbnailFile,
  thumbnailPreview,
  setThumbnailPreview,
  formErrors,
  setFormErrors 
}: StepTwoProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleThumbnailChange = (file: File | null) => {
    setThumbnailFile(file);
    if (file) {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        setFormErrors((prev: any) => ({ ...prev, thumbnail: 'File harus berupa gambar atau video' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prev: any) => ({ ...prev, thumbnail: 'Ukuran file maksimal 5MB' }));
        return;
      }

      setFormErrors((prev: any) => ({ ...prev, thumbnail: '' }));
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setThumbnailPreview(result);
      };
      reader.readAsDataURL(file);
    } else {
      setThumbnailPreview(null);
    }
  };

  const handleThumbnailDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleThumbnailDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleThumbnailDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleThumbnailChange(files[0]);
    }
  };

  const fileTypeIsImage = (filename: string | undefined): boolean => {
    if (!filename) return false;
    const lowerFilename = filename.toLowerCase();
    return lowerFilename.includes('.png') || lowerFilename.includes('.jpg') || 
           lowerFilename.includes('.jpeg') || lowerFilename.includes('.gif') || 
           lowerFilename.includes('.webp');
  };

  const fileTypeIsVideo = (filename: string | undefined): boolean => {
    if (!filename) return false;
    const lowerFilename = filename.toLowerCase();
    return lowerFilename.includes('.mp4') || lowerFilename.includes('.webm') || 
           lowerFilename.includes('.mov') || lowerFilename.includes('.avi');
  };

  return (
    <div className="space-y-6">
      <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">2</span>
        Media & Thumbnail
      </h4>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gambar Thumbnail Proyek
        </label>

        <div
          onDragOver={handleThumbnailDragOver}
          onDragLeave={handleThumbnailDragLeave}
          onDrop={handleThumbnailDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            isDragOver
              ? 'border-indigo-400 bg-indigo-50'
              : formErrors.thumbnail
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
          }`}
        >
          {thumbnailPreview || formData.thumbnail ? (
            <div className="space-y-4">
              {fileTypeIsImage(thumbnailPreview || formData.thumbnail) ? (
                <Image
                  src={thumbnailPreview || formData.thumbnail}
                  alt="Thumbnail preview"
                  width={400}
                  height={192}
                  className="mx-auto h-48 w-auto rounded-lg shadow-md"
                />
              ) : fileTypeIsVideo(thumbnailPreview || formData.thumbnail) ? (
                <video
                  src={thumbnailPreview || formData.thumbnail}
                  className="mx-auto h-48 w-auto rounded-lg shadow-md"
                  controls
                ></video>
              ) : (
                <Image
                  src={thumbnailPreview || formData.thumbnail}
                  alt="Thumbnail preview"
                  width={400}
                  height={192}
                  className="mx-auto h-48 w-auto rounded-lg shadow-md"
                />
              )}
              <div className="flex justify-center space-x-3">
                <button
                  type="button"
                  onClick={() => document.getElementById('thumbnail-input')?.click()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Ganti Media
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleThumbnailChange(null);
                    setThumbnailPreview(null);
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">
                  Drag & drop media (gambar/video) di sini
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  atau{' '}
                  <button
                    type="button"
                    onClick={() => document.getElementById('thumbnail-input')?.click()}
                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                  >
                    pilih file
                  </button>
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  JPG, PNG, GIF, MP4 hingga 5MB
                </p>
              </div>
            </div>
          )}
        </div>

        <input
          id="thumbnail-input"
          type="file"
          accept="image/*,video/*"
          aria-label="Upload thumbnail file"
          title="Upload thumbnail file"
          onChange={(e) => handleThumbnailChange(e.target.files?.[0] || null)}
          className="hidden"
        />

        {formErrors.thumbnail && (
          <p className="mt-2 text-sm text-red-600">{formErrors.thumbnail}</p>
        )}
      </div>
    </div>
  );
}
