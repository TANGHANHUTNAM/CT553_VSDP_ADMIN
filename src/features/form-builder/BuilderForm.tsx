import { useContext, useState } from "react";
import { FaGlobeAmericas, FaSave } from "react-icons/fa";
import { FaPaintbrush } from "react-icons/fa6";
import { MdPlayArrow } from "react-icons/md";
import { IResponse } from "../../interfaces";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { GrPowerReset } from "react-icons/gr";
import ButtonComponent from "../../components/ButtonComponent";
import { BuilderContext } from "../../context/form-builder/BuilderContext";
import { FormBlockInstance } from "../../interfaces/form-block";
import { IDataFormSectionLastVersionResponse } from "../../interfaces/form-sections";
import { updateVersionSectionService } from "../../services/form-sections/form-sections-service";
import BuilderCanvas from "./BuilderCanvas";
import BuilderSidebarLeft from "./BuilderSidebarLeft";
import BuilderSidebarRight from "./BuilderSidebarRight";
import FormPreview from "./FormPreview";

const BuilderForm: React.FC = () => {
  const [isCloseSidebarLeft, setIsCloseSidebarLeft] = useState<boolean>(false);
  const [isCloseSidebarRight, setIsCloseSidebarRight] =
    useState<boolean>(false);
  const [isPreviewForm, setIsPreviewForm] = useState<boolean>(false);
  const {
    formData,
    handleSelectedBlockLayout,
    blocksLayout,
    selectedSection,
    setBlocksLayout,
    setSelectedSection,
  } = useContext(BuilderContext);
  const queryClient = useQueryClient();

  const mutationUpdateVersion = useMutation({
    mutationFn: async ({
      id,
      json_blocks,
    }: {
      id: number;
      json_blocks: FormBlockInstance[];
    }) => {
      const res: IResponse<IDataFormSectionLastVersionResponse> =
        await updateVersionSectionService(id, json_blocks);
      return res;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        queryClient.invalidateQueries({ queryKey: ["sections"] });
        setSelectedSection(data.data);
        handleSelectedBlockLayout(null);
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    },
  });
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
          <div className="flex items-center justify-center gap-2">
            <ButtonComponent
              disabled={formData?.is_public || !selectedSection}
              loading={mutationUpdateVersion.isPending}
              type="primary"
              text="Lưu"
              size="middle"
              icon={<FaSave className="text-base" />}
              textTooltip="Lưu"
              onclick={() => {
                mutationUpdateVersion.mutate({
                  id: +(selectedSection?.section_versions.id ?? 0),
                  json_blocks: blocksLayout,
                });
              }}
            />
            <ButtonComponent
              disabled={formData?.is_public}
              type="primary"
              text=""
              size="middle"
              icon={<GrPowerReset className="text-base" />}
              textTooltip="Khởi tạo lại"
              onclick={() => {
                setBlocksLayout([]);
              }}
            />
          </div>
          {isPreviewForm ? (
            <ButtonComponent
              className="shadow-xl"
              type="primary"
              icon={<FaPaintbrush className="text-base" />}
              text="Chỉnh sửa"
              textTooltip="Chỉnh sửa"
              size="middle"
              onclick={() => setIsPreviewForm(!isPreviewForm)}
            />
          ) : (
            <ButtonComponent
              className="shadow-xl"
              type="primary"
              icon={<MdPlayArrow className="text-xl" />}
              text="Xem trước"
              textTooltip="Xem trước"
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
            loading={mutationUpdateVersion.isPending}
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
