'use client'
import NavbarCandidate from "@/components/candidate-details/navbar-candidate";
import QuestionCard from "@/components/candidate-details/question-card";
import SelectQuestion from "@/components/candidate-details/select-question/select-question";
import { Plus } from "@/components/icons";
import clsx from "clsx";
import { useState } from "react";

export default function Page() {
  const [openSelectQuestion, setOpenSelectQuestion] = useState(false);
  return (
    <main>
      <div className={clsx("visible transition-all opacity-100 fixed top-0 left-0 right-0 bottom-0 bg-black/[.5] z-50 flex justify-center items-center", {
        " invisible opacity-0" : !openSelectQuestion
      })}>
        <SelectQuestion isOpen={openSelectQuestion} setIsOpen={setOpenSelectQuestion} />
      </div>
      <NavbarCandidate />
      <div className="relative text-4xl w-full max-lg:max-w-[750px] max-lg:mx-auto text-center text-primary my-10 flex max-lg:flex-col items-center justify-center">
        <p>
        คำถามห้องวัดความรู้
        </p>
        <div className="h-full lg:absolute flex lg:justify-end w-full items-center max-lg:justify-between gap-5 top-0 right-0 max-lg:mt-10" >
          <div className="bg-primary py-3 px-3 rounded-full cursor-pointer">
            <Plus size={24} fill="white"/>
          </div> 
          <button className="text-base bg-primary p-4 rounded-lg text-white" onClick={() => {
            setOpenSelectQuestion(true);
          }}>
            เลือกคำถามเพิ่มเติม
          </button>
        </div>
      </div>
      <div>
        <QuestionCard />
      </div>
    </main>
  );
}
