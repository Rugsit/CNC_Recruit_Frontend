'use client';

import InputText from '@/components/form/input-text';
import FileUpload from '@/components/form/file-upload';
import Textarea from '@/components/form/textarea';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import Image from 'next/image';
import ChevronLeftIcon from '@/public/form/chevron-left.svg';
import UploadImageIcon from '@/public/form/upload-image.svg';
import UploadFileIcon from '@/public/form/upload-file.svg';
import { registerForm } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

const INITIAL_STATE = {
    data: {
        nisitId: "",
        firstName: "",
        lastName: "",
        nickName: "",
        social: "",
        lineId: "",
        phoneNumber: "",
        address: "",
        mbti: "",
        club: "",
        skill: "",
        interest: "",
        project: "",
        tool: "",
        imageProfile: null,
        transcript: null
    },
    errors: null,
    message: null
};

export default function RegisterForm() {
    const router = useRouter();
    const [formState, formAction] = useFormState(registerForm , INITIAL_STATE);
    const errors = formState?.errors;
    
    return (
        <section>
            <Link href="/home" className="inline-flex items-center gap-x-2">
                <Image 
                    src={ChevronLeftIcon}
                    alt="chevron left logo"
                />
                <span className="py-6 text-base">
                    กลับสู่หน้าหลัก
                </span>
            </Link>
            <form action={formAction}>
                <div className="p-10 bg-white rounded-lg">
                    <div>
                        <h3 className="text-2xl pb-6 text-blue-400 font-bold">แบบฟอร์มสมัคร</h3>
                    </div>
                    <div>
                        <InputText name="nisitId" title="รหัสนิสิต" description="ตัวอย่าง: 67104xxxxx" error={errors?.nisitId} />
                        <InputText name="firstName" title="ชื่อจริง" description="ตัวอย่าง: สมชาย" error={errors?.firstName} />
                        <InputText name="lastName" title="นามสกุล" description="ตัวอย่าง: ใจจริง" error={errors?.lastName} />
                        <InputText name="nickName" title="ชื่อเล่น" description="ตัวอย่าง: ชาย" error={errors?.nickName} />
                        <InputText name="social" title="Facebook/IG" error={errors?.social} />
                        <InputText name="lineId" title="LINE ID" error={errors?.lineId} />
                        <InputText name="phoneNumber" title="เบอร์โทรศัพท์" error={errors?.phoneNumber} />
                        <InputText name="address" title="ที่อยู่อาศัยปัจจุบัน" description="หอใน, หอนอก, บ้าน" error={errors?.address} />
                        <InputText name="mbti" title="MBTI" description="ทำแบบทดสอบได้ที่: www.16personalities.com" error={errors?.mbti} />
                        <InputText name="club" title="ตอนนี้เป็นสมาชิกชมรม/แลป/สโมสรนิสิตอื่นๆหรือไม่?" error={errors?.club} />
                        <Textarea name="skill" title="มีความสามารถพิเศษอะไรบ้าง?" error={errors?.skill} />
                        <Textarea name="interest" title="มีความสนใจในเรื่องอะไรเป็นพิเศษ?" description="ตัวอย่าง: UX/UI, Web Dev, AI, Cloud, etc." error={errors?.interest} />
                        <Textarea name="project" title="โปรเจ็คที่เคยทำมีอะไรบ้าง?" error={errors?.project} />
                        <Textarea name="tool" title="Tools, Frameworks, Software ที่เคยใช้มีอะไรบ้าง?" error={errors?.tool} />
                        <FileUpload
                          name="imageProfile"
                          title="อัพโหลดรูปภาพ" 
                          description="ไฟล์ JPEG หรือ PNG ไม่เกิน 10MB เห็นใบหน้าชัดเจน"
                          accept=".png, .jpg, .jpeg"
                          error={errors?.imageProfile}
                          icon={{ src: UploadImageIcon, alt: "upload image icon" }}  
                        />
                        <FileUpload
                          name="transcript"
                          title="อัพโหลดใบรับรองผลการเรียน" 
                          description="ไฟล์​ PDF ขนาดไม่เกิน 10 MB"
                          accept=".pdf"
                          error={errors?.transcript}
                          icon={{ src: UploadFileIcon, alt: "upload file icon" }}  
                        />
                    </div>
                    <div className="flex flex-row gap-x-4">
                        <Button
                            onClick={() => router.push("/home")}
                            type="reset"
                            variant="bordered" 
                            className="grow border border-black md:text-xl text-base text-black font-medium"
                            >ยกเลิก
                        </Button>
                        <Button 
                            type="submit" 
                            variant="shadow" 
                            className="grow bg-black md:text-xl text-base text-white font-medium"
                            >ส่งใบสมัคร
                        </Button>
                    </div>
                </div>
            </form>
        </section>
    );
}