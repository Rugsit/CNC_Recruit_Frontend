'use client';

import AddQuestion from "@/components/candidate-details/add-question/add-question-popup";
import QuestionCard from "@/components/candidate-list/question-card";
import SelectQuestion from "@/components/candidate-list/select-question/select-question";
import { Plus } from "@/components/icons";
import { Button } from "@nextui-org/button";
import axios from "axios";
import clsx from "clsx";
import { fetchInternalImage } from "next/dist/server/image-optimizer";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type QuestionNisit = {
  id: string,
  question: string,
  question_type: string,
  expected_ans: string,
  question_difficulty: string,
  score: number,
  comment: string
}

export default function QuestionKnowledge({currentIndex, setStatusPopup} : {currentIndex : number, setStatusPopup: Dispatch<SetStateAction<{
    status: boolean;
    isShow: boolean;
}>>}) {

  const [openSelectQuestion, setOpenSelectQuestion] = useState(false);
  const [openCreateQuestion, setOpenCreateQuestion] = useState(false);
  const [questionNisit, setQuestionNisit] = useState<QuestionNisit[]>([]);
  const { id } = useParams();

  const fetchQuestion =  async () => {
    try {
      const response = await axios.get(`http://localhost:8001/nisit-question/${id}`)
      if (response.data == null) {
        throw new Error("Error: " + response.status)
      }
      setQuestionNisit(response.data)
      console.log("Main")
      console.log(response.data)
    } catch (e) {
      console.log(e)
      setQuestionNisit([])
    }
  }

  useEffect(() => {
    fetchQuestion()
  }, [])

  useEffect(()=> {
    if (openSelectQuestion) {
      document.body.style.overflow = "hidden"
    } else if (openCreateQuestion) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [openSelectQuestion, openCreateQuestion])

  return (
    <main>
      <div className={clsx("transition-opacity fixed top-0 left-0 right-0 bottom-0 bg-black/[.5] z-50 flex justify-center items-center", {
        " opacity-0 pointer-events-none" : !openSelectQuestion,
        " opacity-100 " : openSelectQuestion
      })}>
        <SelectQuestion isOpen={openSelectQuestion} setIsOpen={setOpenSelectQuestion} currentIndex={currentIndex} fetchQuestionMain={fetchQuestion}/>
      </div>
      <div className={clsx("transition-opacity fixed top-0 left-0 right-0 bottom-0 bg-black/[.5] z-50 flex justify-center items-center", {
        " opacity-0 pointer-events-none" : !openCreateQuestion,
        " opacity-100 " : openCreateQuestion
      })}>
        <AddQuestion isOpen={openCreateQuestion} setIsOpen={setOpenCreateQuestion} setStatusPopup={setStatusPopup}/>
      </div>
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
      {questionNisit.map((item) => {
        if (currentIndex == 1 && item.question_type === "attitude") {
          return <QuestionCard questionNisit={item} key={item.id} fetchQuestion={fetchQuestion}/>
        } else if (currentIndex == 2 && item.question_type === "knowledge") {
          return <QuestionCard questionNisit={item} key={item.id} fetchQuestion={fetchQuestion}/>
        }
      })}
    </main>
  );
}
