import { UserAdd,Location, Note, Verify } from "./icons";

export default function Timeline() {
  return (
    <section className="w-full max-w-fit mx-auto">
      <p className="text-center text-white text-4xl mb-[20px]">กำหนดการ</p>
      <div className="bg-white rounded-lg flex w-full max-w-[1500px] items-center p-20">
        <div className="flex flex-col justify-center items-center">
          <UserAdd />
          <p className="text-[#0374BA]">00 - 00 กุมภาพันธ์</p>
          <p className="text-primary">เปิดรับสมัครออนไลน์</p>
        </div>
        <div className="w-[150px] h-[10px] bg-[#8CD2FD] rounded-xl"></div>
        <div className="flex flex-col justify-center items-center">
          <Note />
          <p className="text-[#0374BA]">00 - 00 กุมภาพันธ์</p>
          <p className="text-primary">ประกาศรายชื่อผู้มีสิทธิ์สัมภาษณ์</p>
        </div>
        <div className="w-[150px] h-[10px] bg-[#8CD2FD] rounded-xl"></div>
        <div className="flex flex-col justify-center items-center">
          <Location />
          <p className="text-[#0374BA]">00 - 00 กุมภาพันธ์</p>
          <p className="text-primary">สัมภาษณ์ออนไซต์</p>
        </div>
        <div className="w-[150px] h-[10px] bg-[#8CD2FD] rounded-xl"></div>
        <div className="flex flex-col justify-center items-center">
          <Verify />
          <p className="text-[#0374BA]">00 - 00 กุมภาพันธ์</p>
          <p className="text-primary">ประกาศผลการสัมภาษณ์</p>
        </div>
      </div>
    </section>
  );
}