"use client";
import React, { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  fileName: string;
  cvId?: number;
}

export default function PDFViewer({ isOpen, onClose, fileUrl, fileName, cvId }: PDFViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && cvId) {
      fetchPDFData();
    }
  }, [isOpen, cvId]);

  const fetchPDFData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/cv/view/${cvId}`);
      const data = await response.json();
      
      if (data.success) {
        const dataUrl = `data:application/pdf;base64,${data.data.content}`;
        setPdfDataUrl(dataUrl);
      } else {
        setError(data.message || 'Gagal memuat PDF');
      }
    } catch (err) {
      console.error('Error fetching PDF:', err);
      setError('Terjadi kesalahan saat memuat PDF');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleDownload = () => {
    if (pdfDataUrl) {
      const link = document.createElement('a');
      link.href = pdfDataUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-90"
        onClick={onClose}
      />
      
      {/* Full Screen PDF Viewer */}
      <div className="relative w-full h-full flex flex-col">
        {/* Simple Header */}
        <div className="bg-black bg-opacity-50 px-6 py-3 flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-medium">{fileName}</h2>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Download */}
            <button
              onClick={handleDownload}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title="Download PDF"
            >
              <Download className="w-5 h-5" />
            </button>
            
            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Full Screen PDF Content */}
        <div className="flex-1 flex items-center justify-center">
          {loading ? (
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading PDF...</p>
            </div>
          ) : error ? (
            <div className="text-center bg-red-600 bg-opacity-90 rounded-lg p-8 text-white">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Error Loading PDF</h3>
              <p className="mb-4">{error}</p>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Download File Instead
              </button>
            </div>
          ) : pdfDataUrl ? (
            <div className="w-full h-full">
              <iframe
                src={pdfDataUrl}
                className="w-full h-full border-0"
                title={fileName}
                style={{ 
                  background: 'white'
                }}
              />
            </div>
          ) : (
            <div className="text-center bg-gray-600 bg-opacity-90 rounded-lg p-8 text-white">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No PDF Data</h3>
              <p className="mb-4">Unable to load PDF content</p>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Download File
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
