import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Save, X, Upload } from 'lucide-react';
import Swal from 'sweetalert2';
import { unifiedAboutApi } from '../../../services/api';
import type { UnifiedSection } from '../../../services/api';
import AddSectionModal from './AddSectionModal';
import ItemFormModal from './ItemFormModal';

// Types
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

interface Section {
  id: string;
  title: string;
  type: 'about' | 'education' | 'organization' | 'workExperience' | 'custom';
  items: SectionItem[];
}

interface UnifiedAboutSectionProps {
  sections?: UnifiedSection[];
  onUpdate?: (sections: UnifiedSection[]) => void;
  onLogoUpload?: (event: React.ChangeEvent<HTMLInputElement>, type: string, id?: string) => Promise<void>;
  uploadedImageUrl?: string;
  onImageUploadComplete?: () => void;
  onAddSection?: (section: any) => void;
}

const defaultSections: Section[] = [
  {
    id: 'section-about',
    title: 'Tentang Saya',
    type: 'about',
    items: [
      {
        id: 'about-1',
        title: 'Tentang Saya',
        content: 'Saya adalah seorang mahasiswa aktif di Universitas Negeri Surabaya. Dengan pengalaman dalam berbagai bidang desain, mulai dari desain grafis hingga desain UI/UX, saya selalu berusaha menghadirkan kreativitas yang tak hanya menarik secara visual, tetapi juga fungsional.\n\nSebagai seorang desainer, saya selalu berusaha terus berkembang dan mengeksplorasi tren desain terkini untuk memberikan hasil yang relevan dan up-to-date.'
      }
    ]
  },
  {
    id: 'section-education',
    title: 'Pendidikan',
    type: 'education',
    items: []
  },
  {
    id: 'section-organization',
    title: 'Pengalaman Organisasi',
    type: 'organization',
    items: []
  },
  {
    id: 'section-workExperience',
    title: 'Pengalaman Kerja',
    type: 'workExperience',
    items: []
  }
];

