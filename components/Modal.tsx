import React, { useEffect, useRef, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  closeButtonAriaLabel: string;
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  closeButtonAriaLabel 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      document.addEventListener('keydown', handleEscKey);
      modalRef.current?.focus(); // Focus the modal itself
    } else {
      previouslyFocusedElement.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 m-4 relative animate-modalShow flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1} // Make the div programmatically focusable
      >
        <div className="flex justify-between items-center pb-4 border-b border-slate-200">
          <h2 id="modal-title" className="text-xl font-semibold text-slate-800">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors"
            aria-label={closeButtonAriaLabel}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="pt-5 text-sm text-slate-700">
          {children}
        </div>
      </div>
    </div>
  );
};

// Add modal animation styles dynamically
const modalAnimationStyleId = 'modal-animations-style';
if (typeof document !== 'undefined' && !document.getElementById(modalAnimationStyleId)) {
  const style = document.createElement('style');
  style.id = modalAnimationStyleId;
  style.innerHTML = `
    @keyframes modalShow {
      from { opacity: 0; transform: translateY(-20px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-modalShow {
      animation: modalShow 0.25s ease-out forwards;
    }
  `; // Removed erroneous backslash before this closing backtick
  document.head.appendChild(style);
}