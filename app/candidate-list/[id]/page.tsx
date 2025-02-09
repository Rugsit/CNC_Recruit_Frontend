'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CandidateDetail from "@/app/candidate-list/[id]/candidate-detail/page";
import QuestionKnowledge from "@/app/candidate-list/[id]/question-knowledge/page";
import NavbarCandidate from '@/components/candidate-list/navbar-candidate';
import { CheckMark, XMark } from '@/components/icons';
import clsx from 'clsx';

export default function CandidateListId() {
    let timoutId: ReturnType<typeof setTimeout>;
    const [statusPopup, setStatusPopup] = useState({status : true, isShow: false});
    const { id } = useParams();
    const [pageIndex, setPageIndex] = useState(0);
    const CandidatePages = [<CandidateDetail profileUrl="https://loremflickr.com/640/480" fullname="Kerdsiri" />, <QuestionKnowledge currentIndex={pageIndex} setStatusPopup={setStatusPopup} />, <QuestionKnowledge currentIndex={pageIndex} setStatusPopup={setStatusPopup}/>];
    const onChangeIndex = (index: number) => {
        console.log(index);
        setPageIndex(index);
    };

    useEffect(() => {
        if (id) {
            console.log(id);
            // Fetch Candidate Detail by ID (From Database)
        }
    }, [id]);

    const ticklePopup = () => {
        clearTimeout(timoutId);
        timoutId = setTimeout(() => {
               setStatusPopup({status : statusPopup.status, isShow : false}) 
            }, 3000)
    }

    useEffect(() => {
        if (statusPopup.isShow) {
            ticklePopup();
        }
    }, [statusPopup])

    return (
        <div className="w-full max-w-[1500px] mx-auto flex flex-col gap-y-10 px-4 pt-32 ">
            <NavbarCandidate onChangeIndex={(index) => {onChangeIndex(index)}} />
            <button className={clsx("transition-all fixed bottom-5 right-5 flex bg-white shadow-lg p-5 gap-3 rounded-lg items-center justify-center cursor-default", {
                "translate-y-56 scale-80" : !statusPopup.isShow
            })} onClick={() => {
                ticklePopup();
            }}>
                {statusPopup.status ? <CheckMark width={40} height={40} /> : 
                <div className='bg-red-200 rounded-full p-2'>
                    <XMark width={30} height={30} fill="#D76363" />
                </div>}
                <p className={clsx('text-lg', {
                    "text-red-500" : !statusPopup.status,
                    "text-green-500" : statusPopup.status
                })}>{statusPopup.status ? "สร้างคำถามเสร็จเรียบร้อย" : "ไม่สามารถสร้างคำถามได้"}</p>
            </button>
            {CandidatePages[pageIndex]}
        </div>
    );
}