const UnifiedAboutSection: React.FC<UnifiedAboutSectionProps> = ({ 
  sections: propSections,
  onUpdate,
  onLogoUpload,
  uploadedImageUrl,
  onImageUploadComplete,
  onAddSection
}) => {
  const [sectionsData, setSectionsData] = useState<Section[]>(defaultSections); // Always start with default sections
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<string>('');
  const [editingItem, setEditingItem] = useState<SectionItem | undefined>();
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true); // Start with loading state

  // Helper function to convert Section[] to UnifiedSection[]
  const convertSectionsToUnified = useCallback((sections: Section[]): UnifiedSection[] => {
    try {
      return sections.flatMap(section => 
        section.items.map(item => ({
          id: item.id,
          type: section.type,
          title: item.title,
          subtitle: item.subtitle,
          content: item.content || '',
          period: item.period,
          institution: item.institution,
          degree: item.degree,
          company: item.company,
          position: item.position,
          logo: item.logo,
          image: item.logo
        }))
      );
    } catch (error) {
      console.error('Error converting sections to unified:', error);
      return [];
    }
  }, []);

  // Convert unified API data to sections format
  const convertUnifiedDataToSections = (unifiedSections: UnifiedSection[]) => {
    const groupedSections: Section[] = [];
    const sectionTypes = ['about', 'education', 'organization', 'workExperience', 'custom'];
    
    sectionTypes.forEach(type => {
      const typeSections = unifiedSections.filter(s => s.type === type);
      if (typeSections.length > 0 || type !== 'custom') {
        const sectionTitle = type === 'about' ? 'Tentang Saya' :
                            type === 'education' ? 'Pendidikan' :
                            type === 'organization' ? 'Pengalaman Organisasi' :
                            type === 'workExperience' ? 'Pengalaman Kerja' : 'Custom';
        
        groupedSections.push({
          id: `section-${type}`,
          title: sectionTitle,
          type: type as any,
          items: typeSections.map(section => ({
            id: section.id.toString(),
            title: section.title,
            subtitle: section.subtitle,
            content: section.content,
            period: section.period,
            logo: section.logo ? (section.logo.startsWith('http') ? section.logo : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/storage/about-sections/${section.logo}`) : undefined,
            institution: section.institution,
            degree: section.degree,
            company: section.company,
            position: section.position || section.name,
          }))
        });
      }
    });
    
    // Handle custom sections separately
    const customSections = unifiedSections.filter(s => s.type === 'custom');
    if (customSections.length > 0) {
      const customGrouped = customSections.reduce((acc: any, section: any) => {
        const sectionTitle = section.section_title || 'Section Lainnya';
        if (!acc[sectionTitle]) {
          acc[sectionTitle] = [];
        }
        acc[sectionTitle].push(section);
        return acc;
      }, {});
      
      Object.entries(customGrouped).forEach(([sectionTitle, sections]: [string, any]) => {
        groupedSections.push({
          id: `section-custom-${sectionTitle.toLowerCase().replace(/\s+/g, '-')}`,
          title: sectionTitle,
          type: 'custom',
          items: sections.map((section: any) => ({
            id: section.id.toString(),
            title: section.title,
            subtitle: section.subtitle,
            content: section.content,
            logo: section.image || section.logo
          }))
        });
      });
    }
    
    return groupedSections;
  };

  // Load data from About API (existing tentangku page) - REMOVED: No longer needed

  // Auto-load data from database on component mount
  useEffect(() => {
    const loadDataFromDatabase = async () => {
      console.log('🔄 Component mounted, loading data from database...');
      
      try {
        // Always try to load from database first
  const unifiedSections = await unifiedAboutApi.getAllSections();
        
        if (unifiedSections && unifiedSections.length > 0) {
          console.log('✅ Found database data:', unifiedSections.length, 'sections');
          const convertedSections = convertUnifiedDataToSections(unifiedSections);
          setSectionsData(convertedSections);
          
          // Update localStorage as backup
          localStorage.setItem('unifiedAboutSections', JSON.stringify(convertedSections));
          
          // Update parent component
          if (onUpdate) {
            onUpdate(unifiedSections);
          }
        } else {
          console.log('📂 No database data found, checking localStorage backup...');
          // If no database data, check localStorage as fallback
          const savedData = localStorage.getItem('unifiedAboutSections');
          if (savedData) {
            try {
              const parsedData = JSON.parse(savedData);
              console.log('📦 Using localStorage backup:', parsedData.length, 'sections');
              setSectionsData(parsedData);
              if (onUpdate && Array.isArray(parsedData)) {
                onUpdate(convertSectionsToUnified(parsedData));
              }
            } catch (error) {
              console.error('❌ Error parsing localStorage data, using defaults:', error);
              setSectionsData(defaultSections);
              if (onUpdate) {
                onUpdate(convertSectionsToUnified(defaultSections));
              }
            }
          } else {
            // Use default sections if no data anywhere
            console.log('� Using default sections');
            setSectionsData(defaultSections);
            if (onUpdate) {
              onUpdate(convertSectionsToUnified(defaultSections));
            }
          }
        }
      } catch (error) {
        console.error('❌ Error loading from database, using localStorage backup:', error);
        
        // Fallback to localStorage if database fails
        const savedData = localStorage.getItem('unifiedAboutSections');
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            setSectionsData(parsedData);
            if (onUpdate && Array.isArray(parsedData)) {
              onUpdate(convertSectionsToUnified(parsedData));
            }
          } catch (parseError) {
            setSectionsData(defaultSections);
            if (onUpdate) {
              onUpdate(convertSectionsToUnified(defaultSections));
            }
          }
        } else {
          setSectionsData(defaultSections);
          if (onUpdate) {
            onUpdate(convertSectionsToUnified(defaultSections));
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadDataFromDatabase();
  }, [convertSectionsToUnified, onUpdate]); // Add onUpdate to dependencies

  // Handle logo upload
  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>, itemId?: string) => {
    try {
      const file = event.target.files?.[0];
      if (!file) {
        console.log('⚠️ No file selected');
        return;
      }

      console.log('📤 Starting logo upload...', { 
        fileName: file.name, 
        fileType: file.type, 
        fileSize: file.size,
        itemId 
      });

      // Validate file type - include SVG
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        console.error('❌ Invalid file type:', file.type);
        Swal.fire({
          icon: 'error',
          title: 'File tidak valid',
          text: 'Silakan pilih file gambar (JPG, PNG, GIF, WebP, SVG)',
          timer: 3000,
          showConfirmButton: false,
          customClass: {
            popup: '!z-[999999]'
          }
        });
        return;
      }

      // Validate file size (5MB for images, 10MB for SVG)
      const maxSize = file.type === 'image/svg+xml' ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
      if (file.size > maxSize) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
        const maxSizeMB = file.type === 'image/svg+xml' ? '10MB' : '5MB';
        console.error('❌ File too large:', fileSizeMB + 'MB');
        Swal.fire({
          icon: 'error',
          title: 'File terlalu besar',
          text: `Ukuran file maksimal ${maxSizeMB}. File Anda ${fileSizeMB}MB`,
          timer: 3000,
          showConfirmButton: false,
          customClass: {
            popup: '!z-[999999]'
          }
        });
        return;
      }

      console.log('✅ File validation passed, uploading...');

      // Upload logo using unifiedAboutAPI
  const uploadedLogoUrl = await unifiedAboutApi.uploadLogo(file);
      console.log('✅ Logo uploaded successfully:', uploadedLogoUrl);

      // Always update the item with new logo URL immediately
      if (itemId) {
        console.log('🔄 Updating item with new logo...', itemId);
        // Find the item that needs to be updated
        setSectionsData(prev => 
          prev.map(section => ({
            ...section,
            items: section.items.map(item => 
              item.id === itemId ? { ...item, logo: uploadedLogoUrl } : item
            )
          }))
        );
        console.log('✅ Item updated with new logo in UI');
        
        // Save to database
        const sectionData = sectionsData.find(s => s.items.some(i => i.id === itemId));
        if (sectionData) {
          const item = sectionData.items.find(i => i.id === itemId);
          if (item) {
            const updatedItem = { ...item, logo: uploadedLogoUrl };
            await handleSaveItem(sectionData.type, updatedItem);
            console.log('✅ Item updated with new logo and saved to database');
          }
        }
      }

      Swal.fire({
        icon: 'success',
        title: 'Logo berhasil diunggah!',
        text: 'Logo telah disimpan dan diperbarui',
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: '!z-[999999]'
        }
      });

    } catch (error: any) {
      console.error('❌ Error uploading logo:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal mengunggah logo',
        text: error.message || 'Terjadi kesalahan saat mengunggah logo',
        timer: 3000,
        showConfirmButton: false,
        customClass: {
          popup: '!z-[999999]'
        }
      });
    }
  };

  // Auto-save to localStorage and sync with parent when sectionsData changes
  useEffect(() => {
    if (sectionsData.length > 0 && !isLoading) {
      localStorage.setItem('unifiedAboutSections', JSON.stringify(sectionsData));
      console.log('💾 Auto-saved to localStorage');
      
      // Also update parent component
      if (onUpdate) {
        onUpdate(convertSectionsToUnified(sectionsData));
      }
    }
  }, [sectionsData, onUpdate, isLoading, convertSectionsToUnified]);

  // Handle save item (create/update to database)
  const handleSaveItem = async (sectionType: string, item: SectionItem) => {
    try {
      console.log('💾 Saving item to database:', { sectionType, item });

      const sectionData: Partial<import('../../../services/unifiedAboutAPI').UnifiedSection> = {
        type: sectionType as 'about' | 'education' | 'organization' | 'workExperience' | 'custom',
        title: item.title,
        content: item.content,
        sort_order: 0
      };

      // Add optional fields only if they have values
      if (item.subtitle) sectionData.subtitle = item.subtitle;
      if (item.period) sectionData.period = item.period;
      if (item.institution) sectionData.institution = item.institution;
      if (item.degree) sectionData.degree = item.degree;
      if (item.company) sectionData.company = item.company;
      if (item.position) sectionData.position = item.position;
      if (item.logo) sectionData.logo = item.logo;
      if (item.logo) sectionData.image = item.logo;
      if (sectionType === 'custom') {
        const sectionTitle = sectionsData.find(s => s.items.some(i => i.id === item.id))?.title;
        if (sectionTitle) sectionData.section_title = sectionTitle;
      }

      if (item.id.startsWith('new-')) {
        // Create new item
  const newSection = await unifiedAboutApi.createSection(sectionData);
        console.log('✅ Item created in database:', newSection);

        // Update local state with real ID
        setSectionsData(prev => {
          const updated = prev.map(section => ({
            ...section,
            items: section.items.map(existingItem => 
              existingItem.id === item.id ? { ...existingItem, id: newSection.id.toString() } : existingItem
            )
          }));
          
          // Force localStorage update
          localStorage.setItem('unifiedAboutSections', JSON.stringify(updated));
          return updated;
        });

        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Item berhasil disimpan ke database',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        // Update existing item
  const updatedSection = await unifiedAboutApi.updateSection(item.id, sectionData);
        console.log('✅ Item updated in database:', updatedSection);

        // Force localStorage update after database update
        localStorage.setItem('unifiedAboutSections', JSON.stringify(sectionsData));

        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Item berhasil diperbarui di database',
          timer: 2000,
          showConfirmButton: false
        });
      }

    } catch (error: any) {
      console.error('Error saving item:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal menyimpan',
        text: error.message || 'Terjadi kesalahan saat menyimpan ke database',
        timer: 3000,
        showConfirmButton: false
      });
    }
  };

  // Handle delete item
  const handleDeleteItem = async (sectionId: string, itemId: string) => {
    try {
      const result = await Swal.fire({
        title: 'Konfirmasi Hapus',
        text: 'Apakah Anda yakin ingin menghapus item ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
      });

      if (result.isConfirmed) {
        console.log('🗑️ Deleting item from database:', itemId);

        // Only delete from database if it's not a new item
        if (!itemId.startsWith('new-')) {
          await unifiedAboutApi.deleteSection(itemId);
          console.log('✅ Item deleted from database');
        }

        // Remove from local state
        setSectionsData(prev => 
          prev.map(section => 
            section.id === sectionId 
              ? { ...section, items: section.items.filter(item => item.id !== itemId) }
              : section
          )
        );

        // Update localStorage
        const updatedSections = sectionsData.map(section => 
          section.id === sectionId 
            ? { ...section, items: section.items.filter(item => item.id !== itemId) }
            : section
        );
        localStorage.setItem('unifiedAboutSections', JSON.stringify(updatedSections));

        // Update parent component
        if (onUpdate) {
          onUpdate(convertSectionsToUnified(updatedSections));
        }
        
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Item berhasil dihapus',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error: any) {
      console.error('Error deleting item:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal menghapus',
        text: error.message || 'Terjadi kesalahan saat menghapus dari database',
        timer: 3000,
        showConfirmButton: false
      });
    }
  };

  // Add new item to section
  const handleAddItem = (sectionId: string, newItem: SectionItem) => {
    const tempId = `new-${Date.now()}`;
    const itemWithId = { ...newItem, id: tempId };

    setSectionsData(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, items: [...section.items, itemWithId] }
          : section
      )
    );

    // Auto-save new item to database
    const sectionType = sectionsData.find(s => s.id === sectionId)?.type || 'custom';
    handleSaveItem(sectionType, itemWithId);

    setIsAddItemOpen(false);
    setSelectedSectionId('');
  };

  // Add new section
  const handleAddSection = async (newSection: Section) => {
    // Update local state
    setSectionsData(prev => [...prev, newSection]);
    
    // For custom sections, we don't need to save to database until items are added
    // Standard sections (about, education, etc.) are structural and don't need database entries
    
    if (onUpdate) {
      onUpdate(convertSectionsToUnified([...sectionsData, newSection]));
    }

    setIsAddSectionOpen(false);
  };

  // Edit item
  const handleEditItem = (item: SectionItem) => {
    // Find the section that contains this item
    const sectionWithItem = sectionsData.find(section => 
      section.items.some(sectionItem => sectionItem.id === item.id)
    );
    
    if (sectionWithItem) {
      setSelectedSectionId(sectionWithItem.id);
    }
    
    setEditingItem(item);
    setIsAddItemOpen(true);
  };

  // Update item
  const handleUpdateItem = async (updatedItem: SectionItem) => {
    // Update local state first
    setSectionsData(prev => 
      prev.map(section => ({
        ...section,
        items: section.items.map(item => 
          item.id === updatedItem.id ? updatedItem : item
        )
      }))
    );

    // Find section type and save to database
    const sectionType = sectionsData.find(s => s.items.some(i => i.id === updatedItem.id))?.type || 'custom';
    await handleSaveItem(sectionType, updatedItem);

    // Update parent component
    if (onUpdate) {
      const updatedSections = sectionsData.map(section => ({
        ...section,
        items: section.items.map(item => 
          item.id === updatedItem.id ? updatedItem : item
        )
      }));
      if (onUpdate) {
        onUpdate(convertSectionsToUnified(updatedSections));
      }
    }

    setEditingItem(undefined);
    setIsAddItemOpen(false);
  };

  // Handle section title edit
  const handleTitleEdit = async (sectionId: string, newTitle: string) => {
    // Update local state
    setSectionsData(prev => 
      prev.map(section => 
        section.id === sectionId ? { ...section, title: newTitle } : section
      )
    );

    // If it's a custom section, update all items in that section in database
    const section = sectionsData.find(s => s.id === sectionId);
    if (section && section.type === 'custom') {
      // Update section_title for all items in this custom section
      for (const item of section.items) {
        if (!item.id.startsWith('new-')) {
          try {
            await unifiedAboutApi.updateSection(item.id, {
              section_title: newTitle
            });
          } catch (error) {
            console.error('Error updating section title in database:', error);
          }
        }
      }
    }

    // Update parent component
    if (onUpdate) {
      const updatedSections = sectionsData.map(section => 
        section.id === sectionId ? { ...section, title: newTitle } : section
      );
      onUpdate(convertSectionsToUnified(updatedSections));
    }

    setEditingTitle(null);
    setTempTitle('');
  };

  if (isLoading) {
    console.log('🔄 Component is in loading state...');
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Memuat data dari database...</p>
      </div>
    );
  }

  console.log('✅ Component rendered, sections data:', sectionsData);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header with Add Section Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Kelola Konten</h2>
          <p className="text-gray-600 text-sm">Data otomatis dimuat dari database dan tersimpan setiap ada perubahan</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsAddSectionOpen(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Tambah Section
          </button>
        </div>
      </div>

      {/* Sections Display */}
      <div className="space-y-8 mt-8">
        {sectionsData.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada konten</h3>
            <p className="text-gray-500 mb-6">Mulai dengan menambahkan section pertama Anda</p>
            <button
              onClick={() => setIsAddSectionOpen(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Tambah Section Pertama
            </button>
          </div>
        ) : (
          sectionsData.map((section) => (
            <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Section Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {editingTitle === section.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tempTitle}
                          onChange={(e) => setTempTitle(e.target.value)}
                          aria-label="Edit section title"
                          placeholder="Enter section title"
                          className="text-xl font-semibold bg-white border border-gray-300 rounded px-3 py-1"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleTitleEdit(section.id, tempTitle);
                            }
                          }}
                          autoFocus
                        />
                        <button
                          onClick={() => handleTitleEdit(section.id, tempTitle)}
                          className="text-green-600 hover:text-green-700 p-1"
                          aria-label="Simpan perubahan judul"
                          title="Simpan perubahan judul"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingTitle(null);
                            setTempTitle('');
                          }}
                          className="text-gray-500 hover:text-gray-700 p-1"
                          aria-label="Batal edit judul"
                          title="Batal edit judul"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
                        {/* Hanya tampilkan tombol edit title jika bukan section Tentang Saya */}
                        {section.type !== 'about' && (
                          <button
                            onClick={() => {
                              setEditingTitle(section.id);
                              setTempTitle(section.title);
                            }}
                            className="text-gray-400 hover:text-gray-600 p-1"
                            aria-label="Edit judul section"
                            title="Edit judul section"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      {section.items.length} item{section.items.length !== 1 ? 's' : ''}
                    </span>
                    {/* Hanya tampilkan tombol Tambah Item jika bukan section Tentang Saya */}
                    {section.type !== 'about' && (
                      <button
                        onClick={() => {
                          setSelectedSectionId(section.id);
                          setEditingItem(undefined);
                          setIsAddItemOpen(true);
                        }}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Tambah Item
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Section Items */}
              <div className="p-6">
                {section.items.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="mb-3">Belum ada item di section ini</p>
                    {/* Hanya tampilkan tombol tambah item jika bukan section Tentang Saya */}
                    {section.type !== 'about' && (
                      <button
                        onClick={() => {
                          setSelectedSectionId(section.id);
                          setEditingItem(undefined);
                          setIsAddItemOpen(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        + Tambah item pertama
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-4">
                              {item.logo && (
                                <div className="flex-shrink-0">
                                  <Image 
                                    src={item.logo} 
                                    alt={item.title}
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 object-cover rounded-lg"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                                {item.subtitle && (
                                  <p className="text-gray-600 text-sm mb-2">{item.subtitle}</p>
                                )}
                                {item.period && (
                                  <p className="text-indigo-600 text-sm font-medium mb-2">{item.period}</p>
                                )}
                                {(item.institution || item.company) && (
                                  <p className="text-gray-500 text-sm mb-2">
                                    {item.institution || item.company}
                                    {item.degree && ` • ${item.degree}`}
                                    {item.position && ` • ${item.position}`}
                                  </p>
                                )}
                                <p className="text-gray-700 text-sm leading-relaxed">
                                  {item.content.length > 150 
                                    ? `${item.content.substring(0, 150)}...` 
                                    : item.content
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {/* Hanya tampilkan tombol upload logo jika bukan section Tentang Saya */}
                            {section.type !== 'about' && (
                              <label className="cursor-pointer">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleLogoUpload(e, item.id)}
                                  className="hidden"
                                  aria-label="Upload logo untuk item ini"
                                  title="Upload logo untuk item ini"
                                />
                                <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                                  <Upload className="w-4 h-4" />
                                  <span className="text-sm">Logo</span>
                                </div>
                              </label>
                            )}
                            <button
                              onClick={() => handleEditItem(item)}
                              className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                              aria-label="Edit item ini"
                              title="Edit item ini"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            {/* Hanya tampilkan tombol hapus jika bukan section Tentang Saya */}
                            {section.type !== 'about' && (
                              <button
                                onClick={() => handleDeleteItem(section.id, item.id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                aria-label="Hapus item ini"
                                title="Hapus item ini"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Section Modal */}
      {isAddSectionOpen && (
        <AddSectionModal
          isOpen={isAddSectionOpen}
          onClose={() => setIsAddSectionOpen(false)}
          onSave={handleAddSection}
        />
      )}

      {/* Add/Edit Item Modal */}
      {isAddItemOpen && (
        <ItemFormModal
          isOpen={isAddItemOpen}
          item={editingItem}
          sectionType={sectionsData.find(s => s.id === selectedSectionId)?.type || 'custom'}
          onSave={editingItem ? handleUpdateItem : (item: SectionItem) => handleAddItem(selectedSectionId, item)}
          onCancel={() => {
            setIsAddItemOpen(false);
            setEditingItem(undefined);
            setSelectedSectionId('');
          }}
          onLogoUpload={handleLogoUpload}
        />
      )}
    </div>
  );
};

export default UnifiedAboutSection;
