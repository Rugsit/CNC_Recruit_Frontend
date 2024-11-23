import { Button } from '@nextui-org/button';
interface LoginProps {
  className?: string;
}
export default function Login(props: LoginProps) {
  return (
    <>
      <Button
        className={`${props.className} font-sans-thai font-semibold px-8 hover:bg-white hover:text-primary`}
        color='primary'
      >
        เข้าสู่ระบบ
      </Button>
    </>
  );
}
