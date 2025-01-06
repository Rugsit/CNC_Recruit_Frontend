'use client'
import NavbarCandidate from "@/components/candidate-details/navbar-candidate";
import QuestionCard from "@/components/candidate-details/question-card";
import SelectQuestion from "@/components/candidate-details/select-question/select-question";
import { Plus } from "@/components/icons";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Page() {
  const [openSelectQuestion, setOpenSelectQuestion] = useState(false);

  useEffect(()=> {
    if (openSelectQuestion) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"
    }
  }, [openSelectQuestion])

  return (
    <main className="w-full max-w-[1500px] mx-auto pt-[118px]">
      <div className={clsx("transition-opacity fixed top-0 left-0 right-0 bottom-0 bg-black/[.5] z-50 flex justify-center items-center", {
        " opacity-0 pointer-events-none" : !openSelectQuestion,
        " opacity-100 " : openSelectQuestion
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
          <Button className="text-base bg-primary p-6 rounded-lg text-white" onClick={() => {
            setOpenSelectQuestion(true);
          }}>
            เลือกคำถามเพิ่มเติม
          </Button>
        </div>
      </div>
      <div>
        <QuestionCard />
      </div>
    </main>
  );
}
