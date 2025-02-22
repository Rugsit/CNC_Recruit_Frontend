'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import LoginPopup from '@/app/home/_local/loginPopup';
import { env } from 'next-runtime-env';
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
  const { data, status } = useSession();
  const [isLogin, setIsLogin] = useState(false);
  const [loginIsClosed, setLoginIsClosed] = useState(true);
  const rounter = useRouter();
  const [isFoundApplication, setIsFoundApplication] = useState<boolean>(false);

  // console.log(`Token: ${data?.backendToken}`); // Debug Token

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
  }, []);

  const path = async () => {
    await fetchApplication();
    // console.log(`Path: ${isFoundApplication}`);
    const paths: State[] = [
      {
        id: 2,
        path: '/register',
        action: isFoundApplication ? 'แก้ไขใบสมัคร' : 'สมัครเข้าร่วม Lab',
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

  const checkToken = async () => {
    const base64Url = data?.backendToken?.split('.')[1];
    const base64 = base64Url?.replace('-', '+').replace('_', '/');

    if (base64) {
      const time = Date.now() / 1000;
      const exp = JSON.parse(window.atob(base64))['exp'];

      return time > exp ? false : true;
    }

    return false;
  };

  const fetchApplication = async () => {
    try {
      const response = await axios.get(env('NEXT_PUBLIC_API_URL') + '/nisit', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data?.backendToken}`,
        },
      });

      // console.log(response.data);
      if (response.data) {
        setIsFoundApplication(true);
      } else {
        setIsFoundApplication(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (status !== 'loading') {
      // fetchApplication();
      path();
      // console.log(`Application: ${isFoundApplication}`);
    }
  }, [status, isFoundApplication]);

  useEffect(() => {
    if (status !== 'loading') {
      checkToken();
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
          isOpen={loginIsClosed}
          onClose={closeLoginPopup}
          onLoginSuccess={() => { }}
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
        <div className='flex gap-5'>
          <button
            className={`${isFoundApplication || (!isFoundApplication && state?.id === 2) ? 'flex' : 'hidden'} md:p-[30px] p-[25px] bg-white border-[3px] border-primary mt-[80px] shadow-md rounded-2xl transition-all hover:scale-95 lg:text-[25px] md:text-[20px] text-[16px] font-bold text-primary`}
            onClick={async () => {
              const loginStatus = await checkToken();

              setIsLogin(loginStatus);
              if (!loginStatus) {
                setLoginIsClosed(false);
              } else {
                if (state?.path) {
                  rounter.push(state?.path);
                }
              }
            }}
          >
            {state?.action}
          </button>
          <button
            className={`${isFoundApplication && state?.id === 3 ? 'flex' : 'hidden'} md:p-[30px] p-[25px]  border-[3px] border-white mt-[80px] shadow-[0_0px_35px_rgba(255,255,255,1)] rounded-2xl transition-all hover:scale-95 bg-gradient-to-t from-primary to-[#0374BA] lg:text-[25px] md:text-[20px] text-[16px] font-bold text-white`}
            onClick={async () => {
              const loginStatus = await checkToken();

              setIsLogin(loginStatus);
              if (!loginStatus) {
                setLoginIsClosed(false);
              } else {
                if (state?.path) {
                  rounter.push('/register');
                }
              }
            }}
          >
            ดูใบสมัคร
          </button>
        </div>
      )}
    </div>
  );
};
