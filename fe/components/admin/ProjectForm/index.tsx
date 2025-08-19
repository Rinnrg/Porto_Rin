
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import StepNavigation from './StepNavigation';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import SlugSelector from './SlugSelector';

interface CustomSection {
  id: string;
  name: string;
  sectionName: string;
  description: string;
  largeImages: string[];
  smallImages: string[];
  videos: string[];
}

interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription?: string;
  category: string;
  subcategory?: string;
  date: string;
  liveDemo?: string;
  githubRepo?: string;
  image?: string;
  thumbnail?: string;
  slug: string;
  technologies?: string;
  challenge?: string;
  solution?: string;
  philosophy?: string;
  aboutImage?: string;
  philosophyImage?: string;
  challengeImages?: string[];
  projectVideo?: string;
  customSections?: CustomSection[];
  createdAt: string;
  updatedAt: string;
}

interface ProjectFormProps {
  project?: Project | null;
  onClose: () => void;
  onSubmit: () => void;
}

export default function ProjectForm({ project, onClose, onSubmit }: ProjectFormProps) {
  const [formData, setFormData] = useState<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>({
    title: project?.title || '',
    description: project?.description || '',
    category: project?.category || '',
    subcategory: project?.subcategory || '',
    date: project?.date || new Date().toISOString().split('T')[0],
    liveDemo: project?.liveDemo || '',
    githubRepo: project?.githubRepo || '',
    slug: project?.slug || '',
    technologies: project?.technologies || '',
    image: project?.image || '',
    thumbnail: project?.thumbnail || '',
    customSections: project?.customSections || [],
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [customSectionFiles, setCustomSectionFiles] = useState<{[key: string]: {largeImages: File[], smallImages: File[], videos: File[]}}>({});
  const [uploading, setUploading] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [maxSteps] = useState(4);
  const [showSlugSelector, setShowSlugSelector] = useState(false);

  // Form validation
  const validateForm = () => {
    const errors: {[key: string]: string} = {};

    if (!formData.title.trim()) errors.title = 'Judul proyek wajib diisi';
    if (!formData.category) errors.category = 'Kategori wajib dipilih';
    if (!formData.slug.trim()) errors.slug = 'Slug wajib diisi';
    if (!formData.date) errors.date = 'Tanggal wajib diisi';

    const isValidUrl = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    if (formData.liveDemo && !isValidUrl(formData.liveDemo)) {
      errors.liveDemo = 'Format URL tidak valid';
    }
    if (formData.githubRepo && !isValidUrl(formData.githubRepo)) {
      errors.githubRepo = 'Format URL tidak valid';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: formDataUpload,
    });

    if (uploadResponse.ok) {
      const uploadData = await uploadResponse.json();
      return uploadData.url;
    } else {
      throw new Error('File upload failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only validate on final submit (step 4)
    if (currentStep !== maxSteps) {
      return;
    }

    if (!validateForm()) {
      await Swal.fire({
        title: 'Form Tidak Valid!',
        text: 'Silakan periksa kembali data yang Anda masukkan.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    setUploading(true);

    try {
      let thumbnailUrl = formData.thumbnail;

      if (thumbnailFile) {
        const thumbnailFormData = new FormData();
        thumbnailFormData.append('file', thumbnailFile);

        const thumbnailResponse = await fetch('/api/upload', {
          method: 'POST',
          body: thumbnailFormData,
        });

        if (!thumbnailResponse.ok) {
          const errorData = await thumbnailResponse.json();
          throw new Error(errorData.error || 'Failed to upload thumbnail');
        }

        const thumbnailData = await thumbnailResponse.json();
        thumbnailUrl = thumbnailData.url;
      }

      const updatedCustomSections = [];
      for (const section of formData.customSections || []) {
        const sectionFiles = customSectionFiles[section.id];
        let largeImageUrls = [...section.largeImages];
        let smallImageUrls = [...section.smallImages];
        let videoUrls = [...section.videos];

        if (sectionFiles) {
          for (const file of sectionFiles.largeImages) {
            if (file) {
              const url = await uploadFile(file);
              largeImageUrls.push(url);
            }
          }

          for (const file of sectionFiles.smallImages) {
            if (file) {
              const url = await uploadFile(file);
              smallImageUrls.push(url);
            }
          }

          for (const file of sectionFiles.videos) {
            if (file) {
              const url = await uploadFile(file);
              videoUrls.push(url);
            }
          }
        }

        updatedCustomSections.push({
          ...section,
          largeImages: largeImageUrls,
          smallImages: smallImageUrls,
          videos: videoUrls
        });
      }

      const projectData = {
        ...formData,
        thumbnail: thumbnailUrl,
        customSections: updatedCustomSections,
      };

      const url = project ? `/api/projects/${project.id}` : '/api/projects';
      const method = project ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        await Swal.fire({
          title: 'Berhasil!',
          text: project ? 'Proyek berhasil diupdate dan telah disimpan!' : 'Proyek baru berhasil dibuat dan disimpan!',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#10b981',
          timer: 3000,
          timerProgressBar: true
        });
        onSubmit();
      } else {
        const errorText = await response.text();
        console.error('Failed to save project:', errorText);
        await Swal.fire({
          title: 'Error!',
          text: 'Gagal menyimpan proyek. Silakan coba lagi.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Failed to save project:', error);
      await Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan. Silakan coba lagi.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setUploading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < maxSteps) {
      if (currentStep === 1) {
        const stepErrors: {[key: string]: string} = {};
        if (!formData.title.trim()) stepErrors.title = 'Judul proyek wajib diisi';
        if (!formData.category) stepErrors.category = 'Kategori wajib dipilih';
        if (!formData.slug.trim()) stepErrors.slug = 'Slug wajib diisi';

        if (Object.keys(stepErrors).length > 0) {
          setFormErrors(stepErrors);
          return;
        }
      }
      
      if (currentStep === 2) {
        // Validasi untuk step 2 jika diperlukan
        const stepErrors: {[key: string]: string} = {};
        
        if (Object.keys(stepErrors).length > 0) {
          setFormErrors(stepErrors);
          return;
        }
      }
      
      if (currentStep === 3) {
        // Tidak ada validasi khusus untuk step 3
        // Step 3 adalah konten opsional
      }
      
      // Clear errors when moving to next step
      setFormErrors({});
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-6 border w-11/12 max-w-7xl shadow-2xl rounded-xl bg-white max-h-[95vh] overflow-y-auto">
        <div className="mt-3">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {project ? 'Edit Proyek' : 'Tambah Proyek Baru'}
            </h3>

            <StepNavigation currentStep={currentStep} maxSteps={maxSteps} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {currentStep === 1 && (
              <StepOne 
                formData={formData}
                setFormData={setFormData}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                setShowSlugSelector={setShowSlugSelector}
                project={project}
              />
            )}

            {currentStep === 2 && (
              <StepTwo 
                formData={formData}
                thumbnailFile={thumbnailFile}
                setThumbnailFile={setThumbnailFile}
                thumbnailPreview={thumbnailPreview}
                setThumbnailPreview={setThumbnailPreview}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
              />
            )}

            {currentStep === 3 && (
              <StepThree 
                formData={formData}
                setFormData={setFormData}
                customSectionFiles={customSectionFiles}
                setCustomSectionFiles={setCustomSectionFiles}
              />
            )}

            {currentStep === 4 && (
              <StepFour 
                formData={formData}
                setFormData={setFormData}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
              />
            )}

            <div className="flex justify-between items-center pt-8 border-t border-gray-200">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Sebelumnya
                  </button>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  Batal
                </button>

                {currentStep < maxSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  >
                    Selanjutnya
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={uploading}
                    className="inline-flex items-center px-8 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {project ? 'Mengupdate...' : 'Menyimpan...'}
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {project ? 'Update Proyek' : 'Simpan Proyek'}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {showSlugSelector && (
        <SlugSelector
          currentSlug={formData.slug}
          onSelectSlug={(selectedSlug) => {
            setFormData(prev => ({ ...prev, slug: selectedSlug }));
            if (formErrors.slug && selectedSlug) {
              setFormErrors(prev => ({ ...prev, slug: '' }));
            }
            setShowSlugSelector(false);
          }}
          onClose={() => setShowSlugSelector(false)}
        />
      )}
    </div>
  );
}
