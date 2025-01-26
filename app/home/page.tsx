import HomeDetails from "@/components/home-detail";
import { Timer } from "@/components/timer";
import Map from "@/app/home/_local/map";
import Timeline from "@/components/timeline";
import HomeFooter from "@/components/home-footer";

export default function Home() {
  return (
    <section >
      <section className='bg-gradient-to-b from-white to-primary' id="home">
        <div className="h-[100vh]  flex items-center justify-center pt-[100px]" >
          <Timer title="ปิดลงวันเวลาสัมภาษณ์ในอีก..." endTime="1234" buttonAction="ลงเวลาสัมภาษณ์" desc="คุณยังไม่เลือกวันเวลาสัมภาษณ์โปรดเลือกเวลาภายในช่วงเวลาที่กำหนด"/>
        </div>
      <HomeDetails />
      </section>
      <section className='bg-gradient-to-t from-white to-primary pt-[200px]' id="timeline">
        <Timeline />
        <div className="w-full max-w-[1500px] mx-auto pt-[300px] pb-[200px]" id="location">
          <Map />
        </div>
      </section>
      <HomeFooter />
    </section>
  );
}
