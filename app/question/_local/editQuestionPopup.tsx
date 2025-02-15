import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

import { Question } from './types';
import { DIFFICULTY_OPTIONS, TYPE_OPTIONS } from './constants';
import { TextArea, Select } from './QuestionForm';

import { fontSansThai } from '@/config/fonts';

interface EditQuestionPopupProps {
  onClose: () => void;
  onSubmit: (questionData: Question) => void;
  initialData: Question;
}

const EditQuestionPopup: React.FC<EditQuestionPopupProps> = ({
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<Question>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.question.trim() && formData.answer.trim()) {
      onSubmit(formData);
      onClose();
    }
  };

  const updateFormData = (field: keyof Question) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className={`w-[500px] bg-white rounded-xl shadow-lg ${fontSansThai.variable}`}
    >
      <div className='relative flex flex-col p-6'>
        <button
          aria-label='ปิด'
          className='absolute right-4 top-4'
          onClick={onClose}
        >
          <X className='h-10 w-10 text-gray-600' />
        </button>

        <h2 className='text-4xl font-bold text-center mb-6 text-gray-700'>
          แก้ไขคำถาม
        </h2>

        <form
          className='space-y-6'
          onSubmit={handleSubmit}
        >
          <TextArea
            label='คำถาม'
            minHeight='100px'
            placeholder='กรอกคำถามของคุณ'
            value={formData.question}
            onChange={updateFormData('question')}
          />

          <TextArea
            label='คำตอบที่คาดหวัง'
            minHeight='120px'
            placeholder='กรอกคำตอบหรือเหตุผล'
            value={formData.answer}
            onChange={updateFormData('answer')}
          />

          <div className='flex justify-center gap-8'>
            <Select
              label='ความยาก'
              options={DIFFICULTY_OPTIONS}
              value={formData.difficulty}
              onChange={updateFormData('difficulty')}
            />

            <Select
              label='ประเภท'
              options={TYPE_OPTIONS}
              value={formData.type}
              onChange={updateFormData('type')}
            />
          </div>

          <div className='flex justify-center space-x-3 mt-6'>
            <button
              className='px-8 py-2 text-white bg-[#42B5FC] rounded-2xl hover:bg-[#0374BA] transition-colors'
              type='submit'
            >
              บันทึก
            </button>
            <button
              className='px-8 py-2 text-white bg-[#F5365C] rounded-2xl hover:bg-[#AA0829] transition-colors'
              type='button'
              onClick={onClose}
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuestionPopup;
