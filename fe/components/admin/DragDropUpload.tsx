"use client";
import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { Upload, X, Image as ImageIcon, File } from 'lucide-react';
import Swal from 'sweetalert2';

interface DragDropUploadProps {
  onFileUpload: (file: File) => Promise<void>;
  currentImage?: string;
  onImageRemove?: () => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  placeholder?: string;
  showPreview?: boolean;
  disabled?: boolean;
}

export default function DragDropUpload({
  onFileUpload,
  currentImage,
  onImageRemove,
  accept = "image/*",
  maxSize = 5,
  className = "",
  placeholder = "Seret & lepas file di sini atau klik untuk memilih",
  showPreview = true,
  disabled = false
}: DragDropUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = useCallback((file: File): boolean => {
    // Check file type
    if (accept === "image/*" && !file.type.startsWith('image/')) {
      Swal.fire({
        title: 'File tidak valid!',
        text: 'Silakan pilih file gambar (JPG, PNG, GIF, etc.)',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
      return false;
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      Swal.fire({
        title: 'File terlalu besar!',
        text: `Ukuran file maksimal ${maxSize}MB. File Anda ${fileSizeMB.toFixed(1)}MB`,
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
      return false;
    }

    return true;
  }, [accept, maxSize]);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!validateFile(file)) return;

    setIsUploading(true);
    try {
      await onFileUpload(file);
    } catch (error) {
      console.error('Upload error:', error);
      Swal.fire({
        title: 'Upload Gagal!',
        text: 'Terjadi kesalahan saat mengupload file. Silakan coba lagi.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setIsUploading(false);
    }
  }, [onFileUpload, validateFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isUploading) {
      setIsDragOver(true);
    }
  }, [disabled, isUploading]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (disabled || isUploading) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await handleFileUpload(files[0]);
    }
  }, [disabled, isUploading, handleFileUpload]);

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
    // Reset input
    e.target.value = '';
  };

  const getFileIcon = () => {
    if (accept === "image/*") {
      return <ImageIcon className="w-8 h-8" />;
    }
    return <File className="w-8 h-8" />;
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
          disabled 
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
            : isDragOver
              ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg'
              : currentImage
                ? 'border-green-300 bg-green-50'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50 cursor-pointer'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Current Image Preview */}
        {currentImage && showPreview ? (
          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              <Image
                src={currentImage}
                alt="Preview"
                width={80}
                height={80}
                className="w-20 h-20 object-contain border rounded-lg bg-white p-2 shadow-sm"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Upload overlay for replacing image */}
              {!disabled && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <Upload className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
            <div className="text-left flex-1">
              <p className="text-sm text-green-600 font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                File berhasil diupload
              </p>
              <p className="text-xs text-gray-500 truncate max-w-48 mt-1">
                {currentImage.split('/').pop()}
              </p>
              <button
                onClick={() => {
                  const input = document.getElementById('file-input') as HTMLInputElement;
                  input?.click();
                }}
                className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                disabled={disabled}
              >
                Ganti file
              </button>
            </div>
            {onImageRemove && (
              <button
                onClick={onImageRemove}
                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                title="Hapus file"
                disabled={disabled}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ) : (
          /* Upload Area */
          <div className={`transition-all duration-200 ${isDragOver ? 'scale-105' : ''}`}>
            {/* Upload Icon */}
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed flex items-center justify-center ${
              disabled
                ? 'border-gray-300 bg-gray-100'
                : isDragOver 
                  ? 'border-blue-500 bg-blue-100' 
                  : 'border-gray-300 bg-gray-50'
            }`}>
              {isUploading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              ) : (
                <div className={`${
                  disabled 
                    ? 'text-gray-400' 
                    : isDragOver 
                      ? 'text-blue-500' 
                      : 'text-gray-400'
                }`}>
                  {getFileIcon()}
                </div>
              )}
            </div>

            {/* Upload Text */}
            {isDragOver && !disabled ? (
              <div>
                <p className="text-blue-600 font-medium">Lepaskan file di sini</p>
                <p className="text-sm text-blue-500">File akan diupload secara otomatis</p>
              </div>
            ) : isUploading ? (
              <div>
                <p className="text-gray-600 font-medium">Mengupload file...</p>
                <div className="w-48 mx-auto mt-2 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full animate-pulse"></div>
                </div>
              </div>
            ) : (
              <div>
                <p className={`font-medium mb-1 ${disabled ? 'text-gray-400' : 'text-gray-600'}`}>
                  {placeholder}
                </p>
                {!disabled && (
                  <>
                    <p className="text-sm text-gray-500 mb-3">atau</p>
                    <input
                      type="file"
                      accept={accept}
                      onChange={handleFileInputChange}
                      className="hidden"
                      id="file-input"
                      disabled={disabled || isUploading}
                    />
                    <label
                      htmlFor="file-input"
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all cursor-pointer font-medium ${
                        disabled || isUploading
                          ? 'bg-gray-400 cursor-not-allowed text-white'
                          : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 text-white'
                      }`}
                    >
                      <Upload className="w-4 h-4" />
                      Pilih File
                    </label>
                  </>
                )}
              </div>
            )}

            {/* File info */}
            <p className="text-xs text-gray-400 mt-3">
              {accept === "image/*" 
                ? `Format: JPG, PNG, GIF • Maksimal ${maxSize}MB`
                : `Maksimal ${maxSize}MB`
              }
            </p>
          </div>
        )}
      </div>

      {/* Upload Progress Bar */}
      {isUploading && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-xl overflow-hidden">
          <div className="h-full bg-blue-500 animate-pulse"></div>
        </div>
      )}
    </div>
  );
}
