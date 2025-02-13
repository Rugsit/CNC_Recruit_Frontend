// app/date/page.tsx
'use client';

import axios from 'axios';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type TimeType = {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  status: string;
};

interface TimeSlot {
  id: number;
  start: string;
  end: string;
  isBooked: boolean;
}

const INTERVIEW_DATES = ['2025-02-25', '2025-02-26'];

const TIME_SLOTS_BY_DATE: { [key: string]: TimeSlot[] } = {
  '2025-02-25': [
    { id: 1, start: '09:00', end: '09:30', isBooked: false },
    { id: 2, start: '09:31', end: '10:00', isBooked: true },
    { id: 3, start: '10:01', end: '10:30', isBooked: false },
    { id: 4, start: '10:31', end: '11:00', isBooked: false },
    { id: 5, start: '11:01', end: '11:30', isBooked: true },
    { id: 6, start: '11:31', end: '12:00', isBooked: false },
    { id: 7, start: '13:01', end: '13:30', isBooked: false },
    { id: 8, start: '13:31', end: '14:00', isBooked: false },
    { id: 9, start: '14:01', end: '14:30', isBooked: true },
    { id: 10, start: '14:31', end: '15:00', isBooked: false },
    { id: 11, start: '15:01', end: '15:30', isBooked: false },
    { id: 12, start: '15:31', end: '16:00', isBooked: false },
    { id: 13, start: '16:01', end: '16:30', isBooked: true },
    { id: 14, start: '16:31', end: '17:00', isBooked: false },
  ],
  '2025-02-26': [
    { id: 1, start: '09:00', end: '09:30', isBooked: true },
    { id: 2, start: '09:31', end: '10:00', isBooked: false },
    { id: 3, start: '10:01', end: '10:30', isBooked: true },
    { id: 4, start: '10:31', end: '11:00', isBooked: false },
    { id: 5, start: '11:01', end: '11:30', isBooked: false },
    { id: 6, start: '11:31', end: '12:00', isBooked: true },
    { id: 7, start: '13:01', end: '13:30', isBooked: false },
    { id: 8, start: '13:31', end: '14:00', isBooked: true },
    { id: 9, start: '14:01', end: '14:30', isBooked: false },
    { id: 10, start: '14:31', end: '15:00', isBooked: true },
    { id: 11, start: '15:01', end: '15:30', isBooked: false },
    { id: 12, start: '15:31', end: '16:00', isBooked: true },
    { id: 13, start: '16:01', end: '16:30', isBooked: false },
    { id: 14, start: '16:31', end: '17:00', isBooked: true },
  ],
};

export default function InterviewCalendar() {
  const [selectedDate, setSelectedDate] = useState<Value>(
    new Date(INTERVIEW_DATES[0])
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string[]>([]);
  const { data, status } = useSession();
  const [timeSlot, setTimeSlot] = useState([]);

  const handleDateChange = (value: Value) => {
    setSelectedDate(value);
  };

  const handleConfirm = () => {
    if (!selectedDate || selectedTimeSlot.length === 0) {
      alert('กรุณาเลือกวันที่และเวลาให้ครบถ้วน');
      return;
    }
    // Handle confirmation logic here
    alert('ยืนยันการจองเวลาสัมภาษณ์เรียบร้อย');
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const formattedDate = date.toLocaleDateString('en-CA'); // ใช้ฟอร์แมต 'YYYY-MM-DD'
    return !INTERVIEW_DATES.includes(formattedDate);
  };

  const getTimeSlotsForDate = (date: Date) => {
    const formattedDate = date.toLocaleDateString('en-CA'); // ใช้ฟอร์แมต 'YYYY-MM-DD'
    return TIME_SLOTS_BY_DATE[formattedDate] || [];
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/interview', {
        headers: {
          Authorization: `Bearer ${data?.backendToken}`,
        },
      });
      setTimeSlot(response.data);
    } catch (e) {}
  };

  const findIsSelected = (id: string) => {
    let check = false;
    for (let item of selectedTimeSlot) {
      if (item === id) {
        check = true;
        break;
      }
    }
    return check;
  };

  const selectTimeSlot = (id: string) => {
    if (selectedTimeSlot[0] === id) {
      setSelectedTimeSlot([]);
    } else {
      setSelectedTimeSlot([id]);
    }
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
    if (status === 'authenticated') {
      fetchData();
    }
  }, [status]);

  return (
    <div className='font-sans-thai pt-[130px]'>
      <h1 className='title'>เลือกวันเวลาสัมภาษณ์ผู้สมัคร</h1>

      <div className='max-w-[1500px] w-full mx-auto p-[20px] lg:grid lg:grid-cols-2 lg:gap-4'>
        <div className='calendar-section'>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileDisabled={tileDisabled}
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

              {timeSlot.map((slot: TimeType) => {
                if (
                  getSelectedDay(selectedDate) ===
                  getSelectedDay(new Date(slot.startTime))
                ) {
                  return (
                    <button
                      key={slot.id}
                      className={clsx(
                        ` transition-all mb-3 text-white p-4 rounded-lg w-full flex justify-between focus:outline-none `,
                        {
                          'bg-green-400 hover:scale-105':
                            slot.status === 'unreserved' &&
                            findIsSelected(slot.id),
                          'bg-primary hover:scale-105':
                            slot.status === 'unreserved' &&
                            !findIsSelected(slot.id),
                          'bg-gray-300 ': slot.status === 'reserved',
                        }
                      )}
                      onClick={() => {
                        selectTimeSlot(slot.id);
                      }}
                      disabled={slot.status === 'reserved'}
                    >
                      {slot.label}
                    </button>
                  );
                }
              })}

              {selectedTimeSlot && (
                <button
                  className='confirm-button'
                  onClick={handleConfirm}
                >
                  ยืนยันการจอง
                </button>
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
