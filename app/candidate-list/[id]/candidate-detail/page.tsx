import TextField from '@/components/candidate-list/textfield';
import Image from 'next/image';
import { Button } from '@nextui-org/button';
import JudgeIcon from '@/public/cadidate-list/judge.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface CandidateDetail {
    nisitId: string,
    name: string,
    lastname: string,
    nickname: string,
    typeOfDpm: string,
    socialContact: string,
    phoneNumber: string,
    currentLiving: string,
    imageUrl: string,
    grade: number,
    expected: string,
    whyCnc: string,
    mbti: string,
    clubs: string,
    tools: string,
    projects: string,
    interests: string,
    hobbies: string,
    transcript: string,
    nisitYearParticipated: number,
};

export default function CandidateDetail() {
    const { id } = useParams();
    const { data, status } = useSession();
    const [candidateDetail, setCandidateDetail] = useState<CandidateDetail | null>(null);

    // console.log(`Token = ${data?.backendToken}`);

    const fetchApplication = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/nisit/id/${id}`, {
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${data?.backendToken}` }
            });

            // console.log(response.data);
            setCandidateDetail(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (status === "authenticated" && data?.backendToken) {
            // console.log(data);
            fetchApplication();
        }
    }, [status]);

    if (status === "loading") {
        return (
            <section className="flex flex-grow flex-col gap-y-5 justify-center items-center min-h-screen">
                <div className="w-16 h-16 border-5 border-[#42B5FC] border-t-transparent rounded-full animate-spin"></div>
                <h1 className="text-[#42B5FC] text-xl font-bold">
                    กำลังโหลดข้อมูลผู้สมัคร...
                </h1>
            </section>
        );
    } else if (!candidateDetail) {
        return (
            <section className="flex flex-grow flex-col gap-y-5 justify-center items-center min-h-screen">
                <div className="w-16 h-16 flex justify-center items-center text-[#42B5FC]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-16 h-16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <h1 className="text-[#42B5FC] text-xl font-bold">
                    ไม่พบข้อมูลผู้สมัคร
                </h1>
            </section>
        );
    } else {
        return (
            <section className="flex flex-col gap-y-5 items-center">
                <h3 className="text-xl md:text-3xl font-bold text-[#1d9fee]">แบบฟอร์มสมัคร</h3>
                <Image
                    src={`/${candidateDetail?.imageUrl}`}
                    alt="profile-image"
                    width={150}
                    height={150}
                    className="aspect-square rounded-full shadow-md"
                />
                <h3 className="text-xl md:text-3xl font-bold text-[#1d9fee]">{`${candidateDetail?.name} ${candidateDetail?.lastname}`}</h3>
                <Button
                    startContent={<Image src={JudgeIcon} alt="judge-icon" className="w-8" />}
                    className="w-full md:w-auto bg-[#1d9fee] text-white text-md md:text-lg">
                    ตัดสิน
                </Button>
                <div className="flex flex-col gap-y-3 my-3 w-full">
                    <TextField header='รหัสนิสิต:' value={`${candidateDetail?.nisitId}`} />
                    <TextField header='ชื่อ-นามสกุล:' value={`${candidateDetail?.name} ${candidateDetail?.lastname}`} />
                    <TextField header="ชื่อเล่น:" value={`${candidateDetail?.nickname}`} />
                    <TextField header="ภาค:" value={`${candidateDetail?.typeOfDpm === "normal" ? "ปกติ" : "พิเศษ"}`} />
                    <TextField header="ปีการศึกษา:" value={`${candidateDetail?.nisitYearParticipated}`} />
                    <TextField header="เกรดเฉลี่ยรวม:" value={`${candidateDetail?.grade}`} />
                    <TextField header="บัญชีโซเชียล:" value={`${candidateDetail?.socialContact}`} />
                    <TextField header="เบอร์โทรศัพท์:" value={`${candidateDetail?.phoneNumber}`} />
                    <TextField header="ที่อยู่อาศัยปัจจุบัน:" value={`${candidateDetail?.currentLiving}`} />
                    <TextField header="MBTI:" value={`${candidateDetail?.mbti}`} />
                    <TextField header="ตอนนี้เป็นสมาชิกชมรม/แลป/สโมสรนิสิต:" value={`${candidateDetail?.clubs}`} />
                    <TextField header="มีความสนใจในเรื่อง:" value={`${candidateDetail?.interests}`} />
                    <TextField header="งานอดิเรกที่ชอบทำ:" value={`${candidateDetail?.hobbies}`} />
                    <TextField header="ทำไมถึงสมัคร CNC:" value={`${candidateDetail?.whyCnc}`} />
                    <TextField header="มีความคาดหวังอย่างไรกับ CNC?:" value={`${candidateDetail?.expected}`} />
                    <TextField header="โปรเจ็คที่เคยทำ:" value={`${candidateDetail?.projects}`} />
                    <TextField header="Tools, Frameworks, Software ที่เคยใช้:" value={`${candidateDetail?.tools}`} />
                </div>
            </section>
        );
    }
}
