import { Button } from '@nextui-org/button';
import Link from 'next/link';
interface LoginProps {
  className?: string;
}
export default function Login(props: LoginProps) {
  return (
    <>
    <Link href="/form/register">
      <Button
        className={`${props.className} font-sans-thai font-semibold px-8 shadow-[rgba(29,159,238,255)_0px_0px_10px_0px] hover:scale-95  focus:outline-none`}
        color='primary'
      >
        เข้าสู่ระบบ
      </Button>
    </Link>
    </>
  );
}
