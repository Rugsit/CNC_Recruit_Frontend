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
  imageBucket: string
  imageName: string,
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
  transcriptBucket: string;
  transcriptName: string;
  transcriptUrl: string;
  nisitYearParticipated: number;
}

export default function RegisterForm() {
  const [applicationForm, setApplicationForm] = useState<ApplicationForm | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageFile, setImageFile] = useState<File>();
  const [transcriptFile, setTranscriptFile] = useState<File>();
  const [errorDesc, setErrorDesc] = useState<string>("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง");
  const { data, status } = useSession();
  const router = useRouter();

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
      const currentTimestamp = new Date().getTime();
      const expiryTimestamp = new Date("2025-02-25").getTime();

      if (currentTimestamp > expiryTimestamp) {
        setErrorDesc("สิ้นสุดเวลาสร้างและแก้ไขใบสมัคร");
        throw new Error('Registration period has expired');
      }

      let imageUrl = '', transcriptUrl = '';
      let isImageChange = false, isTranscriptChange = false;
      if (imageFile) {
        isImageChange = true;
        const imageResponse = await axios.post('http://localhost:8000/upload',
          { file: imageFile },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data?.backendToken}`,
            },
          }
        );
        imageUrl = imageResponse.data;
      }
      if (transcriptFile) {
        isTranscriptChange = true;
        const transcriptResponse = await axios.post('http://localhost:8000/upload',
          { file: transcriptFile },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${data?.backendToken}`,
            },
          }
        );
        transcriptUrl = transcriptResponse.data;
      }
      // console.log(`Image: ${imageUrl}\nTranscript: ${transcriptUrl}`)

      const method = applicationForm ? 'PUT' : 'POST';
      const url = applicationForm
        ? `http://localhost:8000/nisit/`
        : 'http://localhost:8000/app';

      // console.log(formData);

      const payload = {
        ...formData,
        nisitYearParticipated: Number(formData.nisitYearParticipated),
        grade: Number(formData.grade),
        imageUrl: isImageChange ? imageUrl : null,
        transcriptUrl: isTranscriptChange ? transcriptUrl : null,
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
                options={[{ value: 83, label: '83' }, { value: 84, label: '84' }]}
                register={register('nisitYearParticipated', {
                  valueAsNumber: true,
                })}
                title='KU รุ่นที่'
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
                title='อัพโหลดรูปภาพ'
                desc='JPEG, JPG หรือ PNG ขนาดไม่เกิน 6MB เห็นใบหน้าชัดเจน'
                accept='.png, .jpg, .jpeg'
                errorMessage={errors.imageUrl?.message?.toString()}
                icon={{ src: UploadImageIcon, alt: 'upload-image-icon' }}
                existedFile={{ name: applicationForm?.imageName || '', url: applicationForm?.imageUrl || '' }}
                register={register('imageUrl')}
                setValue={setValue}
                trigger={trigger}
                setFile={setImageFile}
              />
              <FileUpload
                title='อัพโหลดใบรับรองผลการเรียน'
                desc='PDF ขนาดไม่เกิน 6MB'
                accept='.pdf'
                errorMessage={errors.transcriptUrl?.message?.toString()}
                icon={{ src: UploadFileIcon, alt: 'upload-file-icon' }}
                existedFile={{ name: applicationForm?.transcriptName || '', url: applicationForm?.transcriptUrl || '' }}
                register={register('transcriptUrl')}
                setValue={setValue}
                trigger={trigger}
                setFile={setTranscriptFile}
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
                {applicationForm ? "แก้ไขใบสมัคร" : "ส่งใบสมัคร"}
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
            title={
              isSuccess
                ? applicationForm ? 'แก้ไขใบสมัครเสร็จสิ้น' : 'สร้างใบสมัครเสร็จสิ้น'
                : 'สร้างใบสมัครไม่สำเร็จ'
            }
            desc={
              isSuccess
                ? 'โปรดติดตามและลงเวลาสัมภาษณ์ที่หน้าหลัก'
                : errorDesc
            }
            isSuccess={isSuccess}
            isVisible={isModalVisible}
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
