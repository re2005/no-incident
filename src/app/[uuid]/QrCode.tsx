"use client";

import React, { useState } from 'react';
import CloseIcon from '@/assets/close.svg';
import ShareIcon from '@/assets/share.svg';

export default function QrCode({uuid}: { uuid: string }) {
  const [isQrCodeVisible, setIsQrCodeVisible] = useState(false);
  const qrCodeElement = typeof window !== 'undefined' ? document.getElementById('qr-code') as HTMLDivElement : null;

  function closeQrCode() {
    if (qrCodeElement) {
      qrCodeElement.innerHTML = '';
    }
    setIsQrCodeVisible(false);
  }

  function shareQrCode() {
    const options = {
      width: 200,
      height: 200,
      type: 'svg',
      data: `${location.href}/${uuid}`,
      dotsOptions: {
        type: 'rounded',
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 2,
        imageSize: 0.3,
      },
    };
    import('qr-code-styling').then(({ default: QRCodeStyling }) => {
      const qrCode = new QRCodeStyling(options as any);
      if (qrCodeElement) {
        qrCodeElement.innerHTML = '';
        qrCode.append(qrCodeElement);
        setIsQrCodeVisible(true);
      }
    });
  }

  return (
    <div className="flex flex-col gap-2" id="qr-share">
         <div className="flex flex-col gap-2 items-center" id="qr-share">
           <button
             onClick={() => shareQrCode()}
           >
             <ShareIcon className="w-5 h-5 text-secondary" />
           </button>
           <div id="qr-code" />
           {isQrCodeVisible && (
             <button onClick={() => closeQrCode()} className="flex items-center text-sm gap-2">
               <CloseIcon className="h-5 w-5 text-gray-500" /> CLOSE
             </button>
           )}
         </div>
    </div>
  );
};
