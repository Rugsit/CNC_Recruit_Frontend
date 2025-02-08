import TextField from '@/components/candidate-list/textfield';
import Image from 'next/image';
import { Button } from '@nextui-org/button';
import JudgeIcon from '@/public/cadidate-list/judge.svg';

interface CandidateDetailProps {
    profileUrl: string,
    fullname: string,
};

export default function CandidateDetail({ profileUrl, fullname } : CandidateDetailProps) {
    return (
            <section className="flex flex-col gap-y-5 items-center">
                <h3 className="text-xl md:text-3xl font-bold text-[#1d9fee]">แบบฟอร์มสมัคร</h3>
                <Image 
                    src={profileUrl} 
                    alt="profile-image" 
                    width={150}
                    height={150}
                    className="aspect-square rounded-full"
                />
                <h3 className="text-xl md:text-3xl font-bold text-[#1d9fee]">{fullname}</h3>
                <Button 
                    startContent={<Image src={JudgeIcon} alt="judge-icon" className="w-8"/>} 
                    className="w-full md:w-auto bg-[#1d9fee] text-white text-md md:text-lg">
                    ตัดสิน
                </Button>
                <div className="flex flex-col gap-y-3 my-3 w-full">
                    <TextField header='อีเมลล์ (ku.th):' value='Value' />
                    <TextField header='รหัสนิสิต:' value='Value' />
                    <TextField header='ชื่อ-นามสกุล:' value='Value' />
                    <TextField header="ช่อเล่น:" value='Value' />
                    <TextField header="Facebook/IG:" value='Value' />
                    <TextField header="LINE ID:" value='Value' />
                    <TextField header="เบอร์โทรศัพท์:" value='Value' />
                    <TextField header="ที่อยู่อาศัยปัจจุบัน:" value='Value' />
                    <TextField header="MBTI:" value='Value' />
                    <TextField header="ตอนนี้เป็นสมาชิกชมรม/แลป/สโมสรนิสิต:" value='Value' />
                    <TextField header="มีความสามารถพิเศษ:" value='Value' />
                    <TextField header="มีความสนใจในเรื่อง:" value='Value' />
                    <TextField header="โปรเจ็คที่เคยทำ:" value='Value' />
                    <TextField header="Tools, Frameworks, Software ที่เคยใช้:" value='Value' />
                </div>
            </section>
    )
}
