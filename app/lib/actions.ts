'use server';

import { z } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const formSchema = z.object({
    nisitId: z.string().regex(/^\d{10}$/, {
        message: "*กรุณาระบุรหัสนิสิต 10 หลัก"
    }),
    firstName: z.string().min(1, {
        message: "*กรุณาระบุชื่อจริง"
    }),
    lastName: z.string().min(1, {
        message: "*กรุณาระบุนามสกุล"
    }),
    nickName: z.string().min(1, {
        message: "*กรุณาระบุชื่อเล่น"
    }),
    social: z.string().min(1, {
        message: "*กรุณาระบุบัญชีโซเชียล"
    }),
    lineId: z.string().min(1, {
        message: "*กรุณาระบุไอดีไลน์"
    }),
    phoneNumber: z.string().regex(/^\d{10}$/, {
        message: "*กรุณาระบุเบอร์โทรศัพท์ 10 หลัก"
    }),
    address: z.string().min(1, {
        message: "*กรุณาระบุที่อยู่อาศัย"
    }),
    mbti: z.string().length(4, {
        message: "*กรุณาระบุตัวอักษร 4 ตัว"
    }),
    club: z.string().min(1, {
        message: "*กรุณาระบุชมรม/แลป/สโมสรที่อยู่"
    }),
    skill: z.string().min(1, {
        message: "*กรุณาระบุความสามารถพิเศษ"
    }),
    interest: z.string().min(1, {
        message: "*กรุณาระบุความสนใจ"
    }),
    project: z.string().min(1, {
        message: "*กรุณาระบุโปรเจ็คที่เคยทำ"
    }),
    tool: z.string().min(1, {
        message: "*กรุณาระบุ Tools, Frameworks หรือ Software ที่เคยใช้"
    }),
    imageProfile: z.instanceof(File).refine(file => file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
        message: "*กรุณาอัพโหลดรูปภาพเป็น JPEG, JPG หรือ PNG"
    }).refine(file => file.size <= MAX_FILE_SIZE, {
        message: "*กรุณาอัพโหลดรูปภาพขนาดไม่เกิน 10MB"
    }),
    transcript: z.instanceof(File).refine(file => file && ['application/pdf'].includes(file.type), {
        message: "*กรุณาอัพโหลดใบรับรองผลการเรียนเป็น PDF"
    }).refine(file => file.size <= MAX_FILE_SIZE, {
        message: "*กรุณาอัพโหลดใบรับรองผลการเรียนขนาดไม่เกิน 10MB"
    }),
});

export async function registerForm(prevState: any, formData: FormData) {
    const validatedFields = formSchema.safeParse({
        nisitId: formData.get('nisitId'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        nickName: formData.get('nickName'),
        social: formData.get('social'),
        lineId: formData.get('lineId'),
        phoneNumber: formData.get('phoneNumber'),
        address: formData.get('address'),
        mbti: formData.get('mbti'),
        club: formData.get('club'),
        skill: formData.get('skill'),
        interest: formData.get('interest'),
        project: formData.get('project'),
        tool: formData.get('tool'),
        imageProfile: formData.get('imageProfile'),
        transcript: formData.get('transcript'),
    });

    if (!validatedFields.success) {
        return {
            ...prevState,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    console.log(validatedFields.data);
}