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

export default function RegisterForm() {
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
        try {
            // POST data to API
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(data);
        } catch (error) {
            // Handle error if POST request failed
            console.error(error);
        }
    }

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
                <div className="flex flex-col gap-y-5 px-10 py-3 bg-white rounded-lg">
                    <div>
                        <h3 className="md:text-2xl text-xl mt-5 text-blue-400 font-bold">แบบฟอร์มสมัคร</h3>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <InputText title="รหัสนิสิต" description="6710400000" register={register("nisitId")} errorMessage={errors.nisitId?.message} />
                        <InputText title="ชื่อจริง" description="เกิดสิริ" register={register("firstName")} errorMessage={errors.firstName?.message} />
                        <InputText title="นามสกุล" description="ศรีเจริญ" register={register("lastName")} errorMessage={errors.lastName?.message} />
                        <InputText title="ชื่อเล่น" description="ต้นน้ำ" register={register("nickName")} errorMessage={errors.nickName?.message} />
                        <InputText title="Facebook/IG" register={register("social")} errorMessage={errors.social?.message} />
                        <InputText title="LINE ID" register={register("lineId")} errorMessage={errors.lineId?.message} />
                        <InputText title="เบอร์โทรศัพท์" register={register("phoneNumber")} errorMessage={errors.phoneNumber?.message} />
                        <InputText title="ที่อยู่อาศัยปัจจุบัน" register={register("address")} description="หอใน, หอนอก, บ้าน" errorMessage={errors.address?.message} />
                        <InputText title="MBTI" register={register("mbti")} description="INFP" errorMessage={errors.mbti?.message} />
                        <InputText title="ตอนนี้เป็นสมาชิกชมรม/แลป/สโมสรนิสิตอื่นๆหรือไม่?" register={register("club")} errorMessage={errors.club?.message} />
                        <Textarea title="มีความสามารถพิเศษอะไรบ้าง?" register={register("skill")} errorMessage={errors.skill?.message} />
                        <Textarea title="มีความสนใจในเรื่องอะไรเป็นพิเศษ?" description="สนใจ UX/UI, Web Dev, AI, Cloud, etc." register={register("interest")} errorMessage={errors.interest?.message} />
                        <Textarea title="โปรเจ็คที่เคยทำมีอะไรบ้าง?" register={register("project")} errorMessage={errors.project?.message} />
                        <Textarea title="Tools, Frameworks, Software ที่เคยใช้มีอะไรบ้าง?" register={register("tool")} errorMessage={errors.tool?.message} />
                        <FileUpload
                            title="อัพโหลดรูปภาพ"
                            description="ไฟล์ JPEG หรือ PNG ไม่เกิน 10MB เห็นใบหน้าชัดเจน"
                            accept=".png, .jpg, .jpeg"
                            register={register("imageProfile")}
                            errorMessage={errors.imageProfile?.message?.toString()}
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
                    <div className="flex flex-row gap-x-4">
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
        </section>
    );
}