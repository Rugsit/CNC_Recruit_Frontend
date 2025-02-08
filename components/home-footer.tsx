import Image from "next/image";
import logo from '@/public/cnc_logo_white.png';
import ku_logo from '@/public/images/logo_ku_th.jpg';
import { Facebook, IG } from "./icons";

export default function HomeFooter() {
  return (
    <section className="grid grid-cols-1 lg:flex justify-between pl-[20px] pr-[20px] pb-10 pt-[100px] bg-gradient-to-b from-white to-[#0374BA]" id="connect">
      <div className="w-full">
        <div className="flex justify-center items-center gap-3 lg-gap-10 mb-[20px] lg:justify-start">
          <Image
            className='mt-3'
            src={logo}
            alt='cnc logo'
            width={150}
          />
          <Image 
            className="rounded-full w-[90px] h-[90px] lg:w-[130px] lg:h-[130px]"
            src={ku_logo}
            alt="ku logo"
          />
        </div>
        <p className="text-white w-full text-lg font-bold text-center lg:text-start lg:text-2xl">ภาควิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์ มหาวิทยาลัยเกษตรศาสตร์</p>
        <p className="text-white w-full mt-5 font-medium text-center lg:text-start text">ชั้น 7-8, อาคารวิทยาศาสตร์กายภาพ 45 ปี เลขที่ 50 ถนน งามวงศ์วาน แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร 10900</p>
      </div>
      <div className="w-full lg:max-w-[300px]">
      <p className="text-white font-medium text-center mt-10 lg:mt-0">ติดตามข่าวสารหรือติดต่อ</p>
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