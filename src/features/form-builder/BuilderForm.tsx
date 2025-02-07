import { useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { IFormResponse } from "../../interfaces";
import { MdPlayArrow } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";

import ButtonComponent from "../../components/ButtonComponent";
import BuilderSidebarLeft from "./BuilderSidebarLeft";
import BuilderSidebarRight from "./BuilderSidebarRight";
import BuilderCanvas from "./BuilderCanvas";
interface IBuilderFormProps {
  form?: IFormResponse | null;
}

const BuilderForm: React.FC<IBuilderFormProps> = () => {
  const [isCloseSidebarLeft, setIsCloseSidebarLeft] = useState<boolean>(false);
  const [isCloseSidebarRight, setIsCloseSidebarRight] =
    useState<boolean>(false);
  return (
    <div className="flex min-h-[calc(100vh-70px)] bg-white">
      {/* LEFT SIDEBAR */}
      <div
        className={`relative overflow-hidden px-2 py-2 pl-3 transition-all duration-300 ${
          isCloseSidebarLeft ? "w-0 opacity-0" : "w-1/4 opacity-100"
        }`}
      >
        {!isCloseSidebarLeft && <BuilderSidebarLeft />}
      </div>

      {/* MAIN CONTENT */}
      <div className="relative flex-1 p-1">
        <div className="absolute left-0 top-1/2 text-2xl text-primary">
          <button onClick={() => setIsCloseSidebarLeft(!isCloseSidebarLeft)}>
            {isCloseSidebarLeft ? (
              <IoMdArrowDropright />
            ) : (
              <IoMdArrowDropleft />
            )}
          </button>
        </div>
        <div className="absolute right-0 top-1/2 text-2xl text-primary">
          <button onClick={() => setIsCloseSidebarRight(!isCloseSidebarRight)}>
            {isCloseSidebarRight ? (
              <IoMdArrowDropleft />
            ) : (
              <IoMdArrowDropright />
            )}
          </button>
        </div>
        {/* HEADER */}
        <div className="mx-2 flex items-center justify-between p-3">
          <div className="flex items-center justify-center gap-1">
            <ButtonComponent
              type="primary"
              text="Lưu"
              size="middle"
              icon={<FaSave className="text-lg" />}
              textTooltip="Lưu"
            />
          </div>
          <ButtonComponent
            className="shadow-xl"
            type="primary"
            icon={<MdPlayArrow className="text-xl" />}
            text="Xem trước"
            textTooltip="Xem trước"
            size="middle"
          />
          <ButtonComponent
            type="primary"
            icon={<FaGlobeAmericas className="text-lg" />}
            text="Public"
            textTooltip="Public"
            size="middle"
          />
        </div>
        {/* FORM */}
        <div className="mx-5 h-[calc(100vh-140px)] overflow-auto rounded-lg border-2 border-solid border-primary p-2 scrollbar-thin">
          <BuilderCanvas />
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div
        className={`relative overflow-hidden bg-gray-200 px-2 py-4 pl-3 transition-all duration-300 ${
          isCloseSidebarRight ? "w-0 opacity-0" : "w-1/4 opacity-100"
        }`}
      >
        {!isCloseSidebarRight && <BuilderSidebarRight />}
      </div>
    </div>
  );
};

export default BuilderForm;
