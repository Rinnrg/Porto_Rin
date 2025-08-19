"use client";
import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  type: 'about' | 'education' | 'organization' | 'workExperience' | 'custom';
  items: any[];
}

interface AddSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (section: Section) => void;
}

const AddSectionModal: React.FC<AddSectionModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Simpan posisi scroll saat ini
      const scrollY = window.scrollY;
      
      // Mencegah scroll pada body dengan style yang kuat
      const originalStyles = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        right: document.body.style.right,
        overflow: document.body.style.overflow,
        width: document.body.style.width,
        height: document.body.style.height
      };
      
      // Apply prevent scroll styles
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
      document.body.style.height = '100vh';
      
      setIsAnimating(true);
      
      // Cleanup function
      return () => {
        // Kembalikan style original
        Object.assign(document.body.style, originalStyles);
        
        // Kembalikan posisi scroll
        window.scrollTo(0, scrollY);
      };
    } else {
      // Delay to allow exit animation
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Judul section harus diisi!');
      return;
    }

    const newSection: Section = {
      id: `section-${Date.now()}`,
      title: title.trim(),
      type: 'custom',
      items: []
    };

    onSave(newSection);
    
    // Reset form
    setTitle('');
    onClose();
  };

  const handleCancel = () => {
    setTitle('');
    onClose();
  };

  // Prevent scroll on backdrop while allowing modal content to scroll
  const handleBackdropScroll = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  const handleBackdropTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Mencegah scroll dengan keyboard
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Space'].includes(e.key)) {
      if (e.target === e.currentTarget) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <div 
        className={`fixed inset-0 z-[9999] transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => e.target === e.currentTarget && onClose()}
        onWheel={handleBackdropScroll}
        onTouchMove={handleBackdropTouchMove}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        style={{
          touchAction: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          KhtmlUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none'
        }}
      >
        {/* Blurred background - Full coverage with transition */}
        <div 
          className={`absolute inset-0 transition-all duration-300 ${
            isOpen ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0'
          }`}
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            touchAction: 'none'
          }}
        ></div>
        
        {/* Modal container - Centered with smooth animation */}
        <div 
          className="relative z-10 flex items-center justify-center w-full h-full p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          onWheel={handleBackdropScroll}
          onTouchMove={handleBackdropTouchMove}
          style={{
            touchAction: 'none'
          }}
        >
          <div 
            className={`bg-white rounded-2xl shadow-xl w-full max-w-lg transform transition-all duration-300 ${
              isOpen 
                ? 'scale-100 opacity-100 translate-y-0' 
                : 'scale-95 opacity-0 translate-y-4'
            }`}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{
              touchAction: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-200 rounded-t-3xl bg-gradient-to-r from-blue-500 to-blue-600">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Tambah Section Baru</h3>
                    <p className="text-white/80 text-sm mt-1">Buat section custom dengan judul bebas sesuai kebutuhan</p>
                  </div>
                </div>
                <button
                  onClick={handleCancel}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200"
                  aria-label="Tutup modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 py-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section Title */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Judul Section *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 transition-all duration-300 text-lg"
                    placeholder="Contoh: Pengalaman Magang, Proyek, Sertifikasi, Hobi, dll"
                    autoFocus
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Masukkan judul yang menggambarkan konten section Anda
                  </p>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-8 py-3 border-2 border-gray-300 rounded-2xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium text-lg"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transition-all duration-300 flex items-center gap-3 font-medium text-lg transform hover:scale-105 active:scale-95"
                  >
                    <Plus className="w-5 h-5" />
                    Tambah Section
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Simple CSS for smooth animations */}
      <style jsx>{`
        .backdrop-blur-full {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        
        .backdrop-blur-none {
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
        }
      `}</style>
    </>
  );
};

export default AddSectionModal;
