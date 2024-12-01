import { Timer } from '@/components/timer';

export default function Home() {
  return (
    <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
      <Timer
        buttonAction='สมัคร'
        desc='วันนี้ ถึง 4 Dec'
        endTime='Dec 4, 2024 18:00:00'
        title='ปิดรับสมัคร'
      />
    </section>
  );
}
