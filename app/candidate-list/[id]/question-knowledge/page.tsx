import NavbarCandidate from "@/components/candidate-details/navbar-candidate";
import QuestionCard from "@/components/candidate-details/question-card";
import { Plus } from "@/components/icons";

export default function Page() {
  return (
    <main>
      <NavbarCandidate />
      <div className="relative text-4xl w-full max-lg:max-w-[750px] max-lg:mx-auto text-center text-primary my-10 flex max-lg:flex-col items-center justify-center">
        <p>
        คำถามห้องวัดความรู้
        </p>
        <div className="h-full lg:absolute flex lg:justify-end w-full items-center max-lg:justify-between gap-5 top-0 right-0 max-lg:mt-10" >
          <div className="bg-primary py-3 px-3 rounded-full cursor-pointer">
            <Plus size={24} fill="white"/>
          </div> 
          <button className="text-base bg-primary p-4 rounded-lg text-white">
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
