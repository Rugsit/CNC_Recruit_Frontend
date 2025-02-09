import { Bin, Pen } from "@/components/icons";
import { Button } from "@nextui-org/button";
import axios from "axios";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";


export default function QuestionCardShort ({question_type, diff, question, id, fetchQuestion, selectQuestion, setSelectQuestion} : {question_type : string, diff : string, question: string, id: string, fetchQuestion: () => Promise<void>, selectQuestion: string[], setSelectQuestion: Dispatch<SetStateAction<string[]>>}){
  const deleteQuestion = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/questions/${id}`, {
          headers: { "Content-Type": "application/json" },
      })
      let newArray = selectQuestion.filter((item) => item != id)
      setSelectQuestion(newArray)
      await fetchQuestion();
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <section className={clsx("bg-white p-3 border-[2px] shadow-md  rounded-lg font-normal cursor-pointer hover:scale-105 transition-all active:scale-100 text-balance", {
      "border-green-400" : selectQuestion.indexOf(id) != -1,
      "border-primary" : !(selectQuestion.indexOf(id) != -1)
    })} onClick={() => {
      let index = selectQuestion.indexOf(id);
      if (index != -1) {
        let newArray = selectQuestion.filter((item) => item != id)
        console.log(newArray)
        setSelectQuestion(newArray)
      } else {
        setSelectQuestion([...selectQuestion, id])
        console.log([...selectQuestion, id])
      }
    }}>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <p className="text-primary-600 ">{question_type == "knowledge" ? "ความรู้" : "ทัศนคติ"}</p>
          <button className={clsx(" border-1 py-1 px-3 rounded-lg", {
            "text-green-500 border-green-500" : diff == "easy",
            "text-yellow-500 border-yellow-500" : diff == "normal",
            "text-red-500 border-red-500" : diff == "hard",
          })} >{diff == "easy" ? "ง่าย" : diff == "normal" ? "ปานกลาง" : "ยาก"}</button>
        </div>
        <div className="flex gap-4">
          <Button isIconOnly className="text-primary-400 bg-transparent rounded-full" onClick={() => {

          }}>
            <Pen />
          </Button>
          <Button isIconOnly className="text-red-500 bg-transparent rounded-full" onClick={() => {
            deleteQuestion();
          }}>
            <Bin />
          </Button>
        </div>
      </div>
      <div className="mt-3 text-[#3B434F] text-left text-wrap">
        {question}
      </div>
    </section>
  );
}
