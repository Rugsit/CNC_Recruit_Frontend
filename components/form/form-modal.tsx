import React from 'react';

interface FormModalProps {
    title: string;
    desc: string
    isSuccess: boolean;
    isVisible: boolean;
    onClose: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ title, desc, isSuccess, isVisible, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg  px-16 py-8 md:px-32 md:py-16 relative">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-200"
                    onClick={onClose}
                >
                    ✕
                </button>
                <div className="flex flex-col items-center gap-4">
                    <h2 className={`text-3xl font-bold ${isSuccess ? "text-green-500" : "text-red-500"}`}>{title}</h2>
                    <div
                        className={`w-20 h-20 flex items-center justify-center rounded-full ${isSuccess ? 'bg-green-100' : 'bg-red-100'
                            }`}
                    >
                        {isSuccess ? (
                            // Success Icon
                            <svg
                                className="w-12 h-12 text-green-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        ) : (
                            // Failure Icon
                            <svg
                                className="w-12 h-12 text-red-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        )}
                    </div>
                    <p className="font-light text-gray-500 text-center">
                        {desc}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FormModal;
