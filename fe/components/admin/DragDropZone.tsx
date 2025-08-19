"use client";
import React from 'react';

interface DragDropZoneProps {
  onFileUpload: (file: File) => Promise<void>;
  children: React.ReactNode;
  accept?: string;
  disabled?: boolean;
  className?: string;
}

export default function DragDropZone({
  onFileUpload,
  children,
  accept = "image/*",
  disabled = false,
  className = ""
}: DragDropZoneProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const validateFile = (file: File): boolean => {
    if (accept === "image/*" && !file.type.startsWith('image/')) {
      return false;
    }
    return true;
  };

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = React.useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && validateFile(files[0])) {
      try {
        await onFileUpload(files[0]);
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
  }, [disabled, onFileUpload, accept]);

  return (
    <div
      className={`relative transition-all duration-200 ${
        isDragOver ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      } ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
      {isDragOver && (
        <div className="absolute inset-0 bg-blue-50 bg-opacity-90 border-2 border-dashed border-blue-500 rounded-lg flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-blue-600 font-medium">Lepaskan file di sini</p>
            <p className="text-sm text-blue-500">untuk mengupload</p>
          </div>
        </div>
      )}
    </div>
  );
}
