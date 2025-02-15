import React from 'react';
import { X } from 'lucide-react';

import { fontSansThai } from '@/config/fonts';

interface DeleteQuestionPopupProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteQuestionPopup: React.FC<DeleteQuestionPopupProps> = ({
  onClose,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div
      className={`w-[500px] bg-white rounded-xl shadow-lg ${fontSansThai.variable}`}
    >
      <div className='relative flex flex-col p-6'>
        <button
          aria-label='ปิด'
          className='absolute right-4 top-4'
          onClick={onClose}
        >
          <X className='h-10 w-10 text-gray-600' />
        </button>

        <h2 className='text-4xl font-bold text-center mb-6 text-gray-700'>
          ลบคำถาม
        </h2>

        <div className='text-center mb-8'>
          <p className='text-gray-600 text-lg'>
            คำเตือน: หากลบคำถามแล้วจะไม่สามารถกู้คืนได้
          </p>
        </div>

        <div className='flex justify-center space-x-3'>
          <button
            className='px-8 py-2 text-white bg-[#F5365C] rounded-2xl hover:bg-[#AA0829] transition-colors'
            onClick={handleConfirm}
          >
            ยืนยัน
          </button>
          <button
            className='px-8 py-2 text-white bg-[#42B5FC] rounded-2xl hover:bg-[#0374BA]] transition-colors'
            onClick={onClose}
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteQuestionPopup;
