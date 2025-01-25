"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const timeslots: string[] = [
  "09:00 - 09:30 น.",
  "09:30 - 10:00 น.",
  "10:30 - 11:00 น.",
  "11:00 - 11:30 น.",
  "11:30 - 12:00 น.",
  "12:00 - 12:30 น.",
  "12:30 - 13:00 น.",
  "13:00 - 13:30 น.",
  "13:30 - 14:00 น.",
  "14:00 - 14:30 น.",
  "14:30 - 15:00 น.",
  "15:00 - 15:30 น.",
];

const SchedulePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      alert(
        `คุณเลือกวัน: ${selectedDate.toLocaleDateString(
          "th-TH"
        )} เวลา: ${selectedTime}`
      );
    } else {
      alert("กรุณาเลือกวันที่และเวลาสำหรับการสัมภาษณ์");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#0066CC" }}>
        เลือกวันเวลาสัมภาษณ์ของคุณ
      </h1>
      {/* Main horizontal section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {/* Calendar Section */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>

        {/* Time Selection Section */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            {`วันที่เลือก: ${
              selectedDate
                ? selectedDate.toLocaleDateString("th-TH")
                : "ยังไม่ได้เลือก"
            }`}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {timeslots.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeClick(time)}
                style={{
                  width: "200px",
                  margin: "5px",
                  padding: "10px",
                  backgroundColor: selectedTime === time ? "#C3C9D3" : "#42B5FC",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {time}
              </button>
            ))}
          </div>
          {/* Confirm Button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handleConfirm}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0066CC",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          ยืนยัน
        </button>
      </div>
        </div>
      </div>

      {/* Confirm Button
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handleConfirm}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0066CC",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          ยืนยัน
        </button>
      </div> */}
    </div>
  );
};

export default SchedulePage;
