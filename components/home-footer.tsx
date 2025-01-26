import Image from "next/image";
import logo from '@/public/logo.svg';
import ku_logo from '@/public/images/logo_ku_th.jpg';
import { Facebook, IG } from "./icons";

export default function HomeFooter() {
  return (
    <section className="flex justify-between pl-10 pr-10 pb-10 pt-[100px] bg-gradient-to-b from-white to-[#0374BA]" id="connect">
      <div>
        <div className="flex gap-10 mb-[20px]">
          <Image
            className='mt-3'
            src={logo}
            alt='cnc logo'
            width={150}
          />
          <Image 
            className="rounded-full"
            src={ku_logo}
            width={140} 
            alt="ku logo"
          />
        </div>
        <p className="text-white text-2xl font-bold">ภาควิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์ มหาวิทยาลัยเกษตรศาสตร์</p>
        <p className="text-white mt-5 font-medium">ชั้น 7-8, อาคารวิทยาศาสตร์กายภาพ 45 ปี เลขที่ 50 ถนน งามวงศ์วาน แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร 10900</p>
      </div>
      <div>
      <p className="text-white font-medium">ติดตามข่าวสารหรือติดต่อ</p>
      <div className="flex justify-center gap-8 mt-5">
        <a href="https://www.facebook.com/CNCXisAwesome">
          <Facebook width={50} height={50}/>
        </a>
        <a href="https://www.instagram.com/cnc.csku/">
          <IG width={50} height={50}/>
        </a>
      </div>
      </div>
    </section>
  );
}