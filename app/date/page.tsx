'use client';

import axios from 'axios';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import DateModal from './_local/date-modal';

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

interface ReservationTime {
  email: string;
  id: string;
  interviewId: string;
  label: string;
  name: string;
  pictureURL: string;
  startTime: string;
  endTime: string;
}

const INTERVIEW_DATES = ['2025-02-25', '2025-02-26'];

export default function InterviewCalendar() {
  const [selectedDate, setSelectedDate] = useState<Value>(
    new Date(INTERVIEW_DATES[0])
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string[]>([]);
  const { data, status } = useSession();
  const [timeSlot, setTimeSlot] = useState<[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [reservationTime, setReservationTime] = useState<ReservationTime | null>(null);

  // console.log(`Token = ${data?.backendToken}`); // Token Debug

  const handleDateChange = (value: Value) => {
    setSelectedDate(value);
  };

  // GET time slots
  const fetchDataCalendar = async () => {
    try {
      const response = await axios.get('http://localhost:8000/interview', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data?.backendToken}`,
        },
      });
      // console.log(response.data);
      const responseSortedByStartDate = response.data.sort(
        (a: TimeType, b: TimeType) =>
          Date.parse(a.startTime) - Date.parse(b.startTime)
      );

      setTimeSlot(responseSortedByStartDate);
    } catch (e) {
      console.error(e);
    }
  };

  // GET reservation time (If candidate already chosen the date)
  const fetchReservationTime = async () => {
    try {
      const response = await axios.get('http://localhost:8000/participant', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data?.backendToken}`,
        },
      });

      setReservationTime(response.data);
      // console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  // PATCH
  const handleConfirm = async (isUnreserve: boolean) => {
    // console.log(`SelectedTimeSlot = ${selectedTimeSlot[0]}`);
    let path;

    try {
      // console.log(`isUnreserve = ${isUnreserve}`);
      // console.log(`selectedDate = ${selectedDate}\nselectedTimeSlot = ${selectedTimeSlot}`);
      if (isUnreserve) {
        if (!reservationTime) {
          throw new Error('เกิดข้อผิดพลาดระหว่างการแก้ไขกรุณาลองใหม่อีกครั้ง');
        }
        path = 'unreserve';
      } else {
        if (selectedTimeSlot.length === 0) {
          throw new Error('กรุณาเลือกเวลาสัมภาษณ์');
        }
        path = 'reserve';
      }
      const response = await axios.patch(
        `http://localhost:8000/interview/${path}/${selectedTimeSlot[0] ? selectedTimeSlot[0] : reservationTime?.interviewId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data?.backendToken}`,
          },
        }
      );

      setSelectedTimeSlot([]);

      // Refetch the time slots immediately
      await fetchDataCalendar();
      setIsSuccess(true);
      setIsModalVisible(true);
    } catch (e) {
      console.error(e);
      setIsSuccess(false);
      setIsModalVisible(true);
    }
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const formattedDate = date.toLocaleDateString('en-CA'); // ใช้ฟอร์แมต 'YYYY-MM-DD'

    return !INTERVIEW_DATES.includes(formattedDate);
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
      fetchDataCalendar();
      fetchReservationTime();
    }
    // console.log(selectedTimeSlot); // Debug selected time slot
  }, [status, selectedTimeSlot]);
  if (status === 'loading') {
    return (
      <section className='flex flex-grow flex-col gap-y-5 justify-center items-center min-h-screen'>
        <div className='w-16 h-16 border-5 border-[#42B5FC] border-t-transparent rounded-full animate-spin' />
        <h1 className='text-[#42B5FC] text-xl font-bold'>
          กำลังโหลดตารางเวลาสัมภาษณ์...
        </h1>
      </section>
    );
  }

  return (
    <div className='flex flex-col gap-y-7 items-center font-sans-thai max-w-[1500px] w-full mx-auto pt-[150px] pb-[50px] px-20'>
      <h1 className='font-bold text-3xl text-center text-[#475569]'>
        เลือกวันเวลาสัมภาษณ์ผู้สมัคร
      </h1>
      <h2 className='font-bold text-xl text-center text-[#42b5fc]'>
        {(selectedDate as Date).toLocaleDateString('th-TH', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </h2>
      <div className='flex flex-col gap-y-4 lg:grid lg:grid-cols-2 lg:gap-4'>
        <div className='calendar-section'>
          <Calendar
            minDetail='month'
            next2Label={null}
            nextLabel={null}
            prev2Label={null}
            prevLabel={null}
            tileDisabled={tileDisabled}
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className='flex flex-col'>
          {selectedDate && (
            <>
              <div className='flex flex-col gap-y-3 items-center'>
                <div className='flex flex-col gap-y-2 bg-white w-full h-[400px] overflow-y-scroll px-5 py-4 rounded-lg shadow-sm'>
                  {timeSlot.map((slot: TimeType) => {
                    if (
                      getSelectedDay(selectedDate) ===
                      getSelectedDay(new Date(slot.startTime))
                    ) {
                      // console.log(slot.id); // Debug time slots
                      return (
                        <button
                          key={slot.id}
                          className={clsx(
                            `${(!reservationTime?.interviewId && (slot.status !== "reserved" && slot.status !== "completed")) ? "hover:scale-105" : ""} transition-all text-white p-4 rounded-lg shadow-lg w-full flex justify-between focus:outline-none`,
                            {
                              // Selected unreserved slot
                              'bg-green-400 hover:bg-green-300':
                                slot.status === 'unreserved' &&
                                findIsSelected(slot.id) ||
                                (reservationTime && slot.id === reservationTime.interviewId),

                              // Available unreserved slots
                              'bg-primary hover:bg-[#96d7ff]':
                                slot.status === 'unreserved' &&
                                !findIsSelected(slot.id),

                              // Slots reserved by others - lowest priority
                              'bg-gray-300 hover:bg-gray-200':
                                (slot.status === 'reserved' &&
                                (!reservationTime || slot.id !== reservationTime.interviewId)) ||
                                slot.status === 'completed',
                            }
                          )}
                          disabled={
                            slot.status === 'completed' ||
                            slot.status === 'reserved' ||
                            reservationTime !== null
                          }
                          onClick={() => {
                            selectTimeSlot(slot.id);
                            // console.log(
                            //   `Slot Id = ${slot.id}\nReservation ID = ${reservationTime?.interviewId}`
                            // );
                          }}
                        >
                          <p className={`w-full font-bold text-center ${(slot.status === "completed" || slot.status === "reserved") ? "line-through" : ""}`}>
                            {slot.label}
                          </p>
                        </button>
                      );
                    }
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {selectedTimeSlot && (
        <button
          className={clsx(
            'w-full py-3 border-2 rounded-md shadow-lg transition-all hover:scale-95',
            {
              'bg-[#ebf7ff] hover:bg-[#8cd2fd] border-[#8cd2fd] text-[#8cd2fd] hover:text-white':
                !reservationTime,
              'hover:bg-[#475569] border-[#475569] text-[#475569] hover:text-white':
                reservationTime,
            }
          )}
          onClick={() => handleConfirm(reservationTime?.interviewId !== undefined)}
        >
          {reservationTime ? 'แก้ไขการจอง' : 'ยืนยันการจอง'}
        </button>
      )}
      <div
        className={clsx(
          'transition-opacity fixed top-0 left-0 right-0 bottom-0 bg-black/[.5] z-50 flex justify-center items-center',
          {
            ' opacity-0 pointer-events-none': !isModalVisible,
            ' opacity-100 ': isModalVisible,
          }
        )}
      >
        <DateModal
          title={
            isSuccess ?
              (reservationTime?.interviewId ? 'ลงเวลาสัมภาษณ์เสร็จสิ้น' : 'แก้ไขเวลาสัมภาษณ์เสร็จสิ้น')
              : 'ลงเวลาสัมภาษณ์ไม่สำเร็จ'
          }
          desc={
            isSuccess
              ? (reservationTime?.interviewId ? 'ขอให้โชคดีกับการสัมภาษณ์ครับผม' : 'กรุณาเลือกเวลาสัมภาษณ์ใหม่')
              : 'เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง'
          }
          isSuccess={isSuccess}
          isVisible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
          }}
        />
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
