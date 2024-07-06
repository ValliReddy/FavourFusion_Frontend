import React from 'react';

const CustomConfirmationDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onCancel();
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      zIndex: '1000'
    }}>
      <p>{message}</p>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <button className="button big" style={{
          marginRight: '10px',
          padding: '8px 16px',
        //   backgroundColor: '#f44336',
        //   color: '#fff',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '4px'
        }} onClick={handleConfirm}>Yes, delete</button>
        <button className="button big" style={{
          padding: '8px 16px',
        //   backgroundColor: '#ccc',
        //   color: '#333',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '4px'
        }} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default CustomConfirmationDialog;
