'use client';
import { Button } from '@nextui-org/button';
import axios from 'axios';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { XMark } from '@/components/icons';
import { env } from 'next-runtime-env';

type FormField = {
  question: string;
  question_type: string;
  expected_ans: string;
  question_difficulty: string;
};
type FormFieldPut = {
  question: string;
  question_type: string;
  expected_ans: string;
  question_difficulty: string;
  id: string;
};
type PopupType = {
  type: string;
  status: boolean;
  id: string;
  func?: () => Promise<void>;
};

export default function AddQuestion({
  isOpen,
  setIsOpen,
  setStatusPopup,
}: {
  isOpen: PopupType;
  setIsOpen: Dispatch<SetStateAction<PopupType>>;
  setStatusPopup: Dispatch<
    SetStateAction<{
      type: string;
      status: boolean;
      isShow: boolean;
    }>
  >;
}) {
  const refForm = useRef(null);
  const { data } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormField>();

  const targetQuestionEdit = async () => {
    try {
      const response = await axios.get(
        env('NEXT_PUBLIC_API_URL') + `/questions/${isOpen.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data?.backendToken}`,
          },
        }
      );
      const dataEdit = response.data;
      const newData = {
        question: dataEdit.question,
        question_type: dataEdit.question_type,
        expected_ans: dataEdit.expected_ans,
        question_difficulty: dataEdit.question_difficulty,
      };

      reset(newData);
    } catch (e) {}
  };

  useEffect(() => {
    if (isOpen.type == 'edit' && isOpen.status) {
      targetQuestionEdit();
    } else if (!isOpen.status) {
      const newData = {
        question: '',
        question_type: 'attitude',
        expected_ans: '',
        question_difficulty: 'easy',
      };

      reset(newData);
    }
  }, [isOpen]);

  const onSubmit: SubmitHandler<FormField> = async (dataForm) => {
    try {
      try {
        if (isOpen.type === 'create') {
          const response = await axios.post(
            env('NEXT_PUBLIC_API_URL') + '/questions',
            dataForm,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data?.backendToken}`,
              },
            }
          );

          setStatusPopup({ type: 'create', status: true, isShow: true });
        }
      } catch (e) {
        throw new Error('create');
      }
      if (isOpen.type === 'edit') {
        let newData = dataForm as FormFieldPut;

        newData.id = isOpen.id;
        const response = await axios.put(
          env('NEXT_PUBLIC_API_URL') + `/questions/${isOpen.id}`,
          newData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${data?.backendToken}`,
            },
          }
        );

        if (isOpen.func) isOpen.func();
        setStatusPopup({ type: 'edit', status: true, isShow: true });
      }
    } catch (e: any) {
      if (e.message == 'create') {
        setStatusPopup({ type: 'create', status: false, isShow: true });
      } else {
        setStatusPopup({ type: 'edit', status: false, isShow: true });
      }
    }
    reset();
    setIsOpen({ type: isOpen.type, status: false, id: isOpen.id });
  };

  return (
    <section
      className={clsx(
        'transition-all relative bg-white rounded-lg p-12 max-w-[500px] w-full text-[#3B434F] m-[20px] ',
        {
          ' scale-100': isOpen.status,
          ' scale-90': !isOpen.status,
        }
      )}
    >
      <p className='text-2xl text-center mb-4'>
        {isOpen.type === 'edit' ? 'แก้ไขคำถาม' : 'เพิ่มคำถาม'}
      </p>
      <XMark
        className='w-5 absolute top-[15px] right-[15px] cursor-pointer'
        fill='#42B5FC'
        onClick={() => {
          setIsOpen({ type: isOpen.type, status: false, id: isOpen.id });
        }}
      />
      <form
        ref={refForm}
        className='flex flex-col'
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          className='text-lg mb-3'
          htmlFor='question'
        >
          คำถาม
        </label>
        <textarea
          id='question'
          {...register('question', {
            required: 'กรุณากรอกคำถาม',
          })}
          className='p-4 border-primary border-[1px] rounded-lg focus:outline-none h-28 font-normal max-h-[170px]'
        />
        {errors.question && (
          <p className='text-red-400 font-normal mt-1'>
            {'*' + errors.question.message}
          </p>
        )}
        <label
          className='text-lg mt-3 mb-3'
          htmlFor='expected_ans'
        >
          คำตอบที่คาดหวัง
        </label>
        <textarea
          id='expected_ans'
          {...register('expected_ans', {
            required: 'กรุณากรอกคำตอบ',
          })}
          className='p-4 border-primary border-[1px] rounded-lg focus:outline-none h-28 font-normal max-h-[170px]'
        />
        {errors.expected_ans && (
          <p className='text-red-400 font-normal mt-1'>
            {'*' + errors.expected_ans.message}
          </p>
        )}
        <div className='flex gap-5 items-center justify-center mt-5 max-[478px]:grid'>
          <div className='flex items-center'>
            <p>ความยาก</p>
            <select
              {...register('question_difficulty')}
              className='px-5 py-2 bg-blue-100 text-blue-500 text-center rounded-lg appearance-none focus:outline-none ml-3 font-normal'
            >
              <option value='hard'>ยาก</option>
              <option value='normal'>กลาง</option>
              <option value='easy'>ง่าย</option>
            </select>
          </div>
          <div className='flex items-center'>
            <p className=''>ประเภท</p>
            <select
              {...register('question_type')}
              className='px-5 py-2 bg-blue-100 text-blue-500 text-center font-normal rounded-lg appearance-none focus:outline-none ml-3'
            >
              <option value='knowledge'>วัดความรู้</option>
              <option value='attitude'>วัดทัศนคติ</option>
            </select>
          </div>
        </div>
        <div className='flex justify-center items-center gap-5 mt-10'>
          <Button
            className='bg-red-400 text-white w-full h-11 text-xl'
            onClick={async () => {
              setIsOpen({ type: isOpen.type, status: false, id: isOpen.id });
            }}
          >
            ยกเลิก
          </Button>
          <Button
            className='bg-primary text-white w-full h-11 text-xl'
            type='submit'
            onClick={() => {}}
          >
            ยืนยัน
          </Button>
        </div>
      </form>
    </section>
  );
}
