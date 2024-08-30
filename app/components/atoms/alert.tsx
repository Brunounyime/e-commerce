import React from 'react';

interface AlertProps {
  message: string;
  type?: 'success' | 'error';
}

const Alert: React.FC<AlertProps> = ({ message, type = 'success' }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  return (
    <div className={`${bgColor} text-white p-4 rounded-md mb-4`}>
      {message}
    </div>
  );
};

export default Alert;
