'use client';

import { Button } from '@nextui-org/button';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';

import FormModal from '@/components/form/form-modal';
import SelectInput from '@/components/form/select-input';
import { formSchema, FormFields } from '@/app/lib/validations/schema';
import UploadFileIcon from '@/public/form/upload-file.svg';
import UploadImageIcon from '@/public/form/upload-image.svg';
import ChevronLeftIcon from '@/public/form/chevron-left.svg';
import InputTextArea from '@/components/form/input-textarea';
import FileUpload from '@/components/form/file-upload';
import InputText from '@/components/form/input-text';

interface ApplicationForm {
  nisitId: string;
  name: string;
  lastname: string;
  nickname: string;
  typeOfDpm: string;
  socialContact: string;
  phoneNumber: string;
  currentLiving: string;
  imageUrl: string;
  grade: number;
  expected: string;
  whyCnc: string;
  mbti: string;
  clubs: string;
  tools: string;
  projects: string;
  interests: string;
  hobbies: string;
  transcriptUrl: string;
  nisitYearParticipated: number;
}

export default function RegisterForm() {
  const [applicationForm, setApplicationForm] =
    useState<ApplicationForm | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { data, status } = useSession();

  console.log(`Token = ${data?.backendToken}`);

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
      const response = await axios.get('http://localhost:8000/nisit', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data?.backendToken}`,
        },
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
    if (status === 'authenticated' && data?.backendToken) {
      // Wait until data is already fetched
      fetchingApplication();
    }
  }, [status, data?.backendToken]);

  const onSubmit = async (formData: FormFields) => {
    try {
      const method = applicationForm ? 'PUT' : 'POST';
      const url = applicationForm
        ? `http://localhost:8000/nisit/`
        : 'http://localhost:8000/app';

      const payload = {
        ...formData,
        nisitYearParticipated: Number(formData.nisitYearParticipated),
        grade: Number(formData.grade),
        imageUrl: formData.imageUrl.name || 'example.com',
        transcriptUrl: formData.transcriptUrl.name || 'example.com',
      };

      const response = await axios({
        method,
        url,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data?.backendToken}`,
        },
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
      <div className='fixed inset-0 flex flex-col gap-y-5 justify-center items-center'>
        <div className='w-16 h-16 border-5 border-[#42B5FC] border-t-transparent rounded-full animate-spin' />
        <h1 className='text-[#42B5FC] text-xl font-bold'>
          กำลังโหลดแบบฟอร์มสมัคร...
        </h1>
      </div>
    );
  } else {
    return (
      <section className='mx-auto max-w-[1100px] px-8 mt-32 mb-12'>
        <Link
          className='inline-flex gap-x-2 items-center'
          href='/home'
        >
          <Image
            alt='chevron left logo'
            src={ChevronLeftIcon}
          />
          <span className='py-6 text-base'>กลับสู่หน้าหลัก</span>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-y-5 px-10 py-3 bg-white rounded-lg shadow-lg'>
            <div>
              <h3 className='md:text-2xl text-xl mt-5 text-blue-400 font-bold'>
                แบบฟอร์มสมัคร
              </h3>
            </div>
            <div className='flex flex-col gap-y-5'>
              <InputText
                errorMessage={errors.nisitId?.message}
                register={register('nisitId')}
                title='รหัสนิสิต'
              />
              <InputText
                desc='(ไม่ต้องมีคำนำหน้า)'
                errorMessage={errors.name?.message}
                register={register('name')}
                title='ชื่อจริง'
              />
              <InputText
                errorMessage={errors.lastname?.message}
                register={register('lastname')}
                title='นามสกุล'
              />
              <InputText
                errorMessage={errors.nickname?.message}
                register={register('nickname')}
                title='ชื่อเล่น'
              />
              <SelectInput
                options={[
                  { value: 'normal', label: 'ปกติ' },
                  { value: 'special', label: 'พิเศษ' },
                ]}
                register={register('typeOfDpm')}
                title='ภาค'
              />
              <SelectInput
                options={[{ value: 84, label: '84' }]}
                register={register('nisitYearParticipated', {
                  valueAsNumber: true,
                })}
                title='ปีการศึกษา'
              />
              <InputText
                errorMessage={errors.grade?.message}
                register={register('grade')}
                title='เกรดเฉลี่ยรวม'
              />
              <InputText
                desc='(หอใน, หอนอก, บ้าน)'
                errorMessage={errors.currentLiving?.message}
                register={register('currentLiving')}
                title='ที่อยู่อาศัยปัจจุบัน'
              />
              <InputText
                errorMessage={errors.mbti?.message}
                register={register('mbti')}
                title='MBTI'
              />
              <InputText
                errorMessage={errors.phoneNumber?.message}
                register={register('phoneNumber')}
                title='เบอร์โทรศัพท์'
              />
              <InputTextArea
                desc='Facebook, Instagram, LineID หรือ Discord'
                errorMessage={errors.socialContact?.message}
                register={register('socialContact')}
                title='บัญชีโซเชียล'
              />
              <InputTextArea
                errorMessage={errors.clubs?.message}
                register={register('clubs')}
                title='ตอนนี้เป็นสมาชิกชมรม/แลป/สโมสรนิสิตอื่นๆหรือไม่?'
              />
              <InputTextArea
                desc='(ผม/หนู สนใจในเรื่อง UX/UI, Cloud, AI, WebDev, MobileDev, etc.)'
                errorMessage={errors.interests?.message}
                register={register('interests')}
                title='มีความสนใจในเรื่องอะไร?'
              />
              <InputTextArea
                errorMessage={errors.hobbies?.message}
                register={register('hobbies')}
                title='งานอดิเรกที่ชอบทำ?'
              />
              <InputTextArea
                errorMessage={errors.whyCnc?.message}
                register={register('whyCnc')}
                title='ทำไมถึงสมัคร CNC?'
              />
              <InputTextArea
                errorMessage={errors.expected?.message}
                register={register('expected')}
                title='มีความคาดหวังอย่างไรกับ CNC?'
              />
              <InputTextArea
                errorMessage={errors.projects?.message}
                register={register('projects')}
                title='โปรเจ็คที่เคยทำมีอะไรบ้าง?'
              />
              <InputTextArea
                errorMessage={errors.tools?.message}
                register={register('tools')}
                title='Tools, Frameworks, Softwares ที่เคยใช้มีอะไรบ้าง?'
              />
              <FileUpload
                accept='.png, .jpg, .jpeg'
                description='ไฟล์ JPEG หรือ PNG ไม่เกิน 10MB เห็นใบหน้าชัดเจน'
                errorMessage={errors.imageUrl?.message?.toString()}
                existedFileName={applicationForm?.imageUrl}
                icon={{ src: UploadImageIcon, alt: 'upload-image-icon' }}
                register={register('imageUrl')}
                setValue={setValue}
                title='อัพโหลดรูปภาพ'
                trigger={trigger}
              />
              <FileUpload
                accept='.pdf'
                description='ไฟล์​ PDF ขนาดไม่เกิน 10 MB'
                errorMessage={errors.transcriptUrl?.message?.toString()}
                existedFileName={applicationForm?.transcriptUrl}
                icon={{ src: UploadFileIcon, alt: 'upload-file-icon' }}
                register={register('transcriptUrl')}
                setValue={setValue}
                title='อัพโหลดใบรับรองผลการเรียน'
                trigger={trigger}
              />
            </div>
            <div className='flex flex-row gap-x-4 mb-5'>
              <Button
                className='grow border border-[#42B5FC] md:text-xl text-base text-[#42B5FC] font-medium'
                disabled={isSubmitting}
                type='reset'
                variant='bordered'
                onClick={() => router.push('/home')}
              >
                ยกเลิก
              </Button>
              <Button
                className='grow bg-[#42B5FC] md:text-xl text-base text-white font-medium'
                disabled={isSubmitting}
                type='submit'
                variant='shadow'
              >
                ส่งใบสมัคร
              </Button>
            </div>
          </div>
        </form>
        <div
          className={clsx(
            'transition-opacity fixed top-0 left-0 right-0 bottom-0 bg-black/[.5] z-50 flex justify-center items-center',
            {
              ' opacity-0 pointer-events-none': !isModalVisible,
              ' opacity-100 ': isModalVisible,
            }
          )}
        >
          <FormModal
            desc={
              isSuccess
                ? 'โปรดเลือกวันนัดหมายสำหรับสัมภาษณ์'
                : 'เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง'
            }
            isSuccess={isSuccess}
            isVisible={isModalVisible}
            title={
              isSuccess
                ? applicationForm
                  ? 'สร้างใบสมัครสำเร็จ'
                  : 'แก้ไขใบสมัครเสร็จสิน'
                : 'ยื่นใบสมัครไม่สำเร็จ'
            }
            onClose={() => {
              setModalVisible(false);
              if (isSuccess) router.push('/home');
            }}
          />
        </div>
      </section>
    );
  }
}
