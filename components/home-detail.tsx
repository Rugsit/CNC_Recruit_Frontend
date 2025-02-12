'use client';
import Image from 'next/image';
import logo from '@/public/cnc_logo_white.png';

export default function HomeDetails() {
  return (
    <article
      className='grid grid-rows-[auto_auto] grid-cols-[minmax(auto,800px)] xl:grid-cols-[minmax(auto,_800px)_minmax(auto,_500px)] gap-10 w-full  mx-auto max-w-fit pt-[200px] px-[20px]'
      id='about-lab'
    >
      <div className=''>
        <Image
          className='mt-3 w-[90%] h-[90%] object-contain'
          src={logo}
          alt='cnc logo'
        />
      </div>
      <div className='flex flex-col w-full'>
        <header className='text-[60px]  text-white font-bold  text-center xl:text-start xl:text-[80px]'>
          LAB CNC
        </header>
        <section className='mt-3 lg:text-[16px] xl:text-[20px] text-white bg-[#0374BA]  p-8 rounded-[31] grow font-normal border-white border-[2px]'>
          <p className='font-bold '>
            ห้องปฏิบัติการและวิจัย CNC สังกัดภาควิชาวิทยาการคอมพิวเตอร์
            คณะวิทยาศาสตร์ มหาวิทยาลัยเกษตรศาสตร์ บางเขน
            <br />
          </p>
          กิจกรรมและงานวิจัยเกี่ยวกับ Communication networks, Data Science, Web
          Technology and Applications, IoT, Deep Learning เป็นต้น
          มีวัตถุประสงค์ให้นิสิตสมาชิกห้องปฏิบัติการและวิจัย
          ได้สัมผัสกับการเรียนรู้นอกห้องเรียน ได้ลงมือปฏิบัติจริง
          เพื่อพัฒนาความรู้ความสามารถของนิสิตในสาขาวิทยาการคอมพิวเตอร์
        </section>
      </div>
    </article>
  );
}
