import React, { useState } from 'react';
import { Copy } from 'lucide-react';

export default function SplashCopyButton({text, darkMode}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        // Simulate copying to clipboard
        navigator.clipboard.writeText(JSON.stringify({ example: 'data' }));
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative inline-flex">
            <button
                onClick={handleCopy}
                className={`relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 active:scale-95
              ${copied
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40'
                        : darkMode
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
            >
                {/* Splash effect */}
                <span
                    className={`absolute inset-0 bg-emerald-400 rounded-lg transition-all duration-500 ease-out ${copied
                            ? 'scale-100 opacity-100'
                            : 'scale-0 opacity-0'
                        }`}
                    style={{
                        transformOrigin: 'center',
                    }}
                />

                {/* Icon with splash animation */}
                <span className="relative z-10">
                    <Copy
                        className={`h-4 w-4 transition-all duration-500 ${copied ? 'scale-125 rotate-12' : 'scale-100 rotate-0'
                            }`}
                    />
                </span>

                {/* Text with splash animation */}
                <span className="relative z-10">
                    <span
                        className={`inline-block transition-all duration-500 ${copied
                                ? 'opacity-0 scale-50'
                                : 'opacity-100 scale-100'
                            }`}
                    >
                        {text}
                    </span>
                    <span
                        className={`absolute inset-0 inline-block transition-all duration-500 ${copied
                                ? 'opacity-100 scale-100'
                                : 'opacity-0 scale-150'
                            }`}
                    >
                        Copied ✓
                    </span>
                </span>
            </button>
        </div>
    );
}