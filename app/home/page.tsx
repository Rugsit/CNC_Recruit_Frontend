import HomeDetails from "@/components/home-detail";
import { Timer } from "@/components/timer";

export default function Home() {
  return (
    <section className='bg-gradient-to-b from-white to-primary-500 '>
      <div className="h-[100vh] flex items-center justify-center">
        <Timer title="ปิดลงวันเวลาสัมภาษณ์ในอีก..." endTime="1234" buttonAction="ลงเวลาสัมภาษณ์" desc="คุณยังไม่เลือกวันเวลาสัมภาษณ์โปรดเลือกเวลาภายในช่วงเวลาที่กำหนด"/>
      </div>
      <HomeDetails />
    </section>
  );
}
