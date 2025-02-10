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

// Configurable interview dates (can be modified for future years)
const INTERVIEW_DATES = ['2025-02-14', '2025-02-15'];

// Time slots for each date
const TIME_SLOTS_BY_DATE: { [key: string]: TimeSlot[] } = {
  '2025-02-14': [
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
  '2025-02-15': [
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
  const [selectedDate, setSelectedDate] = useState<Value>(null);
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
    return !INTERVIEW_DATES.includes(date.toISOString().split('T')[0]);
  };

  const getTimeSlotsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return TIME_SLOTS_BY_DATE[dateString] || [];
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
          font-family: 'Kanit', sans-serif;
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
          background-color: #60a5fa;
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
          background-color: #3b82f6;
        }

        .time-slot.selected {
          background-color: #22c55e;
        }

        .time-slot.booked {
          background-color: #94a3b8;
          cursor: not-allowed;
        }

        .confirm-button {
          margin-top: 1.5rem;
          width: 100%;
          padding: 0.75rem;
          background-color: #1e40af;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .confirm-button:hover {
          background-color: #1e3a8a;
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
          background: #888;
          border-radius: 3px;
        }

        .slots::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}