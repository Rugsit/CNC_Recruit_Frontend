import { XMark } from "@/components/icons";
import clsx from "clsx";

interface DateModalProps {
    title: string,
    desc: string,
    isSuccess: boolean,
    isVisible: boolean,
    onClose: () => void,
}

const DateModal: React.FC<DateModalProps> = ({ title, desc, isSuccess, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
      <div className={clsx("transition-all my-[40px] max-h-[320px] h-full w-full max-w-[420px] mx-[40px] bg-white shadow-md rounded-lg p-5  relative box-border", {
          " scale-100" : isVisible,
          " scale-90" : !isVisible
        })
        }>
          <XMark
              className="w-5 absolute top-[20px] right-[20px] cursor-pointer"
              onClick={onClose}
              fill={isSuccess ? "#1EBD53" : "#ED3B3C"}
          />
          <div className="h-full flex flex-col justify-center items-center gap-y-6">
              <h2 className={`text-3xl text-center font-bold ${isSuccess ? "text-green-500" : "text-red-500"}`}>{title}</h2>
              <div
                  className={`w-24 h-24 flex items-center justify-center rounded-full ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}
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
              <p className="font-normal text-center text-gray-500">
                  {desc}
              </p>
          </div>
      </div>
  );
};

export default DateModal;