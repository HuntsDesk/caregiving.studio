import React from 'react';

interface OverlayProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Overlay({ onClose, children }: OverlayProps) {
  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="absolute inset-0 bg-black/20 dark:bg-black/40"
        onClick={onClose}
      />
      <div 
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}