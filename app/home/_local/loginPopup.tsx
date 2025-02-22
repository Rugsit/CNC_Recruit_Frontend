'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';

interface LoginPopupProps {
  onClose: () => void;
  onLoginSuccess: () => void;
  isOpen: boolean;
}

const LoginPopup: React.FC<LoginPopupProps> = ({
  onClose,
  onLoginSuccess,
  isOpen,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(false);
    try {
      await signIn('google');
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={clsx(
        `transition-all max-w-[500px] m-[20px] max-h-[500px] bg-white p-5 rounded-xl shadow-lg`,
        {
          ' scale-90 opacity-0': isOpen,
          ' scale-100 opacity-100': !isOpen,
        }
      )}
    >
      <button
        aria-label='ปิด'
        className='absolute right-4 top-4'
        onClick={() => {
          onClose();
        }}
      >
        <X className='h-8 w-8 text-gray-600' />
      </button>
      <div className='relative'>
        <h2 className='text-3xl lg:text-4xl font-bold text-center text-gray-700 font-kanit mt-4 mb-8'>
          เข้าสู่ระบบ
        </h2>

        <div className='px-4 space-y-4'>
          <Button
            className='w-full h-[60] py-6 bg-[#29B6F6] text-white rounded-xl hover:bg-[#0288D1] transition-colors'
            onClick={handleGoogleLogin}
            isDisabled={loading}
          >
            <div className='flex items-center justify-center gap-3'>
              <Image
                alt='Google'
                className='brightness-0 invert'
                height={30}
                src='/google-icon.png'
                width={30}
              />
              <span className='text-[16px] lg:text-xl '>
                {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบด้วย Google'}
              </span>
            </div>
          </Button>

          <p
            className={clsx(
              'text-red-400 text-center text-sm mt-4 font-normal',
              {
                hidden: error,
              }
            )}
          >
            เกิดข้อผิดพลาดไม่สามารถเข้าสู่ระบบได้
          </p>
          <p className='text-gray-400 text-center text-sm mt-4 font-normal'>
            ใช้เมลของมหาวิทยาลัยเท่านั้น ตัวอย่าง example@ku.th
          </p>

          <p className='text-gray-600 text-center text-sm lg:text-lg mt-2 mb-6 px-8 font-normal'>
            เว็บไซต์นี้ใช้บัญชี Google
            สำหรับการสมัครเข้าร่วมและรายงานผลการคัดเลือกของ Lab
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
