import { UserAdd, Location, Verify } from './icons';

export default function Timeline() {
  return (
    <section className='w-full max-w-fit mx-auto lg:px-5 px-3'>
      <p className='text-center text-white lg:text-4xl text-3xl mb-[20px]'>
        กำหนดการ
      </p>
      <div className='bg-white rounded-lg flex flex-col gap-y-5 lg:flex-row w-full max-w-[1500px] items-center p-20'>
        <div className='flex flex-col justify-center items-center'>
          <div className='hover:scale-125 transition-transform'>
            <UserAdd />
          </div>
          <p className='text-[#0374BA] text-center lg:text-3xl text-2xl font-bold mt-5'>
            เปิดรับสมัคร
          </p>
          <p className='text-primary text-center text-xl mt-3'>
            17 - 21 กุมภาพันธ์
          </p>
        </div>
        <div className='hidden lg:block w-[150px] h-[10px] bg-[#8CD2FD] rounded-xl' />
        <div className='flex flex-col justify-center items-center'>
          <div className='hover:scale-125 transition-transform'>
            <Location />
          </div>
          <p className='text-[#0374BA] text-center lg:text-3xl text-2xl font-bold mt-5'>
            สัมภาษณ์
          </p>
          <p className='text-primary text-center text-xl mt-3'>
            25 - 26 กุมภาพันธ์
          </p>
        </div>
        <div className='hidden lg:block w-[150px] h-[10px] bg-[#8CD2FD] rounded-xl' />
        <div className='flex flex-col justify-center items-center'>
          <div className='hover:scale-125 transition-transform'>
            <Verify />
          </div>
          <p className='text-[#0374BA] text-center lg:text-3xl text-2xl font-bold mt-5'>
            ประกาศผล
          </p>
          <p className='text-primary text-center text-xl mt-3'>28 กุมภาพันธ์</p>
        </div>
      </div>
    </section>
  );
}
