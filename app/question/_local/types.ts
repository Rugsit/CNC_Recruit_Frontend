export interface Question {
    question: string;
    answer: string;
    difficulty: 'ง่าย' | 'ปานกลาง' | 'ยาก';
    type: 'วัดความรู้' | 'วัดทัศนคติ';
  }