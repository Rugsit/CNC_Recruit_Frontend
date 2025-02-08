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
import { useRouter } from 'next/navigation';
import { formSchema, FormFields } from '@/app/lib/validations/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import FormModal from '@/components/form/form-modal';

interface ApplicationForm {
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
    interest: string,
    hobbies: string,
    transcript: string,
    nisitYearParticipated: number,
};

export default function RegisterForm() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        trigger
    } = useForm<FormFields>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormFields) => {
        const application: ApplicationForm = {
            nisitId: data.nisitId || "",
            name: data.name || "",
            lastname: data.lastname || "",
            nickname: data.nickname || "",
            typeOfDpm: data.typeOfDpm || "", // This is ENUM
            socialContact: data.socialContact || "",
            phoneNumber: data.phoneNumber || "",
            currentLiving: data.currentLiving || "",
            imageUrl: "URL OF NISIT-IMAGE", // No field available yet
            grade: data.grade ? parseFloat(data.grade.toString()) : 0.0,
            expected: data.expected || "",
            whyCnc: data.whyCnc || "",
            mbti: data.mbti || "",
            clubs: data.clubs || "",
            tools: data.tools || "",
            projects: data.projects || "",
            interest: data.interest || "",
            hobbies: data.hobbies || "",
            transcript: "URL OF TRANSCRIPT-PDF", // No field available yet
            nisitYearParticipated: data.nisitYearParticipated ? parseInt(data.nisitYearParticipated.toString()) : new Date().getFullYear(),
        };

        // console.log(application); // Debugging

        try {
            const response = await axios.post("http://localhost:8000/app", application, {
                headers: { "Content-Type": "application/json" },
            });
            // console.log("Response:", response.data);
            setSuccess(true);
            setModalVisible(true);
        } catch (error) {
            // console.error("Submission failed:", error);
            setSuccess(false);
            setModalVisible(true);
        }
    };

    return (
        <section className="w-full px-8 mt-32 mb-12">
            <Link href="/home" className="inline-flex gap-x-2 items-center">
                <Image
                    src={ChevronLeftIcon}
                    alt="chevron left logo"
                />
                <span className="py-6 text-base">
                    กลับสู่หน้าหลัก
                </span>
            </Link>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-y-5 px-10 py-3 bg-white rounded-lg shadow-lg">
                    <div>
                        <h3 className="md:text-2xl text-xl mt-5 text-blue-400 font-bold">แบบฟอร์มสมัคร</h3>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <InputText title="รหัสนิสิต" register={register("nisitId")} errorMessage={errors.nisitId?.message} />
                        <InputText title="ชื่อจริง" description="(ไม่ต้องมีคำนำหน้า)" register={register("name")} errorMessage={errors.name?.message} />
                        <InputText title="นามสกุล" register={register("lastname")} errorMessage={errors.lastname?.message} />
                        <InputText title="ชื่อเล่น" register={register("nickname")} errorMessage={errors.nickname?.message} />
                        <InputText title="ภาค" description="(ปกติ, พิเศษ)" register={register("typeOfDpm")} errorMessage={errors.typeOfDpm?.message} />
                        <InputText title="ปีการศึกษา" description="(2566, 2567)" register={register("nisitYearParticipated")} errorMessage={errors.nisitYearParticipated?.message} />
                        <InputText title="เกรดเฉลี่ยรวม" register={register("grade")} errorMessage={errors.grade?.message} />
                        <InputText title="Facebook/IG" register={register("socialContact")} errorMessage={errors.socialContact?.message} />
                        <InputText title="เบอร์โทรศัพท์" register={register("phoneNumber")} errorMessage={errors.phoneNumber?.message} />
                        <InputText title="ที่อยู่อาศัยปัจจุบัน" register={register("currentLiving")} description="(หอใน, หอนอก, บ้าน)" errorMessage={errors.currentLiving?.message} />
                        <InputText title="MBTI" register={register("mbti")} errorMessage={errors.mbti?.message} />
                        <Textarea title="ตอนนี้เป็นสมาชิกชมรม/แลป/สโมสรนิสิตอื่นๆหรือไม่?" register={register("clubs")} errorMessage={errors.clubs?.message} />
                        <Textarea title="มีความสามารถพิเศษอะไรบ้าง?" register={register("skill")} errorMessage={errors.skill?.message} />
                        <Textarea title="มีความสนใจในเรื่องอะไร?" description="(ผม/หนู สนใจในเรื่อง UX/UI, Cloud, AI, WebDev, MobileDev, etc.)" register={register("interest")} errorMessage={errors.interest?.message} />
                        <Textarea title="งานอดิเรกที่ชอบทำ?" register={register("hobbies")} errorMessage={errors.hobbies?.message} />
                        <Textarea title="ทำไมถึงสมัคร CNC?" register={register("whyCnc")} errorMessage={errors.whyCnc?.message} />
                        <Textarea title="มีความคาดหวังอย่างไรกับ CNC?" register={register("expected")} errorMessage={errors.expected?.message} />
                        <Textarea title="โปรเจ็คที่เคยทำมีอะไรบ้าง?" register={register("projects")} errorMessage={errors.projects?.message} />
                        <Textarea title="Tools, Frameworks, Softwares ที่เคยใช้มีอะไรบ้าง?" register={register("tools")} errorMessage={errors.tools?.message} />
                        <FileUpload
                            title="อัพโหลดรูปภาพ"
                            description="ไฟล์ JPEG หรือ PNG ไม่เกิน 10MB เห็นใบหน้าชัดเจน"
                            accept=".png, .jpg, .jpeg"
                            register={register("imageUrl")}
                            errorMessage={errors.imageUrl?.message?.toString()}
                            icon={{ src: UploadImageIcon, alt: "upload-image-icon" }}
                            setValue={setValue}
                            trigger={trigger}
                        />
                        <FileUpload
                            title="อัพโหลดใบรับรองผลการเรียน"
                            description="ไฟล์​ PDF ขนาดไม่เกิน 10 MB"
                            accept=".pdf"
                            register={register("transcript")}
                            errorMessage={errors.transcript?.message?.toString()}
                            icon={{ src: UploadFileIcon, alt: "upload-file-icon" }}
                            setValue={setValue}
                            trigger={trigger}
                        />
                    </div>
                    <div className="flex flex-row gap-x-4 mb-5">
                        <Button
                            onClick={() => router.push("/home")}
                            disabled={isSubmitting}
                            type="reset"
                            variant="bordered"
                            className="grow border border-black md:text-xl text-base text-black font-medium"
                        >ยกเลิก
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            variant="shadow"
                            className="grow bg-black md:text-xl text-base text-white font-medium"
                        >ส่งใบสมัคร
                        </Button>
                    </div>
                </div>
            </form>
            <FormModal 
                title={isSuccess ? "ยื่นใบสมัครสำเร็จ" : "ยื่นใบสมัครไม่สำเร็จ"} 
                desc={isSuccess ? "โปรดเลือกนัดหมายสำหรับสัมภาษณ์" : "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง"} 
                isSuccess={isSuccess} 
                isVisible={isModalVisible} 
                onClose={
                    () => { 
                        setModalVisible(false); 
                        router.push('/home'); 
                    }
                } 
            />
        </section>
    );
}