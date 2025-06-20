import React, { useState, useCallback, useRef } from 'react';
// import QRCode from 'qrcode.react';
import { useToast } from '@/components/ui/use-toast';
// import { saveAs } from 'file-saver';

// Constants
const DEFAULT_QR_URL = import.meta.env.VITE_QR_CODE_URL || 'https://chaingrid.xyz';

const DowanloadQRCode = () => {
  const { toast } = useToast();
  const qrRef = useRef(null);
  const [qrUrl, setQrUrl] = useState(DEFAULT_QR_URL);

  // Handle QR code download
  const handleDownload = useCallback(() => {
    if (!qrRef.current) {
      toast({
        title: 'Error',
        description: 'Unable to download QR code. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    // Convert canvas to blob and trigger download
    qrRef.current.toBlob((blob) => {
      saveAs(blob, 'chaingrid-qr-code.png');
      toast({
        title: 'Success',
        description: 'QR code downloaded successfully!',
      });
    });
  }, [toast]);

  // Handle URL input change
  const handleUrlChange = useCallback((e) => {
    const value = e.target.value;
    setQrUrl(value);
    // Basic URL validation
    try {
      new URL(value);
    } catch {
      toast({
        title: 'Warning',
        description: 'Invalid URL format. QR code may not work as expected.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  return (
    <section className="relative min-h-screen pt-16 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-slate-900 to-blue-900/20 text-slate-100 font-inter flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(59,130,246,0.1),_transparent_50%)]"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Floating elements */}
      <div className="absolute top-1/3 right-10 md:right-20 hidden md:block">
        <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-lg animate-float"></div>
      </div>
      <div className="absolute bottom-1/4 left-10 md:left-20 hidden md:block">
        <div className="w-10 h-10 bg-purple-500/20 backdrop-blur-sm rounded-lg animate-float delay-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md relative z-10">
        <div className="bg-slate-800/80 backdrop-blur-md border border-blue-500/20 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-blue-500/30">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Scan to Connect
            </h1>
            <p className="mt-2 text-slate-400 text-sm">
              Scan the QR code or customize the link below
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-lg shadow-md">
                <div className="flex justify-content-center text-center">

            <img alt="A QR code" class="w-80 h-80 mb-6" height="200" loading="lazy" src="https://storage.googleapis.com/a1aa/image/8b482c8f-ad0e-442f-f232-8ce3fd4bb07c.jpg" width="200"/>
                </div>
                <p class="text-center text-gray-100 mb-4 px-4">
                    Use your mobile device to scan this QR code and quickly access the link.
                </p>
            </div>
          </div>

        

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-semibold text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-200 flex items-center justify-center"
            aria-label="Download QR code"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download QR Code
          </button>
        </div>
      </div>

      <style jsx>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </section>
  );
};

export default DowanloadQRCode;