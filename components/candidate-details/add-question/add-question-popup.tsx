'use client'
import { XMark } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import clsx from "clsx";
import { useState } from "react";

export default function AddQuestion() {
  const [statusSelectDif, setStatusSelectDif] = useState("");
  const [statusSelectType, setStatusSelectType] = useState("");
  return (
    <section className="relative bg-white rounded-lg p-12 max-w-[500px] w-full text-[#3B434F] m-[20px]">
      <p className="text-3xl text-center mb-4">เพิ่มคำถาม</p>
      <XMark className="w-5 absolute top-[15px] right-[15px] cursor-pointer" fill="#42B5FC" onClick={() => {}}/>
      <form className="flex flex-col" onSubmit={() => {}}>
        <label className="text-xl">คำถาม</label>
          <Textarea className={clsx("my-2 text-base font-medium")}/>
        <label className="text-xl mt-3">คำตอบที่คาดหวัง</label>
          <Textarea className={clsx("my-2 text-base font-medium")}/>
        <div className="flex gap-5 items-center justify-center mt-5 max-[478px]:grid">
          <div className="flex items-center">
            <p>ความยาก</p>
            <select value={statusSelectDif} onChange={(e) => setStatusSelectDif(e.target.value)} className="px-5 py-2 bg-blue-100 text-blue-500 text-center font-bold rounded-lg appearance-none focus:outline-none ml-3">
              <option value="hard">ยาก</option>
              <option value="medium">กลาง</option>
              <option value="easy">ง่าย</option>
            </select>
          </div>
          <div className="flex items-center">
            <p className="">ประเภท</p>
            <select value={statusSelectType} onChange={(e) => setStatusSelectType(e.target.value)} className="px-5 py-2 bg-blue-100 text-blue-500 text-center font-bold rounded-lg appearance-none focus:outline-none ml-3">
              <option value="knowledge">วัดความรู้</option>
              <option value="attitude">วัดทัศนคติ</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 mt-10">
          <Button className="bg-primary text-white w-full h-11 text-xl">ยืนยัน</Button>
          <Button className="bg-red-400 text-white w-full h-11 text-xl">ยกเลิก</Button>
        </div>
      </form>
    </section>
  );
}