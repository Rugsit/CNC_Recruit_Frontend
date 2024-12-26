'use client'
import { SearchIcon, XMark } from "@/components/icons";
import QuestionCardShort from "./question-card-short";
import { Dispatch, SetStateAction } from "react";

export default function SelectQuestion(
  {isOpen, setIsOpen} : 
  {isOpen:boolean, setIsOpen:Dispatch<SetStateAction<boolean>>}) {
  return (
    <div className={("my-[40px] max-h-[500px] h-full w-full max-w-[900px] mx-[40px] bg-white shadow-md rounded-lg p-5  relative box-border")}>
      <XMark className="w-5 absolute top-[20px] right-[20px] cursor-pointer" fill="#42B5FC" onClick={() => {
        setIsOpen(false)
      }}/>
      <p className="font-bold text-2xl text-center">เลือกคำถาม</p>
      <div className="relative w-full max-w-[400px] mx-auto flex items-center">
        <input className="w-full px-10 py-2 shadow-md rounded-full mx-auto block focus:outline-zinc-500" />
        <SearchIcon className="absolute left-3 text-zinc-500"/>
      </div>
      <div className="grid grid-cols-2 mt-6 gap-10 ">
        <div className=" ">
          <div>
            <p>คำถามวัดความรู้</p>
          </div>
          <div className="  gap-4 px-4 py-2 mt-5 flex flex-col max-h-[300px] overflow-y-auto">
            <QuestionCardShort />
            <QuestionCardShort />
            <QuestionCardShort />
            <QuestionCardShort />
            <QuestionCardShort />
          </div>
        </div>
        <div>
          <div>
            <p>คำถามวัดทัศนคติ</p>
          </div>
          <div className="  gap-4 px-4 py-2 mt-5 flex flex-col max-h-[300px] overflow-y-auto">
            <QuestionCardShort />
            <QuestionCardShort />
            <QuestionCardShort />
            <QuestionCardShort />
            <QuestionCardShort />
          </div>
        </div>
      </div>
    </div>
  ); }
