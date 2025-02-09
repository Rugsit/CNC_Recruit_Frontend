'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

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
        "action": "สมัครเข้าร่วม LAB"
      },
      {
        "id": 3,
        "path": "/home",
        "action": "ลงเวลาสัมภาษณ์"
      },
      {
        "id": 4,
        "path": "/home",
        "action": "ผลการคัดเลือก"
      }
    ]

    const result = paths.find((item) => item.id === id)
    setState(result)
  }


  return (
    <div className='flex flex-col items-center justify-center font-sans-thai'>
      <div className='text-center'>
        <h3 className='md:text-[61px] text-[25px] font-bold text-[#0374BA]'>{title}</h3>
        <p className='md:text-[39px] text-text[16px] [16px] font-light text-[#0374BA]'>{desc}</p>
      </div>
      <div className='flex items-start justify-center w-full gap-4 count-down-main text-primary'>
        <div className='timer flex flex-col md:space-y-[-2rem] space-y-[-1rem] '>
          <span className='md:text-[140px] text-[50px] text-primary font-bold text-center'>
            {timeRemaining.days}
          </span>
          <span className='md:text-[39px] text-[20px] font-normal text-center'>วัน</span>
        </div>
        <h3 className='font-bold md:text-[140px] text-[20px] '>:</h3>
        <div className='timer flex flex-col md:space-y-[-2rem] space-y-[-1rem]'>
          <h3 className='md:text-[140px] text-[50px] text-primary font-bold text-center'>
            {timeRemaining.hours}
          </h3>
          <p className='md:text-[39px] text-[20px] font-normal text-center w-full'>ชั่วโมง</p>
        </div>
        <h3 className='font-bold md:text-[140px] text-[20px]'>:</h3>
        <div className='timer flex flex-col md:space-y-[-2rem] space-y-[-1rem]'>
          <h3 className='md:text-[140px] text-[50px] text-primary font-bold text-center'>
            {timeRemaining.minutes}
          </h3>
          <p className='md:text-[39px] text-[20px] font-normal text-center w-full'>นาที</p>
        </div>
        <h3 className='font-bold md:text-[140px] text-[20px]'>:</h3>
        <div className='timer flex flex-col md:space-y-[-2rem] space-y-[-1rem]'>
          <h3 className='md:text-[140px] text-[50px] text-primary font-bold text-center'>
            {timeRemaining.seconds}
          </h3>
          <p className='md:text-[39px] text-[20px] font-normal text-center w-full'>วินาที</p>
        </div>
      </div>

      {state && (
        <Link
          href={state?.path ?? ""}
          className='mt-8 p-[1rem] md:text-[32px] text-[16px] bg-primary text-white rounded-lg'
        >
          {state?.action}
        </Link>
      )}
    </div>
  );
};
