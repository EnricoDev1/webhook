import React, { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

function ErrorToast({ message, duration = 5000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

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
        bg-red-600 text-white font-medium max-w-md
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <AlertCircle className="w-6 h-6 flex-shrink-0" />
      <span className="text-sm">{message || 'An error occurred'}</span>
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

export default ErrorToast;