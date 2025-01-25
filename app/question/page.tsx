// Temporary page use for test popup
"use client";
import { useState } from "react";
import AddQuestionPopup from "@/app/question/_local/addQuestionPopup";
import EditQuestionPopup from "@/app/question/_local/editQuestionPopup";
import DeleteQuestionPopup from "@/app/question/_local/deleteQuestionPopup";
import { Question } from "@/app/question/_local/types";

export default function TestPopupPage() {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null);

  const handleOpenAdd = () => {
    setIsAddPopupOpen(true);
  };

  const handleCloseAdd = () => {
    setIsAddPopupOpen(false);
  };

  const handleOpenEdit = (question: Question) => {
    setSelectedQuestion(question);
    setIsEditPopupOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditPopupOpen(false);
    setSelectedQuestion(null);
  };

  const handleSubmitAdd = (questionData: Question) => {
    setSubmittedData(prev => [...prev, questionData]);
    console.log("Added Data:", questionData);
  };

  const handleSubmitEdit = (questionData: Question) => {
    setSubmittedData(prev => 
      prev.map(q => 
        q === selectedQuestion ? questionData : q
      )
    );
    console.log("Edited Data:", questionData);
  };

  const handleOpenDelete = (question: Question) => {
    setQuestionToDelete(question);
    setIsDeletePopupOpen(true);
  };
  
  const handleCloseDelete = () => {
    setIsDeletePopupOpen(false);
    setQuestionToDelete(null);
  };
  
  const handleConfirmDelete = () => {
    if (questionToDelete) {
      setSubmittedData(prev => prev.filter(q => q !== questionToDelete));
      console.log("Deleted Question:", questionToDelete);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">ทดสอบ Popup ต่างๆ</h1>
        
        {/* ส่วนควบคุม */}
        <div className="mb-8 space-y-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Question Popups</h2>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-[#42B5FC] text-white rounded-lg hover:bg-[#0374BA] transition-colors mr-4"
            >
              เปิด Popup เพิ่มคำถาม
            </button>
          </div>
        </div>

        {/* แสดงข้อมูลที่ส่งมา */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">ข้อมูลที่ส่งมา</h2>
          <div className="space-y-4">
            {submittedData.map((data, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p><span className="font-semibold">คำถาม:</span> {data.question}</p>
                    <p><span className="font-semibold">คำตอบ:</span> {data.answer}</p>
                    <p><span className="font-semibold">ความยาก:</span> {data.difficulty}</p>
                    <p><span className="font-semibold">ประเภท:</span> {data.type}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleOpenEdit(data)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => handleOpenDelete(data)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {submittedData.length === 0 && (
              <p className="text-gray-500">ยังไม่มีข้อมูลที่ถูกส่งมา</p>
            )}
          </div>
        </div>
      </div>

      {/* Add Popup */}
      {isAddPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <AddQuestionPopup 
            onClose={handleCloseAdd}
            onSubmit={handleSubmitAdd}
          />
        </div>
      )}

      {/* Edit Popup */}
      {isEditPopupOpen && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <EditQuestionPopup 
            onClose={handleCloseEdit}
            onSubmit={handleSubmitEdit}
            initialData={selectedQuestion}
          />
        </div>
      )}

      {/* เพิ่ม Delete Popup */}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <DeleteQuestionPopup 
            onClose={handleCloseDelete}
            onConfirm={handleConfirmDelete}
          />
        </div>
      )}
    </div>
  );
}
