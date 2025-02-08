'use client';

import AddQuestion from "@/components/candidate-details/add-question/add-question-popup";
import QuestionCard from "@/components/candidate-list/question-card";
import SelectQuestion from "@/components/candidate-list/select-question/select-question";
import { Plus } from "@/components/icons";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function QuestionKnowledge({currentIndex} : {currentIndex : number}) {
  const [openSelectQuestion, setOpenSelectQuestion] = useState(false);
  const [openCreateQuestion, setOpenCreateQuestion] = useState(false);

  useEffect(()=> {
    if (openSelectQuestion) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"
    }
  }, [openSelectQuestion])

  return (
    <main>
      <div className={clsx("transition-opacity fixed top-0 left-0 right-0 bottom-0 bg-black/[.5] z-50 flex justify-center items-center", {
        " opacity-0 pointer-events-none" : !openSelectQuestion,
        " opacity-100 " : openSelectQuestion
      })}>
        <SelectQuestion isOpen={openSelectQuestion} setIsOpen={setOpenSelectQuestion} currentIndex={currentIndex}/>
      </div>
      <div className={clsx("transition-opacity fixed top-0 left-0 right-0 bottom-0 bg-black/[.5] z-50 flex justify-center items-center", {
        " opacity-0 pointer-events-none" : !openCreateQuestion,
        " opacity-100 " : openCreateQuestion
      })}>
        <AddQuestion isOpen={openCreateQuestion} setIsOpen={setOpenCreateQuestion}/>
      </div>
      {/* <NavbarCandidate /> */}
      <div className="relative text-4xl w-full max-lg:max-w-[750px] max-lg:mx-auto text-center text-primary my-10 flex max-lg:flex-col items-center justify-center">
        <p>
          {currentIndex == 2 ? "คำถามวัดความรู้" : "คำถามวัดทัศนคติ"}
        </p>
        <div className="h-full lg:absolute flex lg:justify-end w-full items-center max-lg:justify-between gap-5 top-0 right-0 max-lg:mt-10" >
          <Button isIconOnly className="bg-primary rounded-full cursor-pointer" size="lg" onClick={() => {
            setOpenCreateQuestion(true)
          }}>
            <Plus size={24} fill="white"/>
          </Button> 
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
