'use client';

import InputText from '@/components/form/input-text';
import FileUpload from '@/components/form/file-upload';
import InputTextArea from '@/components/form/input-textarea';
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
import { useEffect, useState } from 'react';
import FormModal from '@/components/form/form-modal';
import SelectInput from '@/components/form/select-input';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';

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
    interests: string,
    hobbies: string,
    transcriptUrl: string,
    nisitYearParticipated: number,
};

export default function RegisterForm() {
    const [applicationForm, setApplicationForm] = useState<ApplicationForm | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { data, status } = useSession();
    // console.log(`Token = ${data?.backendToken}`);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        trigger,
        reset,
    } = useForm<FormFields>({
        resolver: zodResolver(formSchema),
        defaultValues: applicationForm || {},
    });

    const fetchingApplication = async () => {
        try {
            const response = await axios.get("http://localhost:8000/nisit", {
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${data?.backendToken}` }
            });
            // console.log(response.data);
            setApplicationForm(response.data);
            reset(response.data);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (status === "authenticated" && data?.backendToken) { // Wait until data is already fetched
            fetchingApplication();
        }
    }, [status, data?.backendToken]);

    const onSubmit = async (formData: FormFields) => {
        try {
            const method = applicationForm ? "PUT" : "POST";
            const url = applicationForm ? `http://localhost:8000/nisit/` : "http://localhost:8000/app";

            const payload = {
                ...formData,
                nisitYearParticipated: Number(formData.nisitYearParticipated),
                grade: Number(formData.grade),
            };

            const response = await axios({
                method,
                url,
                data: payload,
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${data?.backendToken}` },
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

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex flex-col gap-y-5 justify-center items-center">
                <div className="w-16 h-16 border-5 border-[#42B5FC] border-t-transparent rounded-full animate-spin"></div>
                <h1 className="text-[#42B5FC] text-xl font-bold">
                    กำลังโหลดรายการผู้สมัคร...
                </h1>
            </div>
        );
    } else {
        return (
            <section className="mx-auto max-w-[1100px] px-8 mt-32 mb-12">
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
                            <InputText title="ชื่อจริง" desc="(ไม่ต้องมีคำนำหน้า)" register={register("name")} errorMessage={errors.name?.message} />
                            <InputText title="นามสกุล" register={register("lastname")} errorMessage={errors.lastname?.message} />
                            <InputText title="ชื่อเล่น" register={register("nickname")} errorMessage={errors.nickname?.message} />
                            <SelectInput title="ภาค" options={[{ value: 'normal', label: 'ปกติ' }, { value: 'special', label: 'พิเศษ' }]} register={register("typeOfDpm")} />
                            <SelectInput title="ปีการศึกษา" options={[{ value: 84, label: '84' }]} register={register("nisitYearParticipated", { valueAsNumber: true })} />
                            <InputText title="เกรดเฉลี่ยรวม" register={register("grade")} errorMessage={errors.grade?.message} />
                            <InputText title="ที่อยู่อาศัยปัจจุบัน" desc="(หอใน, หอนอก, บ้าน)" register={register("currentLiving")} errorMessage={errors.currentLiving?.message} />
                            <InputText title="MBTI" register={register("mbti")} errorMessage={errors.mbti?.message} />
                            <InputText title="เบอร์โทรศัพท์" register={register("phoneNumber")} errorMessage={errors.phoneNumber?.message} />
                            <InputTextArea title="บัญชีโซเชียล" desc="Facebook, Instagram, LineID หรือ Discord" register={register("socialContact")} errorMessage={errors.socialContact?.message} />
                            <InputTextArea title="ตอนนี้เป็นสมาชิกชมรม/แลป/สโมสรนิสิตอื่นๆหรือไม่?" register={register("clubs")} errorMessage={errors.clubs?.message} />
                            <InputTextArea title="มีความสนใจในเรื่องอะไร?" desc="(ผม/หนู สนใจในเรื่อง UX/UI, Cloud, AI, WebDev, MobileDev, etc.)" register={register("interests")} errorMessage={errors.interests?.message} />
                            <InputTextArea title="งานอดิเรกที่ชอบทำ?" register={register("hobbies")} errorMessage={errors.hobbies?.message} />
                            <InputTextArea title="ทำไมถึงสมัคร CNC?" register={register("whyCnc")} errorMessage={errors.whyCnc?.message} />
                            <InputTextArea title="มีความคาดหวังอย่างไรกับ CNC?" register={register("expected")} errorMessage={errors.expected?.message} />
                            <InputTextArea title="โปรเจ็คที่เคยทำมีอะไรบ้าง?" register={register("projects")} errorMessage={errors.projects?.message} />
                            <InputTextArea title="Tools, Frameworks, Softwares ที่เคยใช้มีอะไรบ้าง?" register={register("tools")} errorMessage={errors.tools?.message} />
                            <FileUpload
                                title="อัพโหลดรูปภาพ"
                                description="ไฟล์ JPEG หรือ PNG ไม่เกิน 10MB เห็นใบหน้าชัดเจน"
                                accept=".png, .jpg, .jpeg"
                                register={register("imageUrl")}
                                errorMessage={errors.imageUrl?.message?.toString()}
                                icon={{ src: UploadImageIcon, alt: "upload-image-icon" }}
                                setValue={setValue}
                                trigger={trigger}
                                existedFileName={applicationForm?.imageUrl}
                            />
                            <FileUpload
                                title="อัพโหลดใบรับรองผลการเรียน"
                                description="ไฟล์​ PDF ขนาดไม่เกิน 10 MB"
                                accept=".pdf"
                                register={register("transcriptUrl")}
                                errorMessage={errors.transcriptUrl?.message?.toString()}
                                icon={{ src: UploadFileIcon, alt: "upload-file-icon" }}
                                setValue={setValue}
                                trigger={trigger}
                                existedFileName={applicationForm?.transcriptUrl}
                            />
                        </div>
                        <div className="flex flex-row gap-x-4 mb-5">
                            <Button
                                onClick={() => router.push("/home")}
                                disabled={isSubmitting}
                                type="reset"
                                variant="bordered"
                                className="grow border border-[#42B5FC] md:text-xl text-base text-[#42B5FC] font-medium"
                            >ยกเลิก
                            </Button>
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                variant="shadow"
                                className="grow bg-[#42B5FC] md:text-xl text-base text-white font-medium"
                            >ส่งใบสมัคร
                            </Button>
                        </div>
                    </div>
                </form>
                <div className={clsx("transition-opacity fixed top-0 left-0 right-0 bottom-0 bg-black/[.5] z-50 flex justify-center items-center", {
                    " opacity-0 pointer-events-none": !isModalVisible,
                    " opacity-100 ": isModalVisible
                })}>
                    <FormModal
                        title={isSuccess ? "ยื่นใบสมัครสำเร็จ" : "ยื่นใบสมัครไม่สำเร็จ"}
                        desc={isSuccess ? "โปรดเลือกวันนัดหมายสำหรับสัมภาษณ์" : "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง"}
                        isSuccess={isSuccess}
                        isVisible={isModalVisible}
                        onClose={
                            () => {
                                setModalVisible(false);
                                if (isSuccess)
                                    router.push('/home');
                            }
                        }
                    />
                </div>
            </section>
        );
    }
}