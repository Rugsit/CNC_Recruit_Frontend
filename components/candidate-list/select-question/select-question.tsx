'use client'
import { SearchIcon, XMark } from "@/components/icons";
import QuestionCardShort from "./question-card-short";
import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";

export default function SelectQuestion(
  {isOpen, setIsOpen, currentIndex} : 
  {isOpen:boolean, setIsOpen:Dispatch<SetStateAction<boolean>>, currentIndex: number}) {
  return (
    <div className={clsx("transition-all my-[40px] max-h-[500px] h-full w-full max-w-[700px] mx-[40px] bg-white shadow-md rounded-lg p-5  relative box-border", {
      " scale-100" : isOpen,
      " scale-90" : !isOpen
    })
    }>
      <XMark className="w-5 absolute top-[20px] right-[20px] cursor-pointer" fill="#42B5FC" onClick={() => {
        setIsOpen(false)
      }}/>
      <p className="font-bold text-2xl text-center">เลือกคำถาม</p>
      <div className="relative w-full max-w-[400px] mx-auto flex items-center mt-5">
        <input className="w-full px-10 py-2 shadow-md rounded-full mx-auto block focus:outline-zinc-500" />
        <SearchIcon className="absolute left-3 text-zinc-500"/>
      </div>
      <div className="mt-6">
        <div className="">
          <div>
            <p>{currentIndex == 1 ? "คำถามวัดทัศนคติ" : "คำถามวัดความรู้"}</p>
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
