"use client";
import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Upload, Download, Eye, Edit3, Save, X } from "lucide-react";
import Swal from 'sweetalert2';
import { useAuthContext } from "@/context/AuthContext";
// import { api } from "@/services/api"; // Removed - services folder deleted

interface CVData {
  id?: number;
  fileName: string;
  fileUrl: string;
  description?: string;
  uploadDate: string;
  fileSize?: string;
}

export default function AdminCV() {
  const { isAuthenticated, loading: authLoading, user, token } = useAuthContext();
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");

  // Add SweetAlert2 styling override
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .swal2-container {
        z-index: 10000 !important;
      }
      .swal2-popup {
        font-family: inherit !important;
        border-radius: 12px !important;
      }
      .swal2-title {
        color: #1f2937 !important;
        font-weight: 600 !important;
      }
      .swal2-content {
        color: #4b5563 !important;
      }
      .swal2-confirm {
        border-radius: 8px !important;
        padding: 8px 24px !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const showAlert = (type: 'success' | 'error' | 'warning' | 'info', title: string, text: string, footer?: string) => {
    const colors = {
      success: '#10b981',
      error: '#ef4444', 
      warning: '#f59e0b',
      info: '#3b82f6'
    };
    
    return Swal.fire({
      title: title,
      text: text,
      icon: type,
      confirmButtonText: 'OK',
      confirmButtonColor: colors[type],
      footer: footer,
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'rounded-lg'
      }
    });
  };

  // Auth check and loading states
  if (authLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading authentication...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-red-800 mb-2">Authentication Required</h2>
              <p className="text-red-600 mb-4">You must be logged in to access this page.</p>
              <button
                onClick={() => window.location.href = '/admin/login'}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading CV data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Kelola CV</h1>
          <p className="mt-2 text-gray-600">
            Upload dan kelola curriculum vitae Anda
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Upload CV Baru</h2>
            <Upload className="w-6 h-6 text-indigo-600" />
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Drag & drop your CV file here, or</p>
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              id="cv-upload"
              disabled={uploading}
            />
            <label
              htmlFor="cv-upload"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-50"
            >
              Choose File
            </label>
            <p className="text-sm text-gray-500 mt-2">PDF files only, max 5MB</p>
            
            {uploading && (
              <div className="mt-4 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mr-2"></div>
                <span className="text-indigo-600">Uploading...</span>
              </div>
            )}
          </div>
        </div>

        {cvData ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">CV Saat Ini</h2>
              <div className="flex space-x-2">
                <a
                  href={cvData.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </a>
                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-green-600 hover:text-green-700">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-lg font-medium text-gray-900">{cvData.fileName}</p>
                  <div className="mt-2 text-sm text-gray-600 space-y-1">
                    <p>Size: {cvData.fileSize}</p>
                    <p>
                      Uploaded: {new Date(cvData.uploadDate).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Deskripsi
                  </label>
                  {!editing ? (
                    <button
                      onClick={() => setEditing(true)}
                      className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button className="inline-flex items-center text-sm text-green-600 hover:text-green-700">
                        <Save className="w-4 h-4 mr-1" />
                        Simpan
                      </button>
                      <button
                        onClick={() => {
                          setEditing(false);
                          setDescription(cvData.description || "");
                        }}
                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-700"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Batal
                      </button>
                    </div>
                  )}
                </div>
                
                {editing ? (
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                    placeholder="Masukkan deskripsi CV..."
                  />
                ) : (
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {cvData.description || "Tidak ada deskripsi"}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada CV</h3>
            <p className="text-gray-600">
              Upload CV Anda untuk memulai mengelola portofolio
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
