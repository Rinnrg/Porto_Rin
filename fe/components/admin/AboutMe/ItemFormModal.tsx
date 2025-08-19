"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Save, X, Upload, User, Building, GraduationCap, Briefcase, FileText, Calendar, MapPin, Award, CheckCircle, AlertCircle } from 'lucide-react';
import Swal from 'sweetalert2';

interface SectionItem {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  period?: string;
  logo?: string;
  institution?: string;
  degree?: string;
  company?: string;
  position?: string;
}

interface ItemFormModalProps {
  isOpen: boolean;
  item?: SectionItem;
  sectionType: 'about' | 'education' | 'organization' | 'workExperience' | 'custom';
  onSave: (item: SectionItem) => void;
  onCancel: () => void;
  onLogoUpload?: (event: React.ChangeEvent<HTMLInputElement>, type: string, id?: string) => Promise<void>;
  uploadedImageUrl?: string;
  onImageUploadComplete?: () => void;
}

const ItemFormModal: React.FC<ItemFormModalProps> = ({
  isOpen,
  item,
  sectionType,
  onSave,
  onCancel,
  onLogoUpload,
  uploadedImageUrl = '',
  onImageUploadComplete
}) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    period: '',
    logo: '',
    institution: '',
    degree: '',
    company: '',
    position: ''
  });

  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Initialize form data when modal opens or item changes
  useEffect(() => {
    if (isOpen) {
      if (item) {
        setFormData({
          title: item.title || '',
          subtitle: item.subtitle || '',
          content: item.content || '',
          period: item.period || '',
          logo: item.logo || '',
          institution: item.institution || '',
          degree: item.degree || '',
          company: item.company || '',
          position: item.position || ''
        });
      } else {
        setFormData({
          title: '',
          subtitle: '',
          content: '',
          period: '',
          logo: '',
          institution: '',
          degree: '',
          company: '',
          position: ''
        });
      }
      setCurrentStep(1);
      setValidationErrors({});
    }
  }, [item, isOpen]);

  // Prevent body scroll when modal is open but allow modal scroll
  useEffect(() => {
    if (isOpen) {
      // Store original scroll position
      const scrollY = window.scrollY;
      
      // Prevent body scroll but allow modal scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Add class to html to prevent scroll on iOS
      document.documentElement.style.overflow = 'hidden';
      
      // Add a delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
          // Force focus to enable scroll
          (modalContent as HTMLElement).focus();
          
          // Handle wheel events specifically
          const handleWheel = (e: Event) => {
            const wheelEvent = e as WheelEvent;
            e.preventDefault();
            e.stopPropagation();
            
            // Manually handle scroll
            const currentScrollTop = modalContent.scrollTop;
            const newScrollTop = currentScrollTop + wheelEvent.deltaY;
            modalContent.scrollTop = newScrollTop;
          };
          
          // Handle key events for arrow keys
          const handleKeyDown = (e: Event) => {
            const keyEvent = e as KeyboardEvent;
            if (keyEvent.key === 'ArrowDown') {
              e.preventDefault();
              modalContent.scrollTop += 50;
            } else if (keyEvent.key === 'ArrowUp') {
              e.preventDefault();
              modalContent.scrollTop -= 50;
            }
          };
          
          modalContent.addEventListener('wheel', handleWheel, { passive: false });
          modalContent.addEventListener('keydown', handleKeyDown);
          
          // Cleanup function
          const cleanup = () => {
            modalContent.removeEventListener('wheel', handleWheel);
            modalContent.removeEventListener('keydown', handleKeyDown);
          };
          
          return cleanup;
        }
      }, 100);
      
      return () => {
        clearTimeout(timer);
        // Restore scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Handle uploaded image URL
  useEffect(() => {
    if (uploadedImageUrl && uploadedImageUrl !== formData.logo) {
      setFormData(prev => ({ ...prev, logo: uploadedImageUrl }));
    }
  }, [uploadedImageUrl, formData.logo]);

  // Validation functions
  const validateField = (name: string, value: string) => {
    const errors = { ...validationErrors };
    
    switch (name) {
      case 'title':
        if (!value.trim()) {
          errors.title = 'Judul wajib diisi';
        } else if (value.length < 3) {
          errors.title = 'Judul minimal 3 karakter';
        } else {
          delete errors.title;
        }
        break;
      case 'content':
        if (!value.trim()) {
          errors.content = 'Deskripsi wajib diisi';
        } else if (value.length < 10) {
          errors.content = 'Deskripsi minimal 10 karakter';
        } else {
          delete errors.content;
        }
        break;
      case 'period':
        if (sectionType !== 'about' && !value.trim()) {
          errors.period = 'Periode wajib diisi';
        } else {
          delete errors.period;
        }
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // Helper functions
  const getSectionIcon = () => {
    switch (sectionType) {
      case 'about': return User;
      case 'education': return GraduationCap;
      case 'organization': return Building;
      case 'workExperience': return Briefcase;
      default: return FileText;
    }
  };

  const getSectionColor = () => {
    switch (sectionType) {
      case 'about': return 'from-blue-500 to-blue-600';
      case 'education': return 'from-green-500 to-green-600';
      case 'organization': return 'from-purple-500 to-purple-600';
      case 'workExperience': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getSectionTitle = () => {
    switch (sectionType) {
      case 'about': return 'Tentang Saya';
      case 'education': return 'Pendidikan';
      case 'organization': return 'Pengalaman Organisasi';
      case 'workExperience': return 'Pengalaman Kerja';
      default: return 'Item Custom';
    }
  };

  const getSteps = () => {
    if (sectionType === 'about') {
      return [
        { id: 1, title: 'Informasi Lengkap', icon: User }
      ];
    }
    return [
      { id: 1, title: 'Informasi Dasar', icon: User },
      { id: 2, title: 'Detail Spesifik', icon: Building },
      { id: 3, title: 'Konten & Media', icon: FileText }
    ];
  };

  // Navigation functions
  const canProceedToNext = () => {
    if (currentStep === 1) {
      if (sectionType === 'about') {
        // Untuk section about, validasi title dan content di step 1
        return formData.title.trim().length >= 3 && 
               formData.content.trim().length >= 10 && 
               !validationErrors.title && 
               !validationErrors.content;
      }
      return formData.title.trim().length >= 3 && !validationErrors.title;
    }
    if (currentStep === 2 && sectionType !== 'about') {
      // Untuk section selain 'about', periode wajib diisi di step 2
      return formData.period.trim() !== '' && !validationErrors.period;
    }
    return true;
  };

  const canSubmit = () => {
    const hasTitle = formData.title.trim().length >= 3;
    const hasContent = formData.content.trim().length >= 10;
    // Untuk section 'about', periode tidak wajib diisi
    const hasPeriod = sectionType === 'about' ? true : formData.period.trim() !== '';
    const hasNoErrors = Object.keys(validationErrors).length === 0;
    
    return hasTitle && hasContent && hasPeriod && hasNoErrors;
  };

  const handleNext = () => {
    const steps = getSteps();
    if (currentStep < steps.length && canProceedToNext()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // File upload functions
  const processFileUpload = useCallback(async (file: File) => {
    // Validate file type - now includes SVG
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      await Swal.fire({
        title: 'File Tidak Valid!',
        text: 'Hanya file gambar yang diizinkan (JPG, PNG, GIF, WebP, SVG)',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        background: '#fefefe',
        zIndex: 999999, // Pastikan SweetAlert di atas modal
        customClass: {
          popup: 'rounded-xl shadow-2xl !z-[999999]',
          title: 'text-lg font-semibold'
        }
      });
      return;
    }

    // Validate file size (5MB for better quality, 10MB for SVG)
    const maxSize = file.type === 'image/svg+xml' ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const maxSizeMB = file.type === 'image/svg+xml' ? '10MB' : '5MB';
      await Swal.fire({
        title: 'File Terlalu Besar!',
        text: `Ukuran file maksimal ${maxSizeMB}. File Anda ${fileSizeMB}MB`,
        icon: 'error',
        confirmButtonColor: '#ef4444',
        background: '#fefefe',
        zIndex: 999999, // Pastikan SweetAlert di atas modal
        customClass: {
          popup: 'rounded-xl shadow-2xl !z-[999999]',
          title: 'text-lg font-semibold'
        }
      });
      return;
    }

    setIsUploading(true);
    console.log('🔄 Starting upload process...', { fileName: file.name, fileType: file.type, fileSize: file.size });

    try {
      if (onLogoUpload) {
        console.log('📤 Using onLogoUpload function...');
        
        // Create a proper file input event
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;
        
        const mockEvent = {
          target: fileInput,
          currentTarget: fileInput
        } as React.ChangeEvent<HTMLInputElement>;
        
        await onLogoUpload(mockEvent, sectionType, item?.id);
        
        console.log('✅ Upload completed successfully');
        
        // Show success message
        await Swal.fire({
          title: 'Upload Berhasil!',
          text: 'Gambar berhasil diupload dan disimpan ke database',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          background: '#fefefe',
          zIndex: 999999, // Pastikan SweetAlert di atas modal
          customClass: {
            popup: 'rounded-xl shadow-2xl !z-[999999]',
            title: 'text-lg font-semibold'
          }
        });
      } else {
        console.log('⚠️ No onLogoUpload function, using fallback...');
        
        // Fallback - create object URL for preview
        const tempUrl = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, logo: tempUrl }));
        
        await Swal.fire({
          title: 'Preview Mode',
          text: 'Gambar dipilih untuk preview (akan diupload saat menyimpan)',
          icon: 'info',
          timer: 2000,
          showConfirmButton: false,
          background: '#fefefe',
          zIndex: 999999, // Pastikan SweetAlert di atas modal
          customClass: {
            popup: 'rounded-xl shadow-2xl !z-[999999]',
            title: 'text-lg font-semibold'
          }
        });
      }
    } catch (error) {
      console.error('❌ Upload error:', error);
      await Swal.fire({
        title: 'Upload Gagal!',
        text: `Terjadi kesalahan: ${error instanceof Error ? error.message : 'Unknown error'}`,
        icon: 'error',
        confirmButtonColor: '#ef4444',
        background: '#fefefe',
        zIndex: 999999, // Pastikan SweetAlert di atas modal
        customClass: {
          popup: 'rounded-xl shadow-2xl !z-[999999]',
          title: 'text-lg font-semibold'
        }
      });
    } finally {
      setIsUploading(false);
    }
  }, [onLogoUpload, sectionType, item?.id]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await processFileUpload(file);
    event.target.value = '';
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isUploading) {
      setIsDragOver(true);
    }
  }, [isUploading]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (isUploading) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await processFileUpload(files[0]);
    }
  }, [isUploading, processFileUpload]);

  // Submit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSubmit()) {
      validateField('title', formData.title);
      validateField('content', formData.content);
      // Hanya validate period jika bukan section 'about'
      if (sectionType !== 'about') {
        validateField('period', formData.period);
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const newItem: SectionItem = {
        id: item?.id || `new-${Date.now()}`, // Use existing ID or create new one with 'new-' prefix
        title: formData.title,
        subtitle: formData.subtitle,
        content: formData.content,
        // Hanya include period jika bukan section 'about'
        period: sectionType !== 'about' ? formData.period : undefined,
        logo: formData.logo,
        institution: formData.institution,
        degree: formData.degree,
        company: formData.company,
        position: formData.position
      };

      console.log('📝 Submitting item:', { item: newItem, isEdit: !!item });
      
      // Call onSave to handle the database operations
      onSave(newItem);
    } catch (error) {
      console.error('❌ Error in handleSubmit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      subtitle: '',
      content: '',
      period: '',
      logo: '',
      institution: '',
      degree: '',
      company: '',
      position: ''
    });
    setCurrentStep(1);
    setValidationErrors({});
    onCancel();
  };

  if (!isOpen) return null;

  const SectionIcon = getSectionIcon();
  const steps = getSteps();

  // Render step indicator
  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8 px-4">
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        
        return (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full transition-all duration-300 ${
              isActive ? `bg-gradient-to-r ${getSectionColor()} text-white shadow-lg scale-110` :
              isCompleted ? 'bg-green-500 text-white shadow-md' :
              'bg-gray-200 text-gray-500'
            }`}>
              {isCompleted ? <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" /> : <StepIcon className="w-4 h-4 sm:w-6 sm:h-6" />}
            </div>
            <div className="ml-2 sm:ml-3 hidden sm:block">
              <p className={`text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                Step {step.id}
              </p>
              <p className={`text-xs ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-6 sm:w-12 h-0.5 mx-2 sm:mx-4 transition-colors duration-300 ${
                isCompleted ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );

  // Render step 1
  const renderStep1 = () => (
    <div className="space-y-6 sm:space-y-8 transition-all duration-500 ease-out">
      {/* Title */}
      <div className="space-y-3">
        <label className="block text-sm sm:text-base font-bold text-gray-800 flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${getSectionColor()}`}>
            <SectionIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          {sectionType === 'education' ? 'Nama Institusi' :
           sectionType === 'organization' ? 'Nama Organisasi' :
           sectionType === 'workExperience' ? 'Nama Perusahaan' :
           sectionType === 'about' ? 'Topik' : 'Judul'} 
          <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className={`w-full px-4 py-4 sm:px-6 sm:py-5 border-2 rounded-2xl transition-all duration-300 text-base sm:text-lg font-medium placeholder:text-gray-400 ${
              validationErrors.title 
                ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500 shadow-red-100' :
              formData.title.trim() 
                ? 'border-green-300 bg-green-50 focus:ring-green-500 focus:border-green-500 shadow-green-100' :
                'border-gray-300 bg-white focus:ring-blue-500 focus:border-blue-500 shadow-blue-100'
            } focus:ring-4 focus:ring-opacity-20 shadow-sm hover:shadow-md`}
            placeholder={
              sectionType === 'education' ? 'Contoh: Universitas Negeri Surabaya' :
              sectionType === 'organization' ? 'Contoh: HIMTI Unesa' :
              sectionType === 'workExperience' ? 'Contoh: PT. Teknologi Nusantara' :
              sectionType === 'about' ? 'Contoh: Passion dalam Design' :
              'Masukkan judul...'
            }
            autoFocus
          />
          {formData.title.trim() && !validationErrors.title && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          )}
        </div>
        {validationErrors.title && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{validationErrors.title}</span>
          </div>
        )}
        {formData.title.trim() && !validationErrors.title && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>Judul valid dan siap digunakan!</span>
          </div>
        )}
      </div>

      {/* Content untuk section about di step 1 */}
      {sectionType === 'about' && (
        <div className="space-y-3">
          <label className="block text-sm sm:text-base font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            Deskripsi
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={6}
              className={`w-full px-4 py-4 sm:px-6 sm:py-5 border-2 rounded-2xl resize-none transition-all duration-300 text-base sm:text-lg font-medium placeholder:text-gray-400 leading-relaxed ${
                validationErrors.content 
                  ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500 shadow-red-100' :
                formData.content.trim() 
                  ? 'border-green-300 bg-green-50 focus:ring-green-500 focus:border-green-500 shadow-green-100' :
                  'border-gray-300 bg-white focus:ring-blue-500 focus:border-blue-500 shadow-blue-100'
              } focus:ring-4 focus:ring-opacity-20 shadow-sm hover:shadow-md`}
              placeholder="Ceritakan tentang topik ini secara detail. Jelaskan passion, minat, atau hal-hal yang ingin Anda bagikan..."
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded-md shadow-sm">
              {formData.content.length} karakter
            </div>
          </div>
          
          <div className="flex justify-between items-start">
            {validationErrors.content && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex-1 mr-4">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{validationErrors.content}</span>
              </div>
            )}
            {formData.content.trim() && !validationErrors.content && (
              <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex-1 mr-4">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Deskripsi sudah memenuhi syarat!</span>
              </div>
            )}
            
            <div className="text-right space-y-1 flex-shrink-0">
              <div className="text-xs text-gray-500">
                Minimal: 10 karakter
              </div>
              <div className={`text-xs font-medium ${
                formData.content.length >= 10 ? 'text-green-600' : 'text-gray-400'
              }`}>
                {formData.content.length >= 10 ? '✓ Memenuhi syarat' : `${10 - formData.content.length} lagi`}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtitle for non-about sections */}
      {sectionType !== 'about' && (
        <div className="space-y-3">
          <label className="block text-sm sm:text-base font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            {sectionType === 'education' ? 'Program Studi' :
             sectionType === 'organization' ? 'Jabatan' :
             sectionType === 'workExperience' ? 'Posisi' : 'Subtitle'}
          </label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => handleInputChange('subtitle', e.target.value)}
            className="w-full px-4 py-4 sm:px-6 sm:py-5 border-2 border-gray-300 bg-white rounded-2xl focus:ring-4 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 transition-all duration-300 text-base sm:text-lg font-medium placeholder:text-gray-400 shadow-sm hover:shadow-md"
            placeholder={
              sectionType === 'education' ? 'Contoh: S1 Pendidikan Teknologi Informasi' :
              sectionType === 'organization' ? 'Contoh: Ketua Divisi' :
              sectionType === 'workExperience' ? 'Contoh: Frontend Developer' :
              'Masukkan subtitle...'
            }
          />
        </div>
      )}
    </div>
  );

  // Render step 2
  const renderStep2 = () => {
    // Section about tidak memiliki step 2
    if (sectionType === 'about') {
      return null;
    }

    return (
      <div className="space-y-6 sm:space-y-8 transition-all duration-500 ease-out">
        {/* Period - hanya tampil jika bukan section about */}
        <div className="space-y-3">
          <label className="block text-sm sm:text-base font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            Periode 
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.period}
              onChange={(e) => handleInputChange('period', e.target.value)}
              className={`w-full px-4 py-4 sm:px-6 sm:py-5 border-2 rounded-2xl transition-all duration-300 text-base sm:text-lg font-medium placeholder:text-gray-400 ${
                validationErrors.period 
                  ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500 shadow-red-100' :
                formData.period.trim() 
                  ? 'border-green-300 bg-green-50 focus:ring-green-500 focus:border-green-500 shadow-green-100' :
                  'border-gray-300 bg-white focus:ring-blue-500 focus:border-blue-500 shadow-blue-100'
              } focus:ring-4 focus:ring-opacity-20 shadow-sm hover:shadow-md`}
              placeholder="Contoh: 2020 - 2024 atau Jan 2023 - Present"
            />
            {formData.period.trim() && !validationErrors.period && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            )}
          </div>
          {validationErrors.period && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{validationErrors.period}</span>
            </div>
          )}
        </div>

        {/* Institution/Company specific fields */}
        {sectionType === 'education' && (
          <div className="space-y-3">
            <label className="block text-sm sm:text-base font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              Gelar/Tingkat
            </label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => handleInputChange('degree', e.target.value)}
              className="w-full px-4 py-4 sm:px-6 sm:py-5 border-2 border-gray-300 bg-white rounded-2xl focus:ring-4 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 transition-all duration-300 text-base sm:text-lg font-medium placeholder:text-gray-400 shadow-sm hover:shadow-md"
              placeholder="Contoh: S1, SMA, D3, S2"
            />
          </div>
        )}

        {(sectionType === 'organization' || sectionType === 'workExperience') && (
          <div className="space-y-3">
            <label className="block text-sm sm:text-base font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              Lokasi
            </label>
            <input
              type="text"
              value={sectionType === 'workExperience' ? formData.company : formData.institution}
              onChange={(e) => handleInputChange(
                sectionType === 'workExperience' ? 'company' : 'institution', 
                e.target.value
              )}
              className="w-full px-4 py-4 sm:px-6 sm:py-5 border-2 border-gray-300 bg-white rounded-2xl focus:ring-4 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 transition-all duration-300 text-base sm:text-lg font-medium placeholder:text-gray-400 shadow-sm hover:shadow-md"
              placeholder={sectionType === 'workExperience' ? 'Contoh: Jakarta, Indonesia' : 'Contoh: Surabaya, Jawa Timur'}
            />
          </div>
        )}
      </div>
    );
  };

  // Render step 3
  const renderStep3 = () => (
    <div className="space-y-6 sm:space-y-8 transition-all duration-500 ease-out">
      {/* Content */}
      <div className="space-y-3">
        <label className="block text-sm sm:text-base font-bold text-gray-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          {sectionType === 'about' ? 'Deskripsi' : 'Deskripsi & Pengalaman'} 
          <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <textarea
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            rows={6}
            className={`w-full px-4 py-4 sm:px-6 sm:py-5 border-2 rounded-2xl resize-none transition-all duration-300 text-base sm:text-lg font-medium placeholder:text-gray-400 leading-relaxed ${
              validationErrors.content 
                ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500 shadow-red-100' :
              formData.content.trim() 
                ? 'border-green-300 bg-green-50 focus:ring-green-500 focus:border-green-500 shadow-green-100' :
                'border-gray-300 bg-white focus:ring-blue-500 focus:border-blue-500 shadow-blue-100'
            } focus:ring-4 focus:ring-opacity-20 shadow-sm hover:shadow-md`}
            placeholder={
              sectionType === 'about' ? 
                'Ceritakan tentang topik ini secara detail. Jelaskan passion, minat, atau hal-hal yang ingin Anda bagikan...' :
                'Deskripsikan pengalaman, pencapaian, pembelajaran, atau kontribusi yang Anda berikan. Sertakan detail spesifik yang menggambarkan peran dan tanggung jawab Anda...'
            }
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded-md shadow-sm">
            {formData.content.length} karakter
          </div>
        </div>
        
        <div className="flex justify-between items-start">
          {validationErrors.content && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex-1 mr-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{validationErrors.content}</span>
            </div>
          )}
          {formData.content.trim() && !validationErrors.content && (
            <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex-1 mr-4">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Deskripsi sudah memenuhi syarat!</span>
            </div>
          )}
          
          <div className="text-right space-y-1 flex-shrink-0">
            <div className="text-xs text-gray-500">
              Minimal: 10 karakter
            </div>
            <div className={`text-xs font-medium ${
              formData.content.length >= 10 ? 'text-green-600' : 'text-gray-400'
            }`}>
              {formData.content.length >= 10 ? '✓ Memenuhi syarat' : `${10 - formData.content.length} lagi`}
            </div>
          </div>
        </div>
      </div>

      {/* Logo Upload */}
      {sectionType !== 'about' && (
        <div className="space-y-4">
          <label className="block text-sm sm:text-base font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600">
              <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            Logo/Gambar
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
              Opsional
            </span>
          </label>
          
          <div 
            className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 transition-all duration-300 cursor-pointer overflow-hidden drag-area ${
              isDragOver 
                ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 scale-105' 
                : 'border-gray-300 bg-gradient-to-br from-gray-50 to-white hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100'
            } ${isUploading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isUploading && document.getElementById('file-upload')?.click()}
          >
            <input
              type="file"
              onChange={handleFileUpload}
              accept="image/*,.svg"
              className="hidden"
              id="file-upload"
              disabled={isUploading}
              title="Upload file gambar"
              aria-label="Upload file gambar"
            />
            
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className={`p-4 sm:p-6 rounded-2xl transition-all duration-300 ${
                isDragOver 
                  ? 'bg-gradient-to-br from-blue-100 to-blue-200 scale-110' 
                  : 'bg-gradient-to-br from-gray-100 to-gray-200'
              }`}>
                <Upload className={`w-8 h-8 sm:w-12 sm:h-12 transition-all duration-300 ${
                  isDragOver ? 'text-blue-600' : 'text-gray-500'
                }`} />
              </div>
              
              <div className="space-y-2">
                <h4 className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                  isUploading 
                    ? 'text-gray-400' 
                    : isDragOver 
                      ? 'text-blue-700' 
                      : 'text-gray-800'
                }`}>
                  {isUploading 
                    ? 'Sedang mengupload...' 
                    : isDragOver 
                      ? 'Lepas file di sini' 
                      : 'Upload Logo/Gambar'
                  }
                </h4>
                
                <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Seret & lepas gambar atau klik tombol di bawah untuk memilih file dari komputer Anda
                </p>
              </div>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isUploading) {
                    document.getElementById('file-upload')?.click();
                  }
                }}
                className={`px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform ${
                  isUploading 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                }`}
                disabled={isUploading}
              >
                {isUploading ? 'Mengupload...' : 'Pilih File'}
              </button>
              
              <div className="space-y-1">
                <p className="text-xs text-gray-500 font-medium">Format yang didukung:</p>
                <p className="text-xs text-gray-400">PNG, JPG, GIF, WebP, SVG (Maks. 5MB | SVG 10MB)</p>
              </div>
              
              {isUploading && (
                <div className="flex items-center justify-center space-x-3 py-2">
                  <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-2 border-blue-500 border-t-transparent"></div>
                  <span className="text-sm text-blue-600 font-medium">Sedang memproses gambar...</span>
                </div>
              )}
            </div>

            {/* Enhanced Preview */}
            {formData.logo && (
              <div className="mt-6 p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-sm">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 border-green-300 overflow-hidden bg-white p-2 relative shadow-sm">
                    {formData.logo.endsWith('.svg') || formData.logo.includes('data:image/svg') ? (
                      <div className="w-full h-full flex items-center justify-center relative">
                        <Image 
                          src={formData.logo} 
                          alt="Preview logo SVG"
                          fill
                          className="object-contain" 
                          unoptimized={true}
                        />
                      </div>
                    ) : (
                      <Image 
                        src={formData.logo} 
                        alt="Preview logo"
                        fill
                        className="object-contain rounded-lg" 
                        sizes="(max-width: 640px) 64px, 80px"
                      />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-sm sm:text-base font-bold text-green-800">Gambar berhasil diupload!</p>
                    </div>
                    <p className="text-xs sm:text-sm text-green-700 leading-relaxed">
                      Gambar siap digunakan dalam form. Anda dapat melanjutkan ke langkah berikutnya atau mengganti gambar jika diperlukan.
                    </p>
                    <div className="flex items-center gap-3 text-xs text-green-600">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Format valid
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Ukuran sesuai
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormData(prev => ({ ...prev, logo: '' }));
                    }}
                    className="p-2 sm:p-3 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-xl transition-all duration-200 transform hover:scale-110 active:scale-95"
                    title="Hapus gambar"
                    aria-label="Hapus gambar"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[9999] modal-backdrop transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => e.target === e.currentTarget && handleCancel()}
      >
        <div 
          className={`absolute inset-0 transition-all duration-300 ${
            isOpen ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0'
          }`}
        />
        
        {/* Modal container */}
        <div className="relative z-10 flex items-start justify-center w-full h-full p-2 sm:p-4 overflow-y-auto">
          <div 
            className={`bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-4xl my-4 sm:my-8 modal-container transform transition-all duration-300 max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] ${
              isOpen 
                ? 'scale-100 translate-y-0 opacity-100' 
                : 'scale-95 translate-y-4 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`px-6 py-6 sm:px-8 sm:py-8 bg-gradient-to-r ${getSectionColor()} rounded-t-xl sm:rounded-t-2xl flex-shrink-0 relative overflow-hidden`}>
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              
              <div className="flex items-center justify-between text-white relative z-10 w-full">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="p-3 sm:p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                    <SectionIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                      {item ? 'Edit' : 'Tambah'} {getSectionTitle()}
                    </h3>
                    <p className="text-white/90 text-sm sm:text-base font-medium">
                      {item ? 'Perbarui informasi item yang sudah ada' : 'Tambahkan item baru ke portfolio Anda'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCancel}
                  className="p-3 sm:p-4 hover:bg-white/20 rounded-2xl transition-all duration-200 transform hover:scale-110 active:scale-95 border border-white/30 backdrop-blur-sm"
                  title="Tutup modal"
                  aria-label="Tutup modal"
                >
                  <X className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
              </div>
            </div>

            {/* Step Indicator */}
            <div className="px-6 py-6 sm:px-8 sm:py-8 bg-gradient-to-b from-white to-gray-50 border-b border-gray-200 flex-shrink-0">
              {renderStepIndicator()}
            </div>

            {/* Content - Scrollable */}
            <form onSubmit={handleSubmit}>
              <div className="scrollable-area">
                <div 
                  className="h-full overflow-y-auto bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 modal-content modal-scroll-container"
                  tabIndex={0}
                  role="region"
                  aria-label="Form content area"
                >
                  <div className="px-6 py-6 sm:px-8 sm:py-8 min-h-full">
                    <div className="space-y-6">
                      {currentStep === 1 && renderStep1()}
                      {currentStep === 2 && renderStep2()}
                      {currentStep === 3 && renderStep3()}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="px-6 py-6 sm:px-8 sm:py-8 border-t border-gray-200 rounded-b-xl sm:rounded-b-2xl bg-gradient-to-r from-gray-50 via-white to-gray-50 flex-shrink-0">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                  <div className="flex gap-3 sm:gap-4 order-2 sm:order-1">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handlePrevious}
                        className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-gray-300 rounded-xl sm:rounded-2xl text-gray-700 hover:bg-white hover:border-gray-400 hover:shadow-md transition-all duration-200 font-semibold text-sm sm:text-base flex items-center gap-2 transform hover:scale-105 active:scale-95"
                      >
                        <span>←</span>
                        <span>Sebelumnya</span>
                      </button>
                    )}
                  </div>
                  
                  <div className="flex gap-3 sm:gap-4 order-1 sm:order-2">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-gray-300 rounded-xl sm:rounded-2xl text-gray-700 hover:bg-white hover:border-gray-400 hover:shadow-md transition-all duration-200 font-semibold text-sm sm:text-base transform hover:scale-105 active:scale-95"
                    >
                      Batal
                    </button>
                    
                    {/* Untuk section about, langsung tampilkan tombol submit di step 1 */}
                    {sectionType === 'about' && currentStep === 1 ? (
                      <button
                        type="submit"
                        disabled={isSubmitting || !canSubmit()}
                        className={`px-8 py-3 sm:px-12 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 font-bold text-sm sm:text-base flex items-center gap-3 transform ${
                          !isSubmitting && canSubmit()
                            ? `bg-gradient-to-r ${getSectionColor()} text-white hover:shadow-2xl hover:scale-105 active:scale-95 shadow-lg`
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Menyimpan...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            <span>{item ? 'Update' : 'Simpan'}</span>
                          </>
                        )}
                      </button>
                    ) : currentStep < steps.length ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!canProceedToNext()}
                        className={`px-8 py-3 sm:px-12 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 font-bold text-sm sm:text-base flex items-center gap-3 transform ${
                          canProceedToNext() 
                            ? `bg-gradient-to-r ${getSectionColor()} text-white hover:shadow-2xl hover:scale-105 active:scale-95 shadow-lg` 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                        }`}
                      >
                        <span>Selanjutnya</span>
                        <span className="text-lg">→</span>
                        <span className="text-xs opacity-75 bg-white/20 px-2 py-1 rounded-full hidden sm:inline">
                          {currentStep}/{steps.length}
                        </span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting || !canSubmit()}
                        className={`px-8 py-3 sm:px-12 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 font-bold text-sm sm:text-base flex items-center gap-3 transform ${
                          !isSubmitting && canSubmit()
                            ? `bg-gradient-to-r ${getSectionColor()} text-white hover:shadow-2xl hover:scale-105 active:scale-95 shadow-lg`
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Menyimpan...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            <span>{item ? 'Update' : 'Simpan'}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Custom styles for better scrolling */}
      <style jsx global>{`
        /* Custom scrollbar styles */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db #f3f4f6;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f9fafb;
          border-radius: 4px;
          margin: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
          border: 1px solid #f9fafb;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:active {
          background: #6b7280;
        }
        
        /* Modal content scroll behavior */
        .modal-content {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
          overflow-x: hidden;
          overflow-y: auto !important;
          max-height: calc(100vh - 350px);
          will-change: scroll-position;
        }
        
        /* Enhanced scroll container for mouse wheel */
        .modal-scroll-container {
          min-height: 0;
          max-height: calc(100vh - 350px);
          overscroll-behavior: contain;
          scroll-behavior: smooth;
          position: relative;
          outline: none;
        }
        
        .modal-scroll-container:focus {
          outline: none;
        }
        
        /* Force scroll capability */
        .modal-content::-webkit-scrollbar {
          width: 8px !important;
          display: block !important;
        }
        
        /* Backdrop scroll prevention */
        .modal-backdrop {
          position: fixed;
          overscroll-behavior: contain;
          touch-action: none;
        }
        
        /* Ensure content is scrollable */
        .modal-content > div {
          min-height: calc(100vh - 300px);
        }
        
        /* Mobile specific improvements */
        @media (max-width: 640px) {
          .modal-content, .modal-scroll-container {
            max-height: calc(100vh - 250px);
          }
          
          .modal-content > div {
            min-height: calc(100vh - 200px);
          }
        }
        
        /* Prevent text selection on drag areas */
        .drag-area {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        
        /* Force flex container scroll */
        .modal-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          max-height: calc(100vh - 2rem);
        }
        
        /* Ensure scrollable area takes remaining space */
        .scrollable-area {
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default ItemFormModal;
            