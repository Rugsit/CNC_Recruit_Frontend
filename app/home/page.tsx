'use client'
import HomeDetails from "@/components/home-detail";
import { Timer } from "@/components/timer";
import Map from "@/app/home/_local/map";
import Timeline from "@/components/timeline";
import HomeFooter from "@/components/home-footer";
import LoginPopup from "./_local/loginPopup";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Session } from '@/app/home/_local/types';
import recruitingSchduleService from '@/services/recruitingSchduleService';

export default function Home() {
  const { getCurrent } = recruitingSchduleService()
  const [isEnterPage, setIsEnterPage] = useState(false);
  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    setTimeout(() => {
      setIsEnterPage(true);
    }, 500);

    const fetchData = async () => {
      try {
        await getCurrent().then((session) => {
          setSession(session);
        })
      } catch (error: any) {
        if (error.response?.status === 404)
          console.error('Candidates not found!');
        else
          console.error('Fetching data failed!');
      }
    }

    fetchData().then(r => {});

  }, []);

  return (
    <section >
      <section className='bg-gradient-to-b from-white to-primary' id="home">
        <div className={clsx("transition-all duration-1000 h-[100vh]  flex items-center justify-center pt-[100px]", {
          "opacity-0 translate-y-[50px] pt-[150px]" : !isEnterPage
        })} >
          {session && <Timer id={session?.id} title={session?.title } endTime={session?.time} desc=""/>}
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
