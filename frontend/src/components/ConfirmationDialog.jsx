import React from 'react';

const ConfirmationDialog = ({ open, onClose, onConfirm, title, message }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-30">
      <div className="w-full max-w-sm p-6 bg-gray-900/80 backdrop-blur-xl rounded-xl border border-white/10 text-center">
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
           <button onClick={onClose} className="px-6 py-2 font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition">Cancel</button>
           <button onClick={onConfirm} className="px-6 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;