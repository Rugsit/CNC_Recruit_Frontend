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
import { env } from 'next-runtime-env';

export interface ApplicationForm {
  nisitId: string;
  name: string;
  lastname: string;
  nickname: string;
  typeOfDpm: string;
  socialContact: string;
  phoneNumber: string;
  currentLiving: string;
  imageBucket: string;
  imageName: string;
  imageUrl: string;
  grade: string;
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
  const [applicationForm, setApplicationForm] =
    useState<ApplicationForm | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageFile, setImageFile] = useState<File>();
  const [transcriptFile, setTranscriptFile] = useState<File>();
  const [errorDesc, setErrorDesc] = useState<string>(
    'เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง'
  );
  const [isExpired, setIsExpired] = useState<boolean>(false);
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

  const checkToken = async () => {
    const base64Url = data?.backendToken?.split('.')[1];
    const base64 = base64Url?.replace('-', '+').replace('_', '/');

    if (base64) {
      const time = Date.now() / 1000;
      const exp = JSON.parse(window.atob(base64))['exp'];

      if (time > exp) {
        return false;
      } else {
        return true;
      }
    }

    return false;
  };

  const fetchingApplication = async () => {
    const currentTimestamp = new Date().getTime();
    const expiryTimestamp = new Date('2025-02-21T23:59:00').getTime();

    if (currentTimestamp > expiryTimestamp) {
      setIsExpired(true);
    }

    if (!(await checkToken())) {
      setErrorDesc('กรุณาเข้าสู่ระบบก่อนสร้างหรือแก้ไขใบสมัคร');
      setIsSuccess(false);
      setIsModalVisible(true);
      setTimeout(() => {
        router.push('/home');
      }, 3000);
    }

    try {
      const response = await axios.get(env('NEXT_PUBLIC_API_URL') + '/nisit', {
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
      let imageUrl = '',
        transcriptUrl = '';
      let isImageChange = false,
        isTranscriptChange = false;

      if (imageFile) {
        isImageChange = true;
        const imageResponse = await axios.post(
          env('NEXT_PUBLIC_API_URL') + '/upload',
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
        const transcriptResponse = await axios.post(
          env('NEXT_PUBLIC_API_URL') + '/upload',
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
        ? env('NEXT_PUBLIC_API_URL') + `/nisit/`
        : env('NEXT_PUBLIC_API_URL') + '/app';

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
      setIsSuccess(true);
      setIsModalVisible(true);
    } catch (error) {
      // console.error("Submission failed:", error);
      setIsSuccess(false);
      setIsModalVisible(true);
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
                isExpired={isExpired}
                register={register('nisitId')}
                title='รหัสนิสิต'
              />
              <InputText
                desc='(ไม่ต้องมีคำนำหน้า)'
                errorMessage={errors.name?.message}
                isExpired={isExpired}
                register={register('name')}
                title='ชื่อจริง'
              />
              <InputText
                errorMessage={errors.lastname?.message}
                isExpired={isExpired}
                register={register('lastname')}
                title='นามสกุล'
              />
              <InputText
                errorMessage={errors.nickname?.message}
                isExpired={isExpired}
                register={register('nickname')}
                title='ชื่อเล่น'
              />
              <SelectInput
                isExpired={isExpired}
                options={[
                  { value: 'normal', label: 'ปกติ' },
                  { value: 'special', label: 'พิเศษ' },
                ]}
                register={register('typeOfDpm')}
                title='ภาค'
              />
              <SelectInput
                isExpired={isExpired}
                options={[
                  { value: 83, label: '83' },
                  { value: 84, label: '84' },
                ]}
                register={register('nisitYearParticipated', {
                  valueAsNumber: true,
                })}
                title='KU รุ่นที่'
              />
              <InputText
                errorMessage={errors.grade?.message}
                isExpired={isExpired}
                register={register('grade')}
                title='เกรดเฉลี่ยรวม'
              />
              <InputText
                desc='(หอใน, หอนอก, บ้าน)'
                errorMessage={errors.currentLiving?.message}
                isExpired={isExpired}
                register={register('currentLiving')}
                title='ที่อยู่อาศัยปัจจุบัน'
              />
              <InputText
                errorMessage={errors.mbti?.message}
                isExpired={isExpired}
                register={register('mbti')}
                title='MBTI'
              />
              <InputText
                errorMessage={errors.phoneNumber?.message}
                isExpired={isExpired}
                register={register('phoneNumber')}
                title='เบอร์โทรศัพท์'
              />
              <InputTextArea
                desc='Facebook, Instagram, LineID หรือ Discord'
                errorMessage={errors.socialContact?.message}
                isExpired={isExpired}
                register={register('socialContact')}
                title='บัญชีโซเชียล'
              />
              <InputTextArea
                errorMessage={errors.clubs?.message}
                isExpired={isExpired}
                register={register('clubs')}
                title='ตอนนี้เป็นสมาชิกชมรม/แลป/สโมสรนิสิตอื่นๆหรือไม่?'
              />
              <InputTextArea
                desc='(ผม/หนู สนใจในเรื่อง UX/UI, Cloud, AI, WebDev, MobileDev, etc.)'
                errorMessage={errors.interests?.message}
                isExpired={isExpired}
                register={register('interests')}
                title='มีความสนใจในเรื่องอะไร?'
              />
              <InputTextArea
                errorMessage={errors.hobbies?.message}
                isExpired={isExpired}
                register={register('hobbies')}
                title='งานอดิเรกที่ชอบทำ?'
              />
              <InputTextArea
                errorMessage={errors.whyCnc?.message}
                isExpired={isExpired}
                register={register('whyCnc')}
                title='ทำไมถึงสมัคร CNC?'
              />
              <InputTextArea
                errorMessage={errors.expected?.message}
                isExpired={isExpired}
                register={register('expected')}
                title='มีความคาดหวังอย่างไรกับ CNC?'
              />
              <InputTextArea
                errorMessage={errors.projects?.message}
                isExpired={isExpired}
                register={register('projects')}
                title='โปรเจ็คที่เคยทำมีอะไรบ้าง?'
              />
              <InputTextArea
                errorMessage={errors.tools?.message}
                isExpired={isExpired}
                register={register('tools')}
                title='Tools, Frameworks, Softwares ที่เคยใช้มีอะไรบ้าง?'
              />
              <FileUpload
                accept='.png, .jpg, .jpeg'
                desc='JPEG, JPG หรือ PNG ขนาดไม่เกิน 6MB เห็นใบหน้าชัดเจน'
                errorMessage={errors.imageUrl?.message?.toString()}
                existedFile={{
                  name: applicationForm?.imageName || '',
                  url: applicationForm?.imageUrl || '',
                }}
                icon={{ src: UploadImageIcon, alt: 'upload-image-icon' }}
                isExpired={isExpired}
                register={register('imageUrl')}
                setFile={setImageFile}
                setValue={setValue}
                title='อัพโหลดรูปภาพ'
                trigger={trigger}
              />
              <FileUpload
                accept='.pdf'
                desc='PDF ขนาดไม่เกิน 6MB'
                errorMessage={errors.transcriptUrl?.message?.toString()}
                existedFile={{
                  name: applicationForm?.transcriptName || '',
                  url: applicationForm?.transcriptUrl || '',
                }}
                icon={{ src: UploadFileIcon, alt: 'upload-file-icon' }}
                isExpired={isExpired}
                register={register('transcriptUrl')}
                setFile={setTranscriptFile}
                setValue={setValue}
                title='อัพโหลดใบรับรองผลการเรียน'
                trigger={trigger}
              />
            </div>
            <div className='flex flex-row gap-x-4 mb-5'>
              <Button
                className={`${isExpired ? 'hidden' : 'block'} grow border border-[#42B5FC] md:text-xl text-base text-[#42B5FC] font-medium`}
                disabled={isSubmitting}
                type='reset'
                variant='bordered'
                onClick={() => router.push('/home')}
              >
                ยกเลิก
              </Button>
              <Button
                className={`${isExpired ? 'hidden' : 'block'} grow bg-[#42B5FC] md:text-xl text-base text-white font-medium`}
                disabled={isSubmitting}
                type='submit'
                variant='shadow'
              >
                {applicationForm ? 'แก้ไขใบสมัคร' : 'ส่งใบสมัคร'}
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
              isSuccess ? 'โปรดติดตามและลงเวลาสัมภาษณ์ที่หน้าหลัก' : errorDesc
            }
            isSuccess={isSuccess}
            isVisible={isModalVisible}
            title={
              isSuccess
                ? applicationForm
                  ? 'แก้ไขใบสมัครเสร็จสิ้น'
                  : 'สร้างใบสมัครเสร็จสิ้น'
                : 'สร้างใบสมัครไม่สำเร็จ'
            }
            onClose={() => {
              setIsModalVisible(false);
              if (isSuccess) router.push('/home');
            }}
          />
        </div>
      </section>
    );
  }
}
