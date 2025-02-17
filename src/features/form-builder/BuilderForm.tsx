import { useState } from "react";
import { FaGlobeAmericas, FaSave } from "react-icons/fa";
import { MdPlayArrow } from "react-icons/md";
import { IFormResponse } from "../../interfaces";
import { FaPaintbrush } from "react-icons/fa6";

import ButtonComponent from "../../components/ButtonComponent";
import BuilderCanvas from "./BuilderCanvas";
import BuilderSidebarLeft from "./BuilderSidebarLeft";
import BuilderSidebarRight from "./BuilderSidebarRight";
import FormPreview from "./FormPreview";
interface IBuilderFormProps {
  form?: IFormResponse | null;
}

const BuilderForm: React.FC<IBuilderFormProps> = () => {
  const [isCloseSidebarLeft, setIsCloseSidebarLeft] = useState<boolean>(false);
  const [isCloseSidebarRight, setIsCloseSidebarRight] =
    useState<boolean>(false);
  const [isPreviewForm, setIsPreviewForm] = useState<boolean>(false);
  return (
    <div className="flex bg-white">
      {/* LEFT SIDEBAR */}
      {!isPreviewForm && (
        <div
          className={`relative transition-all duration-300 ${
            isCloseSidebarLeft ? "w-5" : "w-1/4 opacity-100"
          }`}
        >
          <BuilderSidebarLeft
            isCloseSidebarLeft={isCloseSidebarLeft}
            setIsCloseSidebarLeft={setIsCloseSidebarLeft}
          />
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="relative flex-1 pb-3">
        {/* HEADER */}
        <div
          className={`${isPreviewForm ? "mx-auto max-w-screen-md" : ""} flex items-center justify-between p-3`}
        >
          <div className="flex items-center justify-center gap-1">
            <ButtonComponent
              type="primary"
              text="Save"
              size="middle"
              icon={<FaSave className="text-base" />}
              textTooltip="Save"
            />
          </div>
          {isPreviewForm ? (
            <ButtonComponent
              className="shadow-xl"
              type="primary"
              icon={<FaPaintbrush className="text-base" />}
              text="Edit"
              textTooltip="Edit"
              size="middle"
              onclick={() => setIsPreviewForm(!isPreviewForm)}
            />
          ) : (
            <ButtonComponent
              className="shadow-xl"
              type="primary"
              icon={<MdPlayArrow className="text-xl" />}
              text="Preview"
              textTooltip="Preview"
              size="middle"
              onclick={() => setIsPreviewForm(!isPreviewForm)}
            />
          )}

          <ButtonComponent
            type="primary"
            icon={<FaGlobeAmericas className="text-base" />}
            text="Public"
            textTooltip="Public"
            size="middle"
          />
        </div>
        {/* FORM */}
        {isPreviewForm ? <FormPreview /> : <BuilderCanvas />}
      </div>
      {/* RIGHT SIDEBAR */}
      {!isPreviewForm && (
        <div
          className={`relative transition-all duration-300 ${
            isCloseSidebarRight ? "w-5" : "w-1/4 opacity-100"
          }`}
        >
          <BuilderSidebarRight
            isCloseSidebarRight={isCloseSidebarRight}
            setIsCloseSidebarRight={setIsCloseSidebarRight}
          />
        </div>
      )}
    </div>
  );
};

export default BuilderForm;
