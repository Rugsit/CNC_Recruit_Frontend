'use client'
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@nextui-org/button';
import { fontSansThai, fontKanit } from '@/config/fonts';
import Image from 'next/image';
import clsx from 'clsx';
import axios from 'axios';
import { signIn } from 'next-auth/react';

interface LoginPopupProps {
  onClose: () => void;
  onLoginSuccess: () => void;
  isOpen: boolean;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose, onLoginSuccess, isOpen }) => {
  const handleGoogleLogin = async() => {
    await signIn('google');
  };

  return (
    <div
      className={clsx(`transition-all max-w-[500px] m-[20px] h-[320px] bg-white p-5 rounded-xl shadow-lg`, {
        " scale-90 opacity-0" : isOpen,
        " scale-100 opacity-100" : !isOpen
      })}
    >
        <button
          className='absolute right-4 top-4'
          onClick={() => {
            onClose();
          }}
          aria-label='ปิด'
        >
          <X className='h-8 w-8 text-gray-600' />
        </button>
      <div className='relative'>
        <h2 className='text-3xl lg:text-4xl font-bold text-center text-gray-700 font-kanit mt-4 mb-8'>
          เข้าสู่ระบบ
        </h2>

        <div className='px-4 space-y-4'>
          <Button
            onClick={handleGoogleLogin}
            className='w-full h-[60] py-6 bg-[#29B6F6] text-white rounded-xl hover:bg-[#0288D1] transition-colors'
          >
            <div className='flex items-center justify-center gap-3'>
              <Image
                src='/google-icon.png'
                alt='Google'
                width={30}
                height={30}
                className='brightness-0 invert'
              />
              <span className='text-[16px] lg:text-xl '>เข้าสู่ระบบด้วย Google</span>
            </div>
          </Button>

          <p className='text-gray-400 text-center text-xs mt-4 font-normal'>
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
