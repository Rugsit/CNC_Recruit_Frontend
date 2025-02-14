'use client';
import { Button } from '@nextui-org/button';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
interface LoginProps {
  onOpenPopup: () => void;
}
export default function Login({ onOpenPopup: openPopup }: LoginProps) {
  const { data, status } = useSession();
  const [isLogin, setIsLogin] = useState(false);

  const fetchRole = async () => {
    try {
      const resp = await axios.get('http://localhost:8000/user', {
        headers: {
          Authorization: `Bearer ${data?.backendToken}`,
        },
      });
      setIsLogin(true);
    } catch (e) {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    if (status != 'loading') {
      fetchRole();
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
          src='/google-icon.png'
          alt='Google'
          width={20}
          height={20}
          className='brightness-0 invert'
        />
        {isLogin ? 'เข้าสู่ระบบเรียบร้อย' : 'เข้าสู่ระบบ'}
      </Button>
    </>
  );
}
