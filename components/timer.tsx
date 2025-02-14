'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import LoginPopup from '@/app/home/_local/loginPopup';
import axios from 'axios';

interface Props {
  id: number;
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
        return;
      }

      let diff = Math.abs(now - date) / 1000;

      const days = Math.floor(diff / (3600 * 24));
      diff %= 3600 * 24;

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

    path();
  }, []);

  const path = () => {
    const paths: State[] = [
      {
        id: 2,
        path: '/register',
        action: 'สมัครเข้าร่วม Lab',
        desc: 'เข้าร่วม Lab CNC เพื่อพัฒนาทักษะด้านวิทยาการคอมพิวเตอร์และร่วมทำงานวิจัย/โปรเจกต์ที่ท้าทาย',
      },
      {
        id: 3,
        path: '/date',
        action: 'ลงเวลาสัมภาษณ์',
        desc: 'อย่าลืมเลือกวันเวลาสัมภาษณ์โปรดเลือกเวลาภายในช่วงเวลาที่กำหนด !!!',
      },
      {
        id: 4,
        path: '',
        action: 'ผลการคัดเลือก',
        desc: 'ขอบคุณที่ให้ความสนใจแล้วพบกันใหม่ในกิจกรรมต่อไป',
      },
    ];

    const result = paths.find((item) => item.id === id);
    setState(result);
  };

  const { data, status } = useSession();
  const [isLogin, setIsLogin] = useState(false);
  const [loginIsClosed, setLoginIsClosed] = useState(true);

  const fetchRole = async () => {
    try {
      const resp = await axios.get('http://localhost:8000/user', {
        headers: {
          Authorization: `Bearer ${data?.backendToken}`,
        },
      });
      setIsLogin(true);
    } catch (e) {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    if (status !== 'loading') {
      fetchRole();
    }
  }, [status]);
  const closeLoginPopup = () => {
    setLoginIsClosed(true);
  };

  return (
    <div className='flex flex-col items-center justify-center font-sans-thai m-[50px] '>
      <div
        className={clsx(
          'bg-black/[.5] fixed top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center transition-all',
          {
            ' pointer-events-none opacity-0': loginIsClosed,
            ' opacity-100': !loginIsClosed,
          }
        )}
      >
        <LoginPopup
          onClose={closeLoginPopup}
          onLoginSuccess={() => {}}
          isOpen={loginIsClosed}
        />
      </div>
      <div className='text-center'>
        <h3 className='lg:text-[50px] md:text-[40px] text-[25px] font-bold text-[#0374BA]'>
          {title}
        </h3>
        <p className='lg:text-[30px] md:text-[25px] text-[16px] font-light text-[#0374BA]'>
          {state && state.desc}
        </p>
      </div>
      <div className='flex items-start justify-center w-full sm:gap-4 gap-2 count-down-main bg-gradient-to-t from-primary to-[#0374BA] text-transparent bg-clip-text'>
        <div className='timer flex flex-col md:space-y-[-2rem] space-y-[-0.5rem] '>
          <span
            className={`text-[40px] sm:text-[50px]  md:text-[90px] lg:text-[140px] font-bold text-center `}
          >
            {timeRemaining.days}
          </span>
          <span
            className={`lg:text-[39px] md:text-[30px] text-[20px] font-normal text-center`}
          >
            วัน
          </span>
        </div>
        <h3
          className={`font-bold text-[40px] sm:text-[50px] md:text-[90px] lg:text-[140px]`}
        >
          :
        </h3>
        <div className='timer flex flex-col md:space-y-[-2rem] space-y-[-0.5rem]'>
          <span
            className={`text-[40px] sm:text-[50px] md:text-[90px] lg:text-[140px] font-bold text-center`}
          >
            {timeRemaining.hours}
          </span>
          <span
            className={`lg:text-[39px] md:text-[30px] text-[20px] font-normal text-center`}
          >
            ชั่วโมง
          </span>
        </div>
        <h3
          className={`font-bold text-[40px] sm:text-[50px] md:text-[90px] lg:text-[140px]`}
        >
          :
        </h3>
        <div className='timer flex flex-col md:space-y-[-2rem] space-y-[-0.5rem]'>
          <span
            className={`text-[40px] sm:text-[50px] md:text-[90px] lg:text-[140px] font-bold text-center`}
          >
            {timeRemaining.minutes}
          </span>
          <span
            className={`lg:text-[39px] md:text-[30px] text-[20px] font-normal text-center`}
          >
            นาที
          </span>
        </div>
        <h3
          className={`font-bold text-[40px] sm:text-[50px] md:text-[90px] lg:text-[140px]`}
        >
          :
        </h3>
        <div className='timer flex flex-col md:space-y-[-2rem] space-y-[-0.5rem]'>
          <span
            className={`text-[40px] sm:text-[50px] md:text-[90px] lg:text-[140px] font-bold text-center`}
          >
            {timeRemaining.seconds}
          </span>
          <span
            className={`lg:text-[39px] md:text-[30px] text-[20px] font-normal text-center`}
          >
            วินาที
          </span>
        </div>
      </div>

      {state?.path != '' && (
        <Button
          className='md:p-[40px] p-[30px] bg-white border-[3px] border-primary mt-[80px] shadow-md hover:scale-95'
          onClick={() => {
            if (!isLogin) {
              setLoginIsClosed(false);
            }
          }}
        >
          {isLogin ? (
            <Link
              href={state?.path || ''}
              className='p-[1rem] lg:text-[25px] md:text-[20px] text-[16px] font-bold text-primary'
            >
              {state?.action}
            </Link>
          ) : (
            <Link
              href={''}
              className='p-[1rem] lg:text-[25px] md:text-[20px] text-[16px] font-bold text-primary'
            >
              {state?.action}
            </Link>
          )}
        </Button>
      )}
    </div>
  );
};
