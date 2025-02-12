"use client"
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import Link from 'next/link';
interface LoginProps {
  onOpenPopup: () => void;
}
export default function Login({ onOpenPopup: openPopup }: LoginProps) {
  return (
    <>
      <Button
        className={`justify-center font-sans-thai font-semibold p-6 shadow-[rgba(29,159,238,255)_0px_0px_10px_0px] hover:scale-95  focus:outline-none`}
        color='primary'
        onClick={() => {
          openPopup();
        }}
      >
        <Image
          src='/google-icon.png'
          alt='Google'
          width={20}
          height={20}
          className='brightness-0 invert'
        />
        สมัครเข้าร่วม Lab
      </Button>
    </>
  );
}
