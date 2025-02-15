import React from 'react';

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
  minHeight,
}: FormInputProps) => (
  <div className='space-y-2'>
    <label className='text-sm font-medium text-gray-700'>{label}</label>
    <textarea
      className={`w-full px-3 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium ${
        minHeight ? `min-h-[${minHeight}]` : ''
      }`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export const Select = ({
  label,
  value,
  onChange,
  options,
}: FormInputProps & { options: readonly string[] }) => (
  <div className='flex items-center gap-2'>
    <label className='text-sm font-medium text-gray-700'>{label}:</label>
    <select
      className='px-3 py-1 border border-[#42B5FC] rounded-lg text-[#42B5FC]'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  </div>
);
