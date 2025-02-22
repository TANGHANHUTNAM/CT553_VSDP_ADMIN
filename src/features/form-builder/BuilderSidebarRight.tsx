import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import FormAI from "./FormAI";
import FormProperties from "./FormProperties";

const BuilderSidebarRight = ({
  isCloseSidebarRight,
  setIsCloseSidebarRight,
}: {
  isCloseSidebarRight: boolean;
  setIsCloseSidebarRight: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [tab, setTab] = useState<"properties" | "AI">("properties");

  return (
    <div
      className={`fixed h-full p-2 transition-all duration-300 ${isCloseSidebarRight ? "w-0 pr-3" : "w-1/4 pl-4"}`}
    >
      <div className="absolute -left-2 top-1/2 text-2xl text-primary">
        <button onClick={() => setIsCloseSidebarRight(!isCloseSidebarRight)}>
          {isCloseSidebarRight ? <IoMdArrowDropleft /> : <IoMdArrowDropright />}
        </button>
      </div>
      {!isCloseSidebarRight && (
        <>
          <div className="flex w-full items-center justify-between border-b-2 border-gray-300 text-sm text-gray-700">
            <div
              onClick={() => setTab("properties")}
              className={`${tab === "properties" ? "text-primary" : "text-gray-700"} flex w-1/2 cursor-pointer flex-col items-center py-2`}
            >
              <FaCircle className="text-xl" />
              <div>Thuộc tính</div>
            </div>
            <div
              onClick={() => setTab("AI")}
              className={`${tab === "AI" ? "text-primary" : "text-gray-700"} flex w-1/2 cursor-pointer flex-col items-center py-2`}
            >
              <FaRobot className="text-xl" />
              <div>AI Hỗ trợ</div>
            </div>
          </div>
          <div className="">
            {tab === "properties" && <FormProperties />}
            {tab === "AI" && <FormAI />}
          </div>
        </>
      )}
    </div>
  );
};

export default BuilderSidebarRight;
