'use client'
import { useEffect, useState } from "react";
import { AngleDown, Bin } from "../icons";
import clsx from "clsx";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { useParams } from "next/navigation";

type QuestionNisit = {
  id: string,
  question: string,
  question_type: string,
  expected_ans: string,
  question_difficulty: string,
  score: number,
  comment: string
}

export default function QuestionCard({questionNisit, fetchQuestion} : {questionNisit : QuestionNisit, fetchQuestion: () => Promise<void>}) {
  const [comment, setComment] = useState<string>("");
  const [editGrade, setEditGrade] = useState(false);
  const [toggleMoreInfo, setToggleMoreInfo] = useState(false);
  const clearGrade = [false, false, false, false, false];
  const [grader, setGrader] = useState<boolean[]>(clearGrade);
  const { id } = useParams()
  const handdleGrader = (level:number) => {
    setGrader(clearGrade);
    const grade: boolean[] = [false, false, false, false, false];
    for (let i:number = 0; i < level; i++) {
      grade[i] = true;
    }
    setGrader(grade);
  }

  useEffect(() => {
    handdleGrader(questionNisit.score);
  }, [])

  const deleteQuestion = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/nisit-question/${id}/${questionNisit.id}`, {
        headers: { "Content-Type": "applicatio/json" },
      })
      fetchQuestion()
    } catch (e) {

    }
  }

  const updateQuestion = async () => {
    let sum = 0;
    grader.forEach((item) => {if (item) {sum++}}) 
    let input = comment;
    if (input.trim() === "") input = "ไม่มีความคิดเห็น"
    let data = {comment: input, score: sum}
    try {
      const response = await axios.put(`http://localhost:8000/nisit-question/comment-score/${id}/${questionNisit.id}`, data, {
        headers: { "Content-Type": "applicatio/json" },
      })
      fetchQuestion();
    } catch(e) {
      console.log(e)
    }
  }

  const haddleTextarea = (value:any) => {
    setComment(value)
  }

  return (
    <article className="bg-white max-w-[750px] mx-auto mb-12 rounded-xl shadow-md min-[440px]:p-5 max-[440px]:p-3 font-medium relative">
      <Button isIconOnly className="absolute top-5 right-5 bg-transparent rounded-full" onClick={() => {
        deleteQuestion()
      }}>
        <Bin />
      </Button>
      <div className="flex gap-5 justify-start items-center max-[440px]:flex-col">
        <p className="font-bold text-xl text-[#3B434F]">ประเภทวัดคำถาม</p>
        <div className={clsx("border-[1px] py-2 px-9 rounded-xl ", {
          "text-red-400 border-red-400" : questionNisit.score == 0,
          "text-green-400 border-green-400" : questionNisit.score != 0,
        })}>
          {questionNisit.score == 0 ? "ยังไม่ได้ให้คะแนน" : questionNisit.score}
        </div>
      </div>
      <div className="text-white flex gap-3 mt-7">
        <button className="py-2 px-4 cursor-default bg-primary-400 rounded-xl">{questionNisit.question_type === "knowledge" ? "ความรู้" : "ทัศนคติ"}</button>
        <button className={clsx("py-2 px-4 cursor-default  rounded-xl", {
          "bg-red-400" : questionNisit.question_difficulty === "hard",
          "bg-yellow-400" : questionNisit.question_difficulty === "normal",
          "bg-green-400" : questionNisit.question_difficulty === "easy",
        })}>{questionNisit.question_difficulty === "hard" ? "ยาก" : questionNisit.question_difficulty === "normal" ? "ปานกลาง" : "ง่าย"}</button>
      </div>
      <section className="my-10">
        <p className="text-lg mb-4 font-bold text-[#3B434F]">คำถาม</p>
        <p className="leading-7 text-[#3B434F] font-normal">
          {questionNisit.question}
        </p>
      </section>
      <div className="flex justify-between w-full">
        <p className="font-bold text-lg text-[#3B434F]">รายละเอียดเพิ่มเติม</p>
        <button className={clsx("transition-all focus:outline-none border-none", {
          " rotate-180" : toggleMoreInfo
        })} onClick={() => {
          setToggleMoreInfo(!toggleMoreInfo);
          console.log("Test")
        }}>
          <AngleDown size={25} fill="#3B434F" className="cursor-pointer focus:outline-none"/>
        </button>
      </div>
      <div className={clsx("transition-all grid ", {
        " grid-rows-[1fr]" : toggleMoreInfo,
        " grid-rows-[0fr]" : !toggleMoreInfo,
      })}>
        <div className="overflow-hidden mt-4">
          <p className="leading-7 text-[#3B434F] font-normal">
            <span className="font-bold mr-4 text-[#3B434F]">คำตอบที่คาดหวัง:</span>{questionNisit.expected_ans}
          </p>
          <Textarea label="ความคิดเห็น" className={clsx("my-8 text-base font-normal",{
            " fixed opacity-0 pointer-events-none" : !editGrade
          })} classNames={{
              input: "text-base",
            }} value={comment} onValueChange={haddleTextarea}/>
          <p className={clsx("my-8 leading-7 font-normal", {
            " fixed opacity-0" : editGrade
          })}>
            <span className="font-bold mr-4 ">ความคิดเห็น:</span>{questionNisit.comment === "" ? "ไม่มีความคิดเห็น" : questionNisit.comment}
          </p>
          <div className="mt-10 ">
            <p className="font-bold text-lg text-[#3B434F]">ให้คะแนนคำถาม</p>
            <div className={clsx("flex justify-center items-center w-full max-[440px]:gap-1 min-[440px]:gap-5 mt-10", {
              " pointer-events-none" : !editGrade
            })}>
              <button className={clsx("circle-grader p-6", {
                " bg-primary outline outline-5 outline-offset-[-5px] outline-white" : grader[0],
              })} onClick={() => {
                handdleGrader(1);
              }}>
                <p className="absolute -top-7 text-zinc-400">ไม่ผ่าน</p>
              </button>
              <button className={clsx("circle-grader p-4", {
                " bg-primary outline outline-5 outline-offset-[-5px] outline-white" : grader[1] 
              })} onClick={() => {
                handdleGrader(2);
              }}></button>
              <button className={clsx("circle-grader p-3", {
                " bg-primary outline outline-5 outline-offset-[-5px] outline-white" : grader[2] 
              })} onClick={() => {
                handdleGrader(3);
              }}></button>
              <button className={clsx("circle-grader p-4", {
                " bg-primary outline outline-5 outline-offset-[-5px] outline-white" : grader[3] 
              })} onClick={() => {
                handdleGrader(4);
              }}></button>
              <button className={clsx("circle-grader p-6", {
                " bg-primary outline outline-5 outline-offset-[-5px] outline-white" : grader[4] 
              })} onClick={() => {
                handdleGrader(5);
              }}>
                  <p className="absolute -top-7 text-zinc-400 text-nowrap">ผ่าน</p>
              </button>
            </div>
            <div>
              <Button className={clsx("transition-all mt-7  rounded-lg  bg-primary text-white mx-auto block", {
                " fixed opacity-0" : editGrade
              })} onClick={() => {
                setEditGrade(true);
              }}>แก้ไขคะแนน</Button>
              <div className={clsx("transition-all mx-auto max-w-[300px] flex gap-5", {
                " fixed opacity-0" : !editGrade,
                " opacity-100" : editGrade
              })}>
                <Button className="w-full mt-7" color="primary" onClick={() => {
                  updateQuestion();
                  setEditGrade(false);
                }}>ยืนยัน</Button>
                <Button className="w-full mt-7 " color="primary" variant="bordered" onClick={() => {
                  setEditGrade(false);
                }}>ยกเลิก</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
