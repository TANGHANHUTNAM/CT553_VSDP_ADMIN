import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { LuSettings2 } from "react-icons/lu";
import FormComponents from "./FormComponents";
import FormSettings from "./FormSettings";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import FormSections from "./FormSections";

const BuilderSidebarLeft = ({
  isCloseSidebarLeft,
  setIsCloseSidebarLeft,
}: {
  isCloseSidebarLeft: boolean;
  setIsCloseSidebarLeft: (value: boolean) => void;
}) => {
  const [tab, setTab] = useState<"component" | "setting" | "sections">(
    "component",
  );

  return (
    <div
      className={`fixed h-full p-2 transition-all duration-300 ${isCloseSidebarLeft ? "w-0 pl-3" : "w-1/4 pr-4"}`}
    >
      <div className="absolute -right-2 top-1/2 text-2xl text-primary">
        <button onClick={() => setIsCloseSidebarLeft(!isCloseSidebarLeft)}>
          {isCloseSidebarLeft ? <IoMdArrowDropright /> : <IoMdArrowDropleft />}
        </button>
      </div>
      {/* TAB */}
      {!isCloseSidebarLeft && (
        <>
          <div className="flex w-full items-center justify-between border-b-2 border-gray-300 text-sm text-gray-700">
            <div
              onClick={() => setTab("component")}
              className={`${tab === "component" ? "text-primary" : "text-gray-700"} flex w-1/2 cursor-pointer flex-col items-center py-2`}
            >
              <CiCirclePlus className="text-xl" />
              <div>Thành phần</div>
            </div>
            <div
              onClick={() => setTab("sections")}
              className={`${tab === "sections" ? "text-primary" : "text-gray-700"} flex w-1/2 cursor-pointer flex-col items-center py-2`}
            >
              <FaRegListAlt className="text-xl" />
              <div>Phần biểu mẫu</div>
            </div>
            <div
              onClick={() => setTab("setting")}
              className={`${tab === "setting" ? "text-primary" : "text-gray-700"} flex w-1/2 cursor-pointer flex-col items-center py-2`}
            >
              <LuSettings2 className="text-xl" />
              <div>Cài đặt</div>
            </div>
          </div>
          <div className="">
            {tab === "component" && <FormComponents />}
            {tab === "sections" && <FormSections />}
            {tab === "setting" && <FormSettings />}
          </div>
        </>
      )}
    </div>
  );
};

export default BuilderSidebarLeft;
