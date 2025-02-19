'use client';
import Image from 'next/image';

import logo from '@/public/cnc_logo_white.png';

export default function HomeDetails() {
  return (
    <article
      className='grid grid-rows-[auto_auto] grid-cols-[minmax(auto,800px)] xl:grid-cols-[minmax(auto,_800px)_minmax(auto,_500px)] gap-10 w-full  mx-auto max-w-fit pt-[200px] px-[20px]'
      id='about-lab'
    >
      <div className='flex justify-center items-center'>
        <Image
          alt='cnc logo'
          className='mt-3 w-[90%] h-[90%] object-contain'
          src={logo}
        />
      </div>
      <div className='flex flex-col w-full'>
        <header className='text-[60px]  text-white font-bold  text-center xl:text-start xl:text-[80px]'>
          LAB CNC
        </header>
        <section className='mt-3 xl:text-[20px]/9 text-[16px]/9 text-white bg-gradient-to-b from-primary to-[#0374BA]  p-8 rounded-xl grow font-normal border-white shadow-lg border-[3px]'>
          <p className='font-bold '>
            ห้องปฏิบัติการและวิจัย CNC สังกัดภาควิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์ มหาวิทยาลัยเกษตรศาสตร์ บางเขน
            <br />
          </p>
          พวกเรามีวัตถุประสงค์ให้สมาชิกห้องปฏิบัติการและวิจัยได้สัมผัสกับการเรียนรู้นอกห้องเรียน ได้ลงมือปฏิบัติจริง เพื่อพัฒนาความรู้ความสามารถ

          ขอบเขตงานได้แก่
          Communication networks, Data Science, Web Technology and Applications, IoT เป็นต้น
        </section>
      </div>
    </article>
  );
}
