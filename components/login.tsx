"use client"
import { Button } from '@nextui-org/button';
import Link from 'next/link';
interface LoginProps {
  onOpenPopup : () => void;
}
export default function Login({onOpenPopup: openPopup}: LoginProps) {
  return (
    <>
      <Button
        className={`justify-center mt-2 font-sans-thai font-semibold px-8 shadow-[rgba(29,159,238,255)_0px_0px_10px_0px] hover:scale-95  focus:outline-none`}
        color='primary'
        onClick={() => {
          openPopup();
        }}
      >
        เข้าสู่ระบบ
      </Button>
    </>
  );
}
