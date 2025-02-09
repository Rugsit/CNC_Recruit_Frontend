'use client'
import { SearchIcon, XMark } from "@/components/icons";
import QuestionCardShort from "./question-card-short";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { Button } from "@nextui-org/button";
import { useParams } from "next/navigation";

type FormField = {
  question: string;
  question_type: string;
  expected_ans: string;
  question_difficulty: string;
}
type QuestionData = {
  question: string;
  question_type: string;
  expected_ans: string;
  question_difficulty: string;
  id: string
}

export default function SelectQuestion(
  {isOpen, setIsOpen, currentIndex, fetchQuestionMain} : 
  {isOpen:boolean, setIsOpen:Dispatch<SetStateAction<boolean>>, currentIndex: number, fetchQuestionMain: () => Promise<void>}) {
  const [questFilter, setQuestFilter] = useState<Array<QuestionData>>([]);
  const [question, setQuestion] = useState<Array<QuestionData>>([]);
  const [selectQuestion, setSelectQuestion] = useState<Array<string>>([]);
  const { id } = useParams();

  const search = (event:any) => {
    if (event.target.value == "") {
      setQuestFilter(question);
      return;
    }
    let filQuestion = question.filter((item) => item.question.includes(event.target.value))
    setQuestFilter(filQuestion);
  }

  const addQuestNisit = async () => {
    selectQuestion.forEach( async (item, index) => {
      const response = await axios.post(`http://localhost:8001/nisit-question/${id}/${item}`, {
          headers: { "Content-Type": "application/json" },
      })
      await fetchQuestion()
      await fetchQuestionMain()
    })
  }

  const fetchQuestion = async () => {
    try {
      console.log("Start")
      const questionResponse = await axios.get("http://localhost:8001/questions/", {
          headers: { "Content-Type": "application/json" },
      })
      const Nisitresponse = await axios.get(`http://localhost:8001/nisit-question/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      if (Nisitresponse.data == null) {
        setQuestFilter(questionResponse.data)
        setQuestion(questionResponse.data)
        throw new Error("Error: " + Nisitresponse.status)
      }
      let nisitdata = Nisitresponse.data
      let questionData = questionResponse.data
      let newData = questionData.filter((item:any) => {
        let check = true
        for (let i of nisitdata) {
          if (i.id === item.id) check = false
        }
        if (check) return item
      })
      setQuestion(newData)
      setQuestFilter(newData)
    } catch (e) {
      console.log(e)
      
    }
  }
  useEffect( () => {
    fetchQuestion();
  }, [isOpen])

  return (
    <div className={clsx("transition-all my-[40px] max-h-[700px] h-full w-full max-w-[700px] mx-[40px] bg-white shadow-md rounded-lg p-5  relative box-border", {
      " scale-100" : isOpen,
      " scale-90" : !isOpen
    })
    }>
      <XMark className="w-5 absolute top-[20px] right-[20px] cursor-pointer" fill="#42B5FC" onClick={() => {
        setSelectQuestion([])
        setIsOpen(false)
      }}/>
        <p className="text-2xl text-center text-[#3B434F]">เลือกคำถาม</p>
      <div className="relative w-full max-w-[400px] mx-auto flex items-center mt-5">
        <input className="font-normal w-full px-10 py-2 shadow-md rounded-full mx-auto block focus:outline-primary" onChange={search} />
        <SearchIcon className="absolute left-3 text-zinc-500"/>
      </div>
      <div className="mt-6">
        <div className="">
          <div className="flex justify-between items-center">
            <p className="text-[#3B434F]">{currentIndex == 1 ? "คำถามวัดทัศนคติ" : "คำถามวัดความรู้"}</p>
            <Button  className="text-white bg-green-400 font-normal text-md active:scale-90" onClick={async () => {
              await addQuestNisit()
              setSelectQuestion([])
            }}>เพิ่มคำถาม</Button>
          </div>
          <div className="  gap-4 px-4 py-2 mt-5 flex flex-col max-h-[500px] overflow-y-auto">
            {questFilter.map((item, index) => {
              if (item.question_type == "attitude" && currentIndex == 1) {
                return <QuestionCardShort question={item.question} question_type={item.question_type} diff={item.question_difficulty} key={item.id} id={item.id} fetchQuestion={fetchQuestion} selectQuestion={selectQuestion} setSelectQuestion={setSelectQuestion}/> 
              } else if (item.question_type == "knowledge" && currentIndex == 2) {
                return <QuestionCardShort question={item.question} question_type={item.question_type} diff={item.question_difficulty} key={item.id} id={item.id} fetchQuestion={fetchQuestion} selectQuestion={selectQuestion} setSelectQuestion={setSelectQuestion}/> 
              }
            })}
          </div>
        </div>
      </div>
    </div>
  ); }
