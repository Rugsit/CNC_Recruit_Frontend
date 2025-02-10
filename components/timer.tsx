'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/button';

interface Props {
  id: number
  title: string;
  desc?: string;
  endTime: string;
}

interface time {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface State {
  id: number;
  path: string;
  action: string;
  desc: string;
}

export const Timer = ({ id, title, desc, endTime }: Props) => {
  const [timeRemaining, setTimeRemaining] = useState<time>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const [state, setState] = useState<State>();

  useEffect(() => {
    const updateCountdown = () => {
      const date = new Date(endTime).getTime();
      const now = new Date().getTime();

      if (date - now <= 0) {
        return
      }

      let diff = Math.abs(now - date) / 1000;

      const days = Math.floor(diff / (3600 * 24));
      diff %= 3600 * 24

      const hours = Math.floor(diff / 3600);
      diff %= 3600;

      const minutes = Math.floor(diff / 60);
      const seconds = Math.floor(diff % 60);

      setTimeRemaining({
        days: days < 10 ? `0${days}` : `${days}`,
        hours: hours < 10 ? `0${hours}` : `${hours}`,
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
      });
    };

    setInterval(updateCountdown, 1000);

    path()
  }, []);

  const path = () => {
    const paths: State[] = [
      {
        "id": 2,
        "path": "/form/register",
        "action": "สมัครเข้าร่วม LAB",
        "desc": ""

      },
      {
        "id": 3,
        "path": "/home",
        "action": "ลงเวลาสัมภาษณ์",
        "desc": "คุณยังไม่เลือกวันเวลาสัมภาษณ์โปรดเลือกเวลาภายในช่วงเวลาที่กำหนด"
      },
      {
        "id": 4,
        "path": "/home",
        "action": "ผลการคัดเลือก",
        "desc": ""
      }
    ]

    const result = paths.find((item) => item.id === id)
    setState(result)
  }

  let largeTextSize = "39px"
  let mediumTextSize = "30px"
  let smallTextSize = "20px"

  return (
    <div className='flex flex-col items-center justify-center font-sans-thai m-[20px]'>
      <div className='text-center'>
        <h3 className='lg:text-[50px] md:text-[40px] text-[25px] font-bold text-[#0374BA]'>{title}</h3>
        <p className='lg:text-[30px] md:text-[25px] text-[16px] font-light text-[#0374BA]'>{state && state.desc}</p>
      </div>
      <div className='flex items-start justify-center w-full sm:gap-4 gap-2 count-down-main text-primary'>
        <div className='timer flex flex-col md:space-y-[-2rem] space-y-[-0.5rem] '>
          <span className={`text-[40px] sm:text-[50px]  md:text-[90px] lg:text-[140px] text-primary font-bold text-center`}>
            {timeRemaining.days}
          </span>
          <span className={`lg:text-[39px] md:text-[30px] text-[20px] font-normal text-center`}>วัน</span>
        </div>
        <h3 className={`font-bold text-[40px] sm:text-[50px] md:text-[90px] lg:text-[140px]`}>:</h3>
        <div className='timer flex flex-col md:space-y-[-2rem] space-y-[-0.5rem]'>
        <span className={`text-[40px] sm:text-[50px] md:text-[90px] lg:text-[140px] text-primary font-bold text-center`}>
            {timeRemaining.hours}
          </span>
          <span className={`lg:text-[39px] md:text-[30px] text-[20px] font-normal text-center`}>ชั่วโมง</span>
        </div>
        <h3 className={`font-bold text-[40px] sm:text-[50px] md:text-[90px] lg:text-[140px]`}>:</h3>
        <div className='timer flex flex-col md:space-y-[-2rem] space-y-[-0.5rem]'>
        <span className={`text-[40px] sm:text-[50px] md:text-[90px] lg:text-[140px] text-primary font-bold text-center`}>
            {timeRemaining.minutes}
          </span>
          <span className={`lg:text-[39px] md:text-[30px] text-[20px] font-normal text-center`}>นาที</span>
        </div>
        <h3 className={`font-bold text-[40px] sm:text-[50px] md:text-[90px] lg:text-[140px]`}>:</h3>
        <div className='timer flex flex-col md:space-y-[-2rem] space-y-[-0.5rem]'>
        <span className={`text-[40px] sm:text-[50px] md:text-[90px] lg:text-[140px] text-primary font-bold text-center`}>
            {timeRemaining.seconds}
          </span>
          <span className={`lg:text-[39px] md:text-[30px] text-[20px] font-normal text-center`}>วินาที</span>
        </div>
      </div>

      {state && (
        <Button className='md:p-[40px] p-[30px] bg-white border-[3px] border-primary mt-[80px] shadow-md hover:scale-95'>
          <Link
            href={state?.path ?? ""}
            className='p-[1rem] lg:text-[25px] md:text-[20px] text-[16px] font-bold text-primary'
          >
            {state?.action}
          </Link>
        </Button>
      )}
    </div>
  );
};
