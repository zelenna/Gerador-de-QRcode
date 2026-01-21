
import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QRStyle } from '../types';

interface QRCanvasProps {
  value: string;
  style: QRStyle;
  size?: number;
}

export const QRCanvas: React.FC<QRCanvasProps> = ({ value, style, size = 256 }) => {
  return (
    <div className="bg-white p-4 shadow-sm border border-gray-100 rounded-2xl inline-block" id="qr-export-container">
      <QRCodeCanvas
        value={value}
        size={size}
        level={style.level}
        bgColor={style.bgColor}
        fgColor={style.fgColor}
        imageSettings={
          style.includeLogo && style.logoUrl
            ? {
                src: style.logoUrl,
                height: size * (style.logoSize / 100),
                width: size * (style.logoSize / 100),
                excavate: true, // This clears the modules behind the logo
              }
            : undefined
        }
      />
    </div>
  );
};
