"use client";
import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Loader2, Wifi, WifiOff } from 'lucide-react';

interface AutoSaveNotificationProps {
  status: 'idle' | 'saving' | 'saved' | 'error';
  className?: string;
}

export default function AutoSaveNotification({ status, className = '' }: AutoSaveNotificationProps) {
  const [showNotification, setShowNotification] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (status !== 'idle') {
      setShowNotification(true);
    }

    if (status === 'saved') {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return () => clearTimeout(timer);
    }

    if (status === 'error') {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  if (!showNotification && status === 'idle') return null;

  const getNotificationConfig = () => {
    switch (status) {
      case 'saving':
        return {
          icon: <Loader2 className="w-5 h-5 animate-spin" />,
          text: 'Menyimpan perubahan...',
          bgColor: 'bg-blue-500',
          textColor: 'text-white',
          borderColor: 'border-blue-600'
        };
      case 'saved':
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          text: 'Semua perubahan tersimpan',
          bgColor: 'bg-green-500',
          textColor: 'text-white',
          borderColor: 'border-green-600'
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          text: 'Gagal menyimpan perubahan',
          bgColor: 'bg-red-500',
          textColor: 'text-white',
          borderColor: 'border-red-600'
        };
      default:
        return {
          icon: null,
          text: '',
          bgColor: 'bg-gray-500',
          textColor: 'text-white',
          borderColor: 'border-gray-600'
        };
    }
  };

  const config = getNotificationConfig();

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${className} ${
      showNotification ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-2 opacity-0'
    }`}>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border-2 backdrop-blur-sm ${
        config.bgColor
      } ${config.textColor} ${config.borderColor}`}>
        {/* Connection Status Indicator */}
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="w-4 h-4 opacity-70" />
          ) : (
            <WifiOff className="w-4 h-4 text-orange-300" />
          )}
        </div>

        {/* Status Icon */}
        <div className="flex-shrink-0">
          {config.icon}
        </div>

        {/* Status Text */}
        <span className="text-sm font-medium">
          {!isOnline && status !== 'error' 
            ? 'Menunggu koneksi internet...' 
            : config.text
          }
        </span>

        {/* Close Button for Error State */}
        {status === 'error' && (
          <button
            onClick={() => setShowNotification(false)}
            className="ml-2 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* Progress Bar for Saving State */}
      {status === 'saving' && (
        <div className="mt-1 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
          <div className="h-full bg-white bg-opacity-70 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
}

// Toast variant for inline notifications
export function AutoSaveToast({ status, className = '' }: AutoSaveNotificationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (status !== 'idle') {
      setVisible(true);
    }

    if (status === 'saved') {
      const timer = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timer);
    }

    if (status === 'error') {
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (!visible) return null;

  const getConfig = () => {
    switch (status) {
      case 'saving':
        return {
          icon: <Loader2 className="w-4 h-4 animate-spin" />,
          text: 'Menyimpan...',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200'
        };
      case 'saved':
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          text: 'Tersimpan',
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          borderColor: 'border-green-200'
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          text: 'Gagal menyimpan',
          bgColor: 'bg-red-100',
          textColor: 'text-red-700',
          borderColor: 'border-red-200'
        };
      default:
        return null;
    }
  };

  const config = getConfig();
  if (!config) return null;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
      config.bgColor
    } ${config.textColor} ${config.borderColor} ${className}`}>
      {config.icon}
      <span className="text-sm font-medium">{config.text}</span>
    </div>
  );
}
