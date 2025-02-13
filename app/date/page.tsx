// app/date/page.tsx
'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

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
  const [selectedDate, setSelectedDate] = useState<Value>(new Date(INTERVIEW_DATES[0]));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number | null>(null);

  const handleDateChange = (value: Value) => {
    setSelectedDate(value);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (id: number) => {
    setSelectedTimeSlot(id);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTimeSlot) {
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
  

  return (
    <div className="container">
      <h1 className="title">เลือกวันเวลาสัมภาษณ์ผู้สมัคร</h1>
      
      <div className="calendar-wrapper">
        <div className="calendar-section">
          <Calendar 
            onChange={handleDateChange}
            value={selectedDate}
            tileDisabled={tileDisabled}
          />
        </div>

        <div className="time-slots">
          {selectedDate && (
            <>
              <div className="date-header">
                <h2>
                  {(selectedDate as Date).toLocaleDateString('th-TH', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </h2>
              </div>
              
              <div className="slots">
                {getTimeSlotsForDate(selectedDate as Date).map((slot) => (
                  <button
                    key={slot.id}
                    className={`time-slot ${
                      slot.isBooked ? 'booked' : 
                      selectedTimeSlot === slot.id ? 'selected' :
                      ''
                    }`}
                    onClick={() => !slot.isBooked && handleTimeSlotSelect(slot.id)}
                    disabled={slot.isBooked}
                  >
                    {slot.start} น. - {slot.end} น.
                  </button>
                ))}
              </div>

              {selectedTimeSlot && (
                <button className="confirm-button" onClick={handleConfirm}>
                  ยืนยันการจอง
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Noto Sans Thai', sans-serif;
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
          background-color: #47B4F8;
          border: none;
          padding: 0.75rem;
          border-radius: 6px;
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .time-slot:hover:not(:disabled) {
          background-color: #8CD2FD;
        }

        .time-slot.selected {
          background-color: #2DCE89;
        }

        .time-slot.booked {
          background-color: #D9DDE3;
          cursor: not-allowed;
        }

        .confirm-button {
          margin-top: 1.5rem;
          width: 100%;
          padding: 0.75rem;
          background-color: #EBF7FF;
          color: #49B4F7; 
          border: 2px solid #8CD2FD; 
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .confirm-button:hover {
          background-color: #8CD2FD;
          color: #fff;
        }

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
          background-color: #42B5FC;
          color: white;
          // border-radius: 20px;
        }

        .calendar-section :global(.react-calendar__tile--now) {
          background-color: #E9E9E9;
        }


      `}</style>
    </div>
  );
}