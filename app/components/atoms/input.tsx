
import React from 'react';

interface InputProps {
  id?: string;  
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;  
}

const Input: React.FC<InputProps> = ({ id, type, placeholder, value, onChange, className, required = false }) => {
  return (
    <input
      id={id} 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}  
      className={`px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};

export default Input;
