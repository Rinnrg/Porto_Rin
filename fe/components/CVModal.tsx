import React from 'react';
import { X, Download, Calendar, FileText, User } from 'lucide-react';

interface CVData {
  id?: number;
  fileName: string;
  fileUrl: string;
  description?: string;
  uploadDate: string;
  fileSize?: string;
  originalName?: string;
}

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: CVData | null;
  loading: boolean;
}

const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose, cvData, loading }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    if (cvData?.fileUrl) {
      // Build full URL if needed
      let downloadUrl = cvData.fileUrl;
      if (!downloadUrl.startsWith('http')) {
        downloadUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${downloadUrl}`;
      }
      
      // Create a temporary link to download the file
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = cvData.originalName || cvData.fileName || 'CV_Rino_Raihan_Gumilang.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePreview = () => {
    if (cvData?.fileUrl) {
      // Build full URL if needed
      let previewUrl = cvData.fileUrl;
      if (!previewUrl.startsWith('http')) {
        previewUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${previewUrl}`;
      }
      
      window.open(previewUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Curriculum Vitae</h2>
                <p className="text-sm text-gray-500">Rino Raihan Gumilang</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Memuat data CV...</span>
              </div>
            ) : cvData ? (
              <div className="space-y-6">
                {/* CV Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <FileText className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Nama File</p>
                        <p className="text-gray-900">{cvData.originalName || cvData.fileName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Tanggal Upload</p>
                        <p className="text-gray-900">
                          {new Date(cvData.uploadDate).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {cvData.fileSize && (
                      <div className="flex items-start space-x-3">
                        <FileText className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Ukuran File</p>
                          <p className="text-gray-900">{cvData.fileSize}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start space-x-3">
                      <User className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Status</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          CV Aktif
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {cvData.description && (
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Deskripsi</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">{cvData.description}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={handlePreview}
                    className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Lihat Preview
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download CV
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">CV Tidak Tersedia</h3>
                <p className="text-gray-500">Belum ada CV yang diupload atau CV sedang dalam proses update.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVModal;
