'use client'
import { XMark } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import axios from "axios";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormField = {
  question: string;
  question_type: string;
  expected_ans: string;
  question_difficulty: string;
}

export default function AddQuestion({isOpen, setIsOpen} : {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>}) {
  const [statusSelectDif, setStatusSelectDif] = useState("hard");
  const [statusSelectType, setStatusSelectType] = useState("knowledge");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { register, handleSubmit, formState: {errors}} = useForm<FormField>();

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    console.log("Test")
    const response = await axios.post("http://localhost:8001/questions", data, {
      headers: { "Content-Type": "application/json" },
    })
    console.log("Test")
    console.log(response.data)
    console.log(data);
  }
  return (
    <section className={clsx("transition-all relative bg-white rounded-lg p-12 max-w-[500px] w-full text-[#3B434F] m-[20px]", {
      " scale-100" : isOpen,
      " scale-90" : !isOpen
    })}>
      <p className="text-2xl text-center mb-4">เพิ่มคำถาม</p>
      <XMark className="w-5 absolute top-[15px] right-[15px] cursor-pointer" fill="#42B5FC" onClick={() => {
        setIsOpen(false);
      }}/>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="text-lg mb-3">คำถาม</label>
          <Textarea {...register("question", {
            required: "กรุณากรอกคำถาม"
          })} 
                classNames={{
                    inputWrapper: "bg-gray-100 border-[2px] border-gray-300",
                    input: "placeholder:text-gray-400"
                }}
          />
          {errors.question && (<p className="text-red-400 font-normal mt-1">{"*" + errors.question.message}</p>)}
        <label className="text-lg mt-3 mb-3">คำตอบที่คาดหวัง</label>
          <Textarea {...register("expected_ans", {
            required: "กรุณากรอกคำตอบ"
          })} 
                classNames={{
                    inputWrapper: "bg-gray-100 border-[2px] border-gray-300",
                    input: "placeholder:text-gray-400"
                }}
          />
          {errors.expected_ans && (<p className="text-red-400 font-normal mt-1">{"*" + errors.expected_ans.message}</p>)}
        <div className="flex gap-5 items-center justify-center mt-5 max-[478px]:grid">
          <div className="flex items-center">
            <p>ความยาก</p>
            <select {...register("question_difficulty")}value={statusSelectDif} onChange={(e) => setStatusSelectDif(e.target.value)} className="px-5 py-2 bg-blue-100 text-blue-500 text-center font-bold rounded-lg appearance-none focus:outline-none ml-3">
              <option value="hard">ยาก</option>
              <option value="medium">กลาง</option>
              <option value="easy">ง่าย</option>
            </select>
          </div>
          <div className="flex items-center">
            <p className="">ประเภท</p>
            <select {...register("question_type")} value={statusSelectType} onChange={(e) => setStatusSelectType(e.target.value)} className="px-5 py-2 bg-blue-100 text-blue-500 text-center font-bold rounded-lg appearance-none focus:outline-none ml-3">
              <option value="knowledge">วัดความรู้</option>
              <option value="attitude">วัดทัศนคติ</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 mt-10">
          <Button type="submit" className="bg-primary text-white w-full h-11 text-xl" onClick={() => {}}>ยืนยัน</Button>
          <Button className="bg-red-400 text-white w-full h-11 text-xl" onClick={() => {
            setIsOpen(false);
          }
          }>ยกเลิก</Button>
        </div>
      </form>
    </section>
  );
}