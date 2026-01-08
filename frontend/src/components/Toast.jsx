// components/Toast.jsx
import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

const toastVariants = {
  error: {
    bg: 'bg-red-600',
    icon: AlertCircle,
    defaultMessage: 'An error occurred',
  },
  success: {
    bg: 'bg-green-600',
    icon: CheckCircle,
    defaultMessage: 'Operation completed successfully',
  },
  info: {
    bg: 'bg-blue-600',
    icon: Info,
    defaultMessage: 'Information',
  },
};

function Toast({ message, type = 'error', duration = 5000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  const variant = toastVariants[type] || toastVariants.error;
  const Icon = variant.icon;

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration - 500);

    const removeTimer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onClose]);

  return (
    <div
      className={`
        fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50
        flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl
        ${variant.bg} text-white font-medium max-w-md
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <Icon className="w-6 h-6 flex-shrink-0" />
      <span className="text-sm">{message || variant.defaultMessage}</span>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-auto opacity-80 hover:opacity-100 transition"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

export default Toast;