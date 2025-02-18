import React from 'react';

interface TextFieldProps {
  header: string;
  value: string;
}

export default function TextField({ header, value }: TextFieldProps) {
  return (
    <div className='w-full'>
      <div className='hidden md:flex flex-row gap-x-2 items-center bg-gray-200 px-3 py-3 rounded-md'>
        <h2 className='text-[#3B434F] font-bold'>{header}</h2>
        <p className='text-[#3B434F] font-light'>{value}</p>
      </div>
      <div className='flex flex-col gap-y-2 md:hidden'>
        <h2 className='font-bold text-sm'>{header}</h2>
        <div className='px-3 py-2 border border-black rounded-lg'>
          <p className='font-light text-sm'>{value}</p>
        </div>
      </div>
    </div>
  );
}
