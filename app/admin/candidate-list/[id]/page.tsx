'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import CandidateDetail from '@/app/admin/candidate-list/[id]/candidate-detail/page';
import QuestionKnowledge from '@/app/admin/candidate-list/[id]/question-knowledge/question-knowledge-component';
import NavbarCandidate from '@/components/candidate-list/navbar-candidate';
import { CheckMark, XMark } from '@/components/icons';

export interface StatusPopUpProps {
  type: string;
  status: boolean;
  isShow: boolean;
}

export default function CandidateListId() {
  let timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [statusPopup, setStatusPopup] = useState<StatusPopUpProps>({
    type: 'create',
    status: true,
    isShow: false,
  });
  const [pageIndex, setPageIndex] = useState(0);
  const CandidatePages = [
    <CandidateDetail key={0} />,
    <QuestionKnowledge
      key={1}
      currentIndex={pageIndex}
      setStatusPopup={setStatusPopup}
    />,
    <QuestionKnowledge
      key={2}
      currentIndex={pageIndex}
      setStatusPopup={setStatusPopup}
    />,
  ];
  const onChangeIndex = (index: number) => {
    setPageIndex(index);
  };

  const ticklePopup = () => {
    if (timeoutRef.current != null) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setStatusPopup({
        type: statusPopup.type,
        status: statusPopup.status,
        isShow: false,
      });
    }, 3000);
  };

  useEffect(() => {
    if (statusPopup.isShow) {
      ticklePopup();
    }
  }, [statusPopup]);

  return (
    <div className='w-full max-w-[1500px] mx-auto flex flex-col gap-y-10 px-4 pt-32 '>
      <NavbarCandidate
        onChangeIndex={(index) => {
          onChangeIndex(index);
        }}
      />
      <button
        className={clsx(
          'transition-all fixed bottom-5 right-5 flex bg-white shadow-lg p-5 gap-3 rounded-lg items-center justify-center cursor-default z-50',
          {
            'translate-y-56 scale-80': !statusPopup.isShow,
          }
        )}
        onClick={() => {
          ticklePopup();
        }}
      >
        {statusPopup.status ? (
          <CheckMark
            height={40}
            width={40}
          />
        ) : (
          <div className='bg-red-200 rounded-full p-2'>
            <XMark
              fill='#D76363'
              height={30}
              width={30}
            />
          </div>
        )}
        <p
          className={clsx('text-lg', {
            'text-red-500': !statusPopup.status,
            'text-green-500': statusPopup.status,
          })}
        >
          {(statusPopup.type == 'create'
            ? 'สร้างคำถาม'
            : statusPopup.type == 'edit'
              ? 'แก้ไขคำถาม'
              : statusPopup.type == 'delete'
                ? 'ลบคำถาม'
                : statusPopup.type == 'scored'
                  ? 'ประเมินผล'
                  : 'เพิ่มคำถาม') +
            (statusPopup.status ? 'สำเร็จ' : 'ไม่สำเร็จ')}
        </p>
      </button>
      {CandidatePages[pageIndex]}
    </div>
  );
}
