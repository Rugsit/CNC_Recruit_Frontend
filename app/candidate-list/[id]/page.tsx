'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CandidateDetail from "@/app/candidate-list/[id]/candidate-detail/page";
import QuestionKnowledge from "@/app/candidate-list/[id]/question-knowledge/page";
import NavbarCandidate from '@/components/candidate-list/navbar-candidate';

export default function CandidateListId() {
    const { id } = useParams();
    const CandidatePages = [<CandidateDetail profileUrl="https://loremflickr.com/640/480" fullname="Kerdsiri" />, <QuestionKnowledge />, <QuestionKnowledge />];
    const [pageIndex, setPageIndex] = useState(0);
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

    return (
        <div className="w-full max-w-[1500px] mx-auto flex flex-col gap-y-10 px-4 pt-32">
            <NavbarCandidate onChangeIndex={(index) => {onChangeIndex(index)}} />
            {CandidatePages[pageIndex]}
        </div>
    );
}
