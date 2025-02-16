'use client';
import { Button } from '@nextui-org/button';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
interface LoginProps {
  onOpenPopup: () => void;
}
export default function Login({ onOpenPopup: openPopup }: LoginProps) {
  const { data, status } = useSession();
  const [isLogin, setIsLogin] = useState(false);

  const checkToken = async () => {
    const base64Url = data?.backendToken?.split('.')[1];
    const base64 = base64Url?.replace('-', '+').replace('_', '/');
    if (base64) {
      const time = Date.now() / 1000;
      const exp = JSON.parse(window.atob(base64))['exp'];
      if (time > exp) {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    }
  };

  useEffect(() => {
    if (status != 'loading') {
      checkToken();
    }
  }, [status]);

  return (
    <>
      <Button
        className={`justify-center font-sans-thai font-semibold p-6 shadow-[rgba(29,159,238,255)_0px_0px_10px_0px] hover:scale-95  focus:outline-none `}
        color='primary'
        isDisabled={isLogin}
        onClick={() => {
          if (!isLogin) {
            openPopup();
          }
        }}
      >
        <Image
          alt='Google'
          className='brightness-0 invert'
          height={20}
          src='/google-icon.png'
          width={20}
        />
        {isLogin ? 'เข้าสู่ระบบเรียบร้อย' : 'เข้าสู่ระบบ'}
      </Button>
    </>
  );
}
