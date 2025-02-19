import { z } from 'zod';

const MAX_FILE_SIZE = 6 * 1024 * 1024; // 6MB

export const formSchema = z.object({
  nisitId: z
    .string()
    .regex(/^\d{10}$/, { message: '*กรุณาระบุรหัสนิสิต 10 หลัก' }),
  name: z.string().min(1, { message: '*กรุณาระบุชื่อจริง' }),
  lastname: z.string().min(1, { message: '*กรุณาระบุนามสกุล' }),
  nickname: z.string().min(1, { message: '*กรุณาระบุชื่อเล่น' }),
  typeOfDpm: z.string().min(1, { message: '*กรุณาระบุภาค' }),
  nisitYearParticipated: z.preprocess(
    (val) => Number(val),
    z.number().min(83, 'กรุณาระบุรุ่น KU ให้ถูกต้อง').max(84, 'กรุณาระบุรุ่น KU ให้ถูกต้อง')
  ),
  socialContact: z.string().min(1, { message: '*กรุณาระบุบัญชีโซเชียล' }),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: '*กรุณาระบุเบอร์โทรศัพท์ 10 หลัก' }),
  currentLiving: z.string().min(1, { message: '*กรุณาระบุที่อยู่อาศัย' }),
  grade: z.string().regex(/^(?:[0-3](?:\.\d{1,2})?|4(?:\.0{1,2})?)$/, {
    message: 'เกรดต้องอยู่ระหว่าง 0.00 - 4.00',
  }),
  expected: z.string().min(1, { message: '*กรุณาระบุความคาดหวัง' }),
  whyCnc: z.string().min(1, { message: '*กรุณาระบุเหตุผล' }),
  mbti: z.string().regex(/^[A-Z]{4}$/, { message: '*กรุณาระบุตัวอักษรภาษาอังกฤษพิมพ์ใหญ่ 4 ตัว' }),
  clubs: z.string().min(1, { message: '*กรุณาระบุชมรม/แลป/สโมสรที่อยู่' }),
  interests: z.string().min(1, { message: '*กรุณาระบุความสนใจ' }),
  hobbies: z.string().min(1, { message: '*กรุณาระบุงานอดิเรก' }),
  projects: z.string().min(1, { message: '*กรุณาระบุโปรเจ็คที่เคยทำ' }),
  tools: z.string().min(1, {
    message: '*กรุณาระบุ Tools, Frameworks หรือ Software ที่เคยใช้',
  }),
  imageUrl: z.union([
    // File name existed (Already attached the file)
    z.string().min(1, { message: '*กรุณาอัพโหลดรูปภาพเห็นใบหน้าชัดเจน' }),

    // (Not attach the file yet)
    z
      .any()
      .refine(
        (file) =>
          file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
        { message: '*กรุณาอัพโหลดรูปภาพเห็นใบหน้าชัดเจน' }
      )
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: '*กรุณาอัพโหลดรูปภาพขนาดไม่เกิน 6MB',
      }),
  ]),
  transcriptUrl: z.union([
    // File name existed (Already attached the file)
    z.string().min(1, { message: '*กรุณาอัพโหลดไฟล์ผลการเรียน' }),

    // (Not attach the file yet)
    z
      .any()
      .refine((file) => file && ['application/pdf'].includes(file.type), {
        message: '*กรุณาอัพโหลดไฟล์ผลการเรียน',
      })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: '*กรุณาอัพโหลดใบรับรองผลการเรียนขนาดไม่เกิน 6MB',
      }),
  ]),
});

export type FormFields = z.infer<typeof formSchema>;
