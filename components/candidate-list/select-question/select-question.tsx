'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { Button } from '@nextui-org/button';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import QuestionCardShort from './question-card-short';

import { PopupType } from '@/app/candidate-list/[id]/question-knowledge/page';
import { SearchIcon, XMark } from '@/components/icons';

type FormField = {
  question: string;
  question_type: string;
  expected_ans: string;
  question_difficulty: string;
};
type QuestionData = {
  question: string;
  question_type: string;
  expected_ans: string;
  question_difficulty: string;
  id: string;
};

const DifficultyLevel: Record<string, number> = {
  easy: 1,
  normal: 2,
  hard: 3,
};

export default function SelectQuestion({
  isOpen,
  setIsOpen,
  currentIndex,
  fetchQuestionMain,
  setEditIsOpen,
  setStatusPopup,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  currentIndex: number;
  fetchQuestionMain: () => Promise<void>;
  setEditIsOpen: Dispatch<SetStateAction<PopupType>>;
  setStatusPopup: Dispatch<
    SetStateAction<{ type: string; status: boolean; isShow: boolean }>
  >;
}) {
  const [questFilter, setQuestFilter] = useState<Array<QuestionData>>([]);
  const [question, setQuestion] = useState<Array<QuestionData>>([]);
  const [selectQuestion, setSelectQuestion] = useState<Array<string>>([]);
  const { data } = useSession();
  const [errorMessage, setErrorMessage] = useState(
    'ไม่พบคำถามที่สามารถเพิ่มได้'
  );
  const { id } = useParams();

  const search = (event: any) => {
    if (event.target.value == '') {
      setQuestFilter(question);

      return;
    }
    let filQuestion = question.filter((item) =>
      item.question.includes(event.target.value)
    );

    setQuestFilter(filQuestion);
  };

  const addQuestNisit = async () => {
    try {
      selectQuestion.forEach(async (item) => {
        const response = await axios.post(
          `http://localhost:8000/nisit-question/${id}/${item}`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${data?.backendToken}`,
            },
          }
        );

        if (selectQuestion.length != 0) {
          await fetchQuestion();
          await fetchQuestionMain();
          setStatusPopup({ type: 'add', status: true, isShow: true });
        }
      });
    } catch (e) {
      setStatusPopup({ type: 'add', status: false, isShow: true });
    }
  };

  const fetchQuestion = async () => {
    try {
      const questionResponse = await axios.get(
        'http://localhost:8000/questions/',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data?.backendToken}`,
          },
        }
      );
      const Nisitresponse = await axios.get(
        `http://localhost:8000/nisit-question/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data?.backendToken}`,
          },
        }
      );
      let nisitdata = Nisitresponse.data;
      let questionData = questionResponse.data.sort(
        (a: QuestionData, b: QuestionData) =>
          DifficultyLevel[a.question_difficulty] -
          DifficultyLevel[b.question_difficulty]
      );

      let filterData = questionData.filter(
        (item: QuestionData) =>
          (item.question_type === 'knowledge' && currentIndex === 2) ||
          (item.question_type === 'attitude' && currentIndex === 1)
      );

      if (Nisitresponse.data == null) {
        setQuestFilter(filterData);
        setQuestion(filterData);

        return;
      }
      let newData = filterData.filter((item: any) => {
        let check = true;

        for (let i of nisitdata) {
          if (i.id === item.id) check = false;
        }
        if (check) return item;
      });

      setQuestion(newData);
      setQuestFilter(newData);
    } catch (e: any) {
      setQuestion([]);
      setQuestFilter([]);
      setErrorMessage('ไม่สามารถดึงข้อมูลจากฐานข้อมูลได้ ' + e.status);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [isOpen]);

  return (
    <div
      className={clsx(
        'transition-all my-[40px] max-h-[600px] h-full w-full max-w-[700px] mx-[40px] bg-white shadow-md rounded-lg pl-5 pb-5 pr-5 pt-7  relative box-border',
        {
          ' scale-100': isOpen,
          ' scale-90': !isOpen,
        }
      )}
    >
      <XMark
        className='w-5 absolute top-[25px] right-[20px] cursor-pointer'
        fill='#42B5FC'
        onClick={() => {
          setSelectQuestion([]);
          setIsOpen(false);
        }}
      />
      <p className='text-2xl text-center text-[#3B434F]'>
        เลือก{currentIndex == 1 ? 'คำถามวัดทัศนคติ' : 'คำถามวัดความรู้'}
      </p>
      <div className='relative w-full max-w-[400px] mx-auto flex items-center mt-5'>
        <input
          className='font-normal w-full px-10 py-2 shadow-md rounded-full mx-auto block focus:outline-primary'
          onChange={search}
        />
        <SearchIcon className='absolute left-3 text-zinc-500' />
      </div>
      <div className='mt-6'>
        <div className=''>
          <div className='flex justify-end items-center'>
            <Button
              className='text-white bg-green-400 font-normal text-md active:scale-90'
              onClick={async () => {
                await addQuestNisit();
                setSelectQuestion([]);
                setIsOpen(false);
              }}
            >
              เพิ่มคำถาม
            </Button>
          </div>
          <div className='  gap-4 px-4 py-2 mt-5 flex flex-col max-h-[380px] overflow-y-auto'>
            {questFilter.map((item, index) => {
              return (
                <QuestionCardShort
                  key={item.id}
                  diff={item.question_difficulty}
                  fetchQuestion={fetchQuestion}
                  id={item.id}
                  question={item.question}
                  question_type={item.question_type}
                  selectQuestion={selectQuestion}
                  setEditIsOpen={setEditIsOpen}
                  setSelectQuestion={setSelectQuestion}
                  setStatusPopup={setStatusPopup}
                />
              );
            })}
            {questFilter.length == 0 ? (
              <div className='text-gray-400 text-normal text-2xl text-center flex items-center justify-center my-auto h-[200px] lg:text-3xl'>
                {errorMessage}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
