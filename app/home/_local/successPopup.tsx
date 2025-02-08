import React from 'react';
import { X } from 'lucide-react';
import { fontSansThai } from '@/config/fonts';

interface SuccessPopupProps {
  onClose: () => void;
  step: 'submit' | 'login' | 'interview';
}

const popupContent = {
  submit: {
    title: 'ยื่นใบสมัครสำเร็จ',
    description: 'โปรดเลือกนัดหมายวันที่สำหรับสัมภาษณ์'
  },
  login: {
    title: 'เข้าสู่ระบบสำเร็จ',
    description: 'ยินดีต้อนรับเข้าสู่ระบบ'
  },
  interview: {
    title: 'ลงเวลาสัมภาษณ์สำเร็จ',
    description: 'ปิดหน้าต่างนี้เพื่อตรวจสอบเวลาสัมภาษณ์ของคุณ'
  }
};

const SuccessPopup: React.FC<SuccessPopupProps> = ({ onClose, step }) => {
  const content = popupContent[step];

  return (
    <div
      className={`w-[350px] h-[250px] bg-white rounded-xl shadow-lg 
        ${fontSansThai.variable} animate-in fade-in zoom-in duration-300`}
    >
      <div className='relative h-full flex flex-col items-center justify-center p-4'>
        <button
          className='absolute right-4 top-4'
          onClick={onClose}
          aria-label='ปิด'
        >
          <X className='h-8 w-8 text-gray-600' />
        </button>

        <div className='space-y-4'>
          <h2 className='text-2xl font-bold text-gray-700 font-sans-thai text-center mt-2'>
            {content.title}
          </h2>

          <div className='flex justify-center'>
            <div className='w-24 h-24 rounded-full bg-[#EDFBF0] flex items-center justify-center'>
              <svg
                className='w-20 h-20 text-[#75D679]'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <polyline points='20 6 9 17 4 12' />
              </svg>
            </div>
          </div>

          <p className='text-sm text-gray-600 font-sans-thai text-center font-normal'>
            {content.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;