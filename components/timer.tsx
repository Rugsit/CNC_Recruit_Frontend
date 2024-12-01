'use client';
import { Button } from '@nextui-org/button';
import React, { useEffect, useState } from 'react';

interface Props {
  title: string;
  desc?: string;
  endTime: string;
  buttonAction?: string;
}

interface time {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export const Timer = ({ title, desc, endTime, buttonAction }: Props) => {
  const [timeRemaining, setTimeRemaining] = useState<time>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const dest = new Date(endTime).getTime();
    const updateCountdow = () => {
      const now = new Date().getTime();
      const diff = dest - now;

      if (diff <= 0) {
        clearInterval(timer);

        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining({
        days: days < 10 ? `0${days}` : `${days}`,
        hours: hours < 10 ? `0${hours}` : `${hours}`,
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
      });
    };

    const timer = setInterval(updateCountdow, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center font-sans-thai'>
      <div className='text-center'>
        <h3 className='text-[61px] font-bold'>{title}</h3>
        <p className='text-[39px] font-light'>{desc}</p>
      </div>
      <div className='flex items-start justify-center w-full gap-4 count-down-main text-primary'>
        <div className='timer flex flex-col space-y-[-2rem] '>
          <span className='text-[140px] text-primary font-bold text-center'>
            {timeRemaining.days}
          </span>
          <span className='text-[39px] font-normal text-center'>วัน</span>
        </div>
        <h3 className='font-bold text-[140px] '>:</h3>
        <div className='timer flex flex-col space-y-[-2rem]'>
          <h3 className='text-[140px] text-primary font-bold text-center'>
            {timeRemaining.hours}
          </h3>
          <p className='text-[39px] font-normal text-center w-full'>ชั่วโมง</p>
        </div>
        <h3 className='font-bold text-[140px] '>:</h3>
        <div className='timer flex flex-col space-y-[-2rem]'>
          <h3 className='text-[140px] text-primary font-bold text-center'>
            {timeRemaining.minutes}
          </h3>
          <p className='text-[39px] font-normal text-center w-full'>นาที</p>
        </div>
        <h3 className='font-bold text-[140px] '>:</h3>
        <div className='timer flex flex-col space-y-[-2rem]'>
          <h3 className='text-[140px] text-primary font-bold text-center'>
            {timeRemaining.seconds}
          </h3>
          <p className='text-[39px] font-normal text-center w-full'>วินาที</p>
        </div>
      </div>

      {buttonAction ? (
        <Button
          className='mt-8 p-[2rem] text-[32px]'
          color='primary'
        >
          {buttonAction}
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};
