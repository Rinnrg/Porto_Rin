import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";
import UnifiedAboutSection from '../../components/admin/AboutMe/UnifiedAboutSection';
// import { AutoSaveToast } from "@/utils/toast";
// import { useAuthContext } from "@/context/AuthContext";
import unifiedAboutAPI, { UnifiedSection } from "@/services/unifiedAboutAPI";
// import { defaultSections } from "@/data/defaultAboutData";

interface AboutData {
  sections: UnifiedSection[];
}

// Simple toast replacement
const AutoSaveToast = {
  success: (message: string) => console.log('✅', message),
  error: (message: string) => console.error('❌', message)
};

// Simple auth context replacement
const useAuthContext = () => ({
  isAuthenticated: true,
  loading: false
});

export default function AboutMeAdminPage() {
  const { isAuthenticated, loading } = useAuthContext();
  const [aboutData, setAboutData] = useState<AboutData>({
    sections: [] // Start with empty, let UnifiedAboutSection handle loading
  });
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | 'idle'>('idle');

  // No need to load data from API - UnifiedAboutSection handles everything

  const handleSectionsUpdate = useCallback(async (sections: UnifiedSection[]) => {
    try {
      setSaveStatus('saving');
      
      // Update local state immediately for better UX
      setAboutData({ sections });

      // Auto-save indication
      setTimeout(() => {
        setSaveStatus('saved');
        AutoSaveToast.success('Perubahan berhasil disimpan!');
        
        setTimeout(() => setSaveStatus('idle'), 3000);
      }, 500);

    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus('error');
      AutoSaveToast.error('Gagal menyimpan perubahan');
    }
  }, []);

  const handleLogoUpload = useCallback(async (
    event: React.ChangeEvent<HTMLInputElement>, 
    type: string, 
    id?: string
  ): Promise<void> => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      try {
        let imageUrl: string;
        
        if (id) {
          // Update existing section
          imageUrl = await unifiedAboutAPI.uploadLogo(id, file);
        } else {
          // For new sections, create temporary URL
          imageUrl = await unifiedAboutAPI.uploadTempLogo(file);
        }
        
        setUploadedImageUrl(imageUrl);
        AutoSaveToast.success('Gambar berhasil diupload');
      } catch (error) {
        console.error('Upload error:', error);
        AutoSaveToast.error('Gagal upload gambar');
      }
    }
  }, []);

  const handleImageUploadComplete = useCallback(() => {
    setUploadedImageUrl("");
  }, []);

  const handleAddSection = useCallback((newSection: any) => {
    setAboutData(prev => ({
      sections: [...prev.sections, newSection]
    }));
    AutoSaveToast.success('Section baru berhasil ditambahkan!');
  }, []);

  // Remove localStorage loading since data is now handled by UnifiedAboutSection
  // This component only handles state management and delegates data loading to child components

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600">You need to be logged in to access this page.</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">About Me Management</h1>
              <p className="text-gray-600 mt-2">
                Kelola semua informasi tentang diri Anda dalam satu tempat yang terpadu
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <UnifiedAboutSection
            sections={aboutData.sections}
            onUpdate={handleSectionsUpdate}
            onLogoUpload={handleLogoUpload}
            uploadedImageUrl={uploadedImageUrl}
            onImageUploadComplete={handleImageUploadComplete}
            onAddSection={handleAddSection}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
