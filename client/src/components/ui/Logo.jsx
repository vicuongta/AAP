import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Logo({ className = "", showText = true, size = "default" }) {
  const sizeClasses = {
    small: "w-8 h-8",
    default: "w-10 h-10",
    large: "w-14 h-14"
  };

  return (
    <Link to={createPageUrl('landing')} className={`flex items-center gap-2.5 ${className}`}>
      <img 
        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692bb19476dfbc846144cdbf/94f8a33d9_2.png"
        alt="QBtron Logo"
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <span className="text-xl font-semibold tracking-wide">
          <span className="text-[#2d6a4f]">QB</span>
          <span className="text-gray-700">tron</span>
        </span>
      )}
    </Link>
  );
}