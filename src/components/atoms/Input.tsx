import React from 'react';

export interface InputProps {
  type?: 'text' | 'email' | 'password';
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  id?: string;
  name?: string;
  defaultValue?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  className = '',
  id,
  name,
  defaultValue,
}) => {
  const baseStyles = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed';
  const errorStyles = error 
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';

  // 制御されたコンポーネントとして使用する場合
  if (value !== undefined && onChange) {
    return (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseStyles} ${errorStyles} ${className}`}
        id={id}
        name={name}
      />
    );
  }

  // 非制御コンポーネントとして使用する場合
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={disabled}
      className={`${baseStyles} ${errorStyles} ${className}`}
      id={id}
      name={name}
    />
  );
};
