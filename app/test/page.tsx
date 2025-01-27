"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import styles for the calendar

// Define timeslot availability
const timeslotAvailability: Record<string, boolean> = {
  "09:00 - 09:30 น.": true,
  "09:30 - 10:00 น.": true,
  "10:30 - 11:00 น.": true,
  "11:00 - 11:30 น.": true,
  "11:30 - 12:00 น.": true,
  "12:00 - 12:30 น.": false, // Example: this timeslot is unavailable
  "13:00 - 13:30 น.": true,
  "13:30 - 14:00 น.": true,
  "14:00 - 14:30 น.": true,
  "14:30 - 15:00 น.": true,
  "15:00 - 15:30 น.": true,
  "15:30 - 16:00 น.": true,
  "16:00 - 16:30 น.": true,
  "16:30 - 17:00 น.": true,
};

const SchedulePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDateChange = (value: Date | null) => {
    if (value) {
      // Only allow selecting February 14-15, 2568
      const allowedDates = [
        new Date(2568, 1, 14).toDateString(),
        new Date(2568, 1, 15).toDateString(),
      ];
      if (allowedDates.includes(value.toDateString())) {
        setSelectedDate(value);
        setSelectedTime(null); // Reset selected time
      } else {
        alert("กรุณาเลือกวันที่ 14 หรือ 15 กุมภาพันธ์ 2568 เท่านั้น");
      }
    } else {
      setSelectedDate(null);
    }
  };

  const handleTimeClick = (time: string) => {
    if (timeslotAvailability[time]) {
      setSelectedTime(time);
    } else {
      alert("เวลานี้ถูกจองแล้ว");
    }
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
          <Calendar onChange={(e) => {console.log(e)}} value={selectedDate} />
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
          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {Object.keys(timeslotAvailability).map((time) => (
              <button
                key={time}
                onClick={() => handleTimeClick(time)}
                disabled={!timeslotAvailability[time]} // Disable unavailable slots
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "10px",
                  backgroundColor: timeslotAvailability[time]
                    ? selectedTime === time
                      ? "#4CAF50"
                      : "#007BFF"
                    : "#CCCCCC", // Gray for unavailable
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: timeslotAvailability[time] ? "pointer" : "not-allowed",
                }}
              >
                {time}
              </button>
            ))}
          </div>
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
    </div>
  );
};

export default SchedulePage;
