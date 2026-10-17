import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="toast-container">
      <div className="toast-pill">
        <CheckCircle2 size={18} className="toast-icon" />
        <span className="toast-text">{message}</span>
        <button onClick={onClose} className="toast-close-btn">
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
