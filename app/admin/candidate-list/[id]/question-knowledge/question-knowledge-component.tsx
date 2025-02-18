'use client';

import { Button } from '@nextui-org/button';
import axios from 'axios';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Plus } from '@/components/icons';
import SelectQuestion from '@/components/candidate-list/select-question/select-question';
import QuestionCard from '@/components/candidate-list/question-card';
import AddQuestion from '@/components/candidate-details/add-question/add-question-popup';

type QuestionNisit = {
  id: string;
  question: string;
  question_type: string;
  expected_ans: string;
  question_difficulty: string;
  score: number;
  comment: string;
};

export type PopupType = {
  type: string;
  status: boolean;
  id: string;
  func?: () => Promise<void>;
};

export default function QuestionKnowledge({
  currentIndex,
  setStatusPopup,
}: {
  currentIndex: number;
  setStatusPopup: Dispatch<
    SetStateAction<{
      type: string;
      status: boolean;
      isShow: boolean;
    }>
  >;
}) {
  const [openSelectQuestion, setOpenSelectQuestion] = useState(false);
  const [openCreateQuestion, setOpenCreateQuestion] = useState<PopupType>({
    type: 'create',
    status: false,
    id: '',
  });
  const [questionNisit, setQuestionNisit] = useState<QuestionNisit[]>([]);
  const [errorMessage, setErrorMessage] = useState('ไม่พบคำถามของผู้สมัคร');
  const { id } = useParams();
  const { data } = useSession();

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/nisit-question/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data?.backendToken}`,
          },
        }
      );

      if (response.data == null) {
        throw new Error('Error: ' + response.status);
      }
      const newData = response.data.filter(
        (item: QuestionNisit) =>
          (item.question_type == 'knowledge' && currentIndex == 2) ||
          (item.question_type == 'attitude' && currentIndex == 1)
      );

      setQuestionNisit(newData);
    } catch (e) {
      setQuestionNisit([]);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [currentIndex]);

  useEffect(() => {
    if (openSelectQuestion) {
      document.body.style.overflow = 'hidden';
    } else if (openCreateQuestion.status) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [openSelectQuestion, openCreateQuestion.status]);

  return (
    <main>
      <div
        className={clsx(
          'transition-opacity fixed top-0 left-0 right-0 bottom-0 bg-black/[.5] z-50 flex justify-center items-center',
          {
            ' opacity-0 pointer-events-none': !openSelectQuestion,
            ' opacity-100 ': openSelectQuestion,
          }
        )}
      >
        <SelectQuestion
          currentIndex={currentIndex}
          fetchQuestionMain={fetchQuestion}
          isOpen={openSelectQuestion}
          setEditIsOpen={setOpenCreateQuestion}
          setIsOpen={setOpenSelectQuestion}
          setStatusPopup={setStatusPopup}
        />
      </div>
      <div
        className={clsx(
          'transition-opacity fixed top-0 left-0 right-0 bottom-0 bg-black/[.5] z-50 flex justify-center items-center',
          {
            ' opacity-0 pointer-events-none': !openCreateQuestion.status,
            ' opacity-100 ': openCreateQuestion.status,
          }
        )}
      >
        <AddQuestion
          isOpen={openCreateQuestion}
          setIsOpen={setOpenCreateQuestion}
          setStatusPopup={setStatusPopup}
        />
      </div>
      <div className='relative text-4xl w-full max-lg:max-w-[750px] max-lg:mx-auto text-center text-primary my-10 flex max-lg:flex-col items-center justify-center'>
        <p>{currentIndex == 2 ? 'คำถามวัดความรู้' : 'คำถามวัดทัศนคติ'}</p>
        <div className='h-full lg:absolute flex lg:justify-end w-full items-center max-lg:justify-between gap-5 top-0 right-0 max-lg:mt-10'>
          <Button
            isIconOnly
            className='bg-primary rounded-full cursor-pointer active:scale-85 hover:scale-95'
            size='lg'
            onClick={() => {
              setOpenCreateQuestion({
                type: 'create',
                status: true,
                id: openCreateQuestion.id,
              });
            }}
          >
            <Plus
              fill='white'
              size={24}
            />
          </Button>
          <Button
            className='text-base bg-primary p-6 rounded-lg text-white hover:scale-95'
            onClick={() => {
              setOpenSelectQuestion(true);
            }}
          >
            เลือกคำถามเพิ่มเติม
          </Button>
        </div>
      </div>
      {questionNisit.map((item) => {
        return (
          <QuestionCard
            key={item.id}
            fetchQuestion={fetchQuestion}
            questionNisit={item}
            setStatusPopup={setStatusPopup}
          />
        );
      })}
      {questionNisit.length == 0 ? (
        <div className='text-gray-400 text-3xl h-auto text-center w-full mt-20'>
          {errorMessage}
        </div>
      ) : (
        ''
      )}
    </main>
  );
}
