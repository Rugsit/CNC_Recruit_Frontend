'use client';
import { Button } from '@nextui-org/button';
import axios from 'axios';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

import { CheckMark } from '@/components/icons';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type participants = {
  id: string;
  nisitInfoId: string;
  name: string;
  nickName: string;
  typeOfDpm: string;
  pictureURL: string;
  label: string;
  interviewId: string;
  startTime: string;
  endTime: string;
  interviewStatus: string;
};

const INTERVIEW_DATES = ['2025-02-25', '2025-02-26'];

export default function CandidateInterview() {
  const [timeSlotCandidate, setTimeSlotCandidate] = useState<
    Map<string, participants[]>
  >(new Map());
  const [selectedDate, setSelectedDate] = useState<Value>(
    new Date(INTERVIEW_DATES[0])
  );
  const { data, status } = useSession();

  const handleDateChange = (value: Value) => {
    setSelectedDate(value);
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const formattedDate = date.toLocaleDateString('en-CA'); // ใช้ฟอร์แมต 'YYYY-MM-DD'

    return !INTERVIEW_DATES.includes(formattedDate);
  };

  const clearInterview = async (value: string) => {
    try {
      const response = await axios.patch(
        process.env.NEXT_PUBLIC_API_URL + `/interview/end/${value}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${data?.backendToken}`,
          },
        }
      );

      await fetchData();
    } catch (e) {}
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + '/admin/participants',
        {
          headers: {
            Authorization: `Bearer ${data?.backendToken}`,
          },
        }
      );
      const newDataFilterDay = response.data.filter((item: participants) => {
        if (
          getSelectedDay(selectedDate) ===
          getSelectedDay(new Date(item.startTime))
        ) {
          return item;
        }
      });
      const responseSortedByStartDate = newDataFilterDay.sort(
        (a: participants, b: participants) =>
          Date.parse(a.startTime) - Date.parse(b.startTime)
      );
      const newTimeSlotMap = new Map<string, participants[]>();

      responseSortedByStartDate.forEach((item: participants) => {
        if (!newTimeSlotMap.has(item.label)) {
          newTimeSlotMap.set(item.label, []);
        }
        newTimeSlotMap.get(item.label)?.push(item);
      });

      setTimeSlotCandidate(newTimeSlotMap);
      // console.log(timeSlotCandidate);
    } catch (e) {}
  };

  const getSelectedDay = (selectedDate: Value): number | null => {
    if (selectedDate instanceof Date) {
      return selectedDate.getDate();
    } else if (Array.isArray(selectedDate)) {
      const [start, end] = selectedDate;

      return start instanceof Date ? start.getDate() : null;
    }

    return null;
  };

  useEffect(() => {
    if (status !== 'loading') {
      setTimeSlotCandidate(new Map());
    }
  }, [selectedDate]);

  useEffect(() => {
    if (status !== 'loading') {
      fetchData();
    }
  }, [selectedDate, status]);

  return (
    <div className='font-sans-thai pt-[130px]'>
      <h1 className='title'>เลือกวันเวลาสัมภาษณ์ผู้สมัคร</h1>

      <div className='max-w-[1500px] w-full mx-auto p-[20px] lg:grid lg:grid-cols-2 lg:gap-4'>
        <div className='calendar-section'>
          <Calendar
            tileDisabled={tileDisabled}
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        <div className='time-slots flex flex-col'>
          {selectedDate && (
            <>
              <div className='date-header'>
                <h2>
                  {(selectedDate as Date).toLocaleDateString('th-TH', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </h2>
              </div>

              {Array.from(timeSlotCandidate.keys()).map(
                (key: string, index: number) => {
                  return (
                    <div
                      key={index}
                      className={clsx(
                        `transition-all mb-3 text-white p-4 rounded-lg w-full flex justify-between focus:outline-none flex-col cursor-auto gap-5`,
                        {
                          'bg-gray-100':
                            timeSlotCandidate.get(key)?.[0].interviewStatus ==
                            'completed',
                          'bg-primary':
                            timeSlotCandidate.get(key)?.[0].interviewStatus !=
                            'completed',
                        }
                      )}
                    >
                      <div className='flex justify-between items-center'>
                        <p
                          className={clsx(`text-xl`, {
                            'text-[#475569]':
                              timeSlotCandidate.get(key)?.[0].interviewStatus ==
                              'completed',
                          })}
                        >
                          {key}
                        </p>
                        <Button
                          isIconOnly
                          className='bg-transparent hover:scale-95 transition-all rounded-full'
                          isDisabled={
                            timeSlotCandidate.get(key)?.[0].interviewStatus ==
                            'completed'
                          }
                          onClick={() => {
                            const interviewId =
                              timeSlotCandidate.get(key)?.[0].interviewId;

                            if (interviewId) {
                              clearInterview(interviewId);
                            }
                          }}
                        >
                          <CheckMark fill='#FFFFFF' />
                        </Button>
                      </div>
                      <div className='flex gap-3'>
                        {timeSlotCandidate
                          .get(key)
                          ?.map((item: participants, index: number) => {
                            return (
                              <button
                                key={item.id}
                                className='bg-white rounded-lg p-4 hover:scale-95 transition-all'
                              >
                                <Link
                                  className='flex flex-col justify-center items-center gap-3'
                                  href={`/admin/candidate-list/${item.nisitInfoId}`}
                                >
                                  <img
                                    alt='use_image'
                                    className='w-full max-w-[100px] h-[100px] rounded-full object-cover'
                                    src={item.pictureURL}
                                  />
                                  <p className='text-primary'>
                                    {item.name} ({item.nickName}) ภาค
                                    {item.typeOfDpm === 'normal'
                                      ? 'ปกติ'
                                      : 'พิเศษ'}
                                  </p>
                                </Link>
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  );
                }
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1500px;
          margin: 0 auto;
          padding: 2rem;
        }

        .title {
          color: #475569;
          font-size: 1.8rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        .calendar-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          background-color: #fff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .calendar-section :global(.react-calendar) {
          width: 100%;
          border: none;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .time-slots {
          background-color: #f8fafc;
          padding: 1.5rem;
          border-radius: 8px;
        }

        .date-header {
          margin-bottom: 1.5rem;
        }

        .date-header h2 {
          color: #475569;
          font-size: 1.4rem;
          margin-bottom: 1rem;
        }

        .slots {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-height: 400px;
          overflow-y: auto;
          padding-right: 1rem;
        }

        .time-slot {
          background-color: #47b4f8;
          border: none;
          padding: 0.75rem;
          border-radius: 6px;
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          margin: 0px 10px;
        }

        .time-slot:hover:not(:disabled) {
        }

        .time-slot.selected {
          background-color: #2dce89;
          transform: scale(1);
        }

        .time-slot.booked {
          background-color: #d9dde3;
          cursor: not-allowed;
        }

        .confirm-button {
          margin-top: 1.5rem;
          width: 100%;
          padding: 0.75rem;
          background-color: #ebf7ff;
          color: #49b4f7;
          border: 2px solid #8cd2fd;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .confirm-button:hover {
          background-color: #8cd2fd;
          color: #fff;
        }

        d-color: #8cd2fd;
        color: #fff;
        @media (max-width: 768px) {
          .calendar-wrapper {
            grid-template-columns: 1fr;
          }

          .container {
            padding: 1rem;
          }
        }

        /* Scrollbar Styling */
        .slots::-webkit-scrollbar {
          width: 6px;
        }

        .slots::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .slots::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        .slots::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        .calendar-section :global(.react-calendar__tile) {
          color: #ababab;
        }

        .calendar-section :global(.react-calendar__tile--active) {
          background-color: #42b5fc;
          color: white;
          // border-radius: 20px;
        }

        .calendar-section :global(.react-calendar__tile--now) {
          background-color: #e9e9e9;
        }
      `}</style>
    </div>
  );
}
