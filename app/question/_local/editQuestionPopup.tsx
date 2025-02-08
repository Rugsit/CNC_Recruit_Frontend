import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { fontSansThai } from '@/config/fonts';
import { Question } from './types';
import { DIFFICULTY_OPTIONS, TYPE_OPTIONS } from './constants';
import { TextArea, Select } from './QuestionForm';

interface EditQuestionPopupProps {
  onClose: () => void;
  onSubmit: (questionData: Question) => void;
  initialData: Question;
}

const EditQuestionPopup: React.FC<EditQuestionPopupProps> = ({ 
  onClose, 
  onSubmit, 
  initialData 
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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`w-[500px] bg-white rounded-xl shadow-lg ${fontSansThai.variable}`}>
      <div className='relative flex flex-col p-6'>
        <button
          className='absolute right-4 top-4'
          onClick={onClose}
          aria-label='ปิด'
        >
          <X className='h-10 w-10 text-gray-600' />
        </button>

        <h2 className='text-4xl font-bold text-center mb-6 text-gray-700'>
          แก้ไขคำถาม
        </h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <TextArea
            label="คำถาม"
            value={formData.question}
            onChange={updateFormData('question')}
            placeholder="กรอกคำถามของคุณ"
            minHeight="100px"
          />

          <TextArea
            label="คำตอบที่คาดหวัง"
            value={formData.answer}
            onChange={updateFormData('answer')}
            placeholder="กรอกคำตอบหรือเหตุผล"
            minHeight="120px"
          />

          <div className='flex justify-center gap-8'>
            <Select
              label="ความยาก"
              value={formData.difficulty}
              onChange={updateFormData('difficulty')}
              options={DIFFICULTY_OPTIONS}
            />

            <Select
              label="ประเภท"
              value={formData.type}
              onChange={updateFormData('type')}
              options={TYPE_OPTIONS}
            />
          </div>

          <div className='flex justify-center space-x-3 mt-6'>
            <button
              type="submit"
              className='px-8 py-2 text-white bg-[#42B5FC] rounded-2xl hover:bg-[#0374BA] transition-colors'
            >
              บันทึก
            </button>
            <button
              type="button"
              onClick={onClose}
              className='px-8 py-2 text-white bg-[#F5365C] rounded-2xl hover:bg-[#AA0829] transition-colors'
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
