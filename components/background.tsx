"use client";

import { ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export default function PageWrapper({ children }: { children: ReactNode }) {
  const { isDarkMode } = useTheme();

  return (
    <>
      {/* Background layer */}
      <div
        className="fixed inset-0 -z-10 transition-all duration-500"
        style={{
          backgroundColor: isDarkMode ? '#000' : 'transparent',
          backgroundImage: isDarkMode ? 'none' : "url('/images/background.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'brightness(0.75)',
        }}
      />
      {/* Content */}
      {children}
    </>
  );
}
