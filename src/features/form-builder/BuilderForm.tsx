import { useContext, useState } from "react";
import { FaGlobeAmericas, FaSave } from "react-icons/fa";
import { FaPaintbrush } from "react-icons/fa6";
import { MdPlayArrow } from "react-icons/md";
import {
  IFormBuilderRequest,
  IFormResponse,
  IResponse,
} from "../../interfaces";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import ButtonComponent from "../../components/ButtonComponent";
import { BuilderContext } from "../../context/form-builder/BuilderContext";
import { saveFormBuilderService } from "../../services";
import BuilderCanvas from "./BuilderCanvas";
import BuilderSidebarLeft from "./BuilderSidebarLeft";
import BuilderSidebarRight from "./BuilderSidebarRight";
import FormPreview from "./FormPreview";
import toast from "react-hot-toast";
import { GrPowerReset } from "react-icons/gr";

const BuilderForm: React.FC = () => {
  const [isCloseSidebarLeft, setIsCloseSidebarLeft] = useState<boolean>(false);
  const [isCloseSidebarRight, setIsCloseSidebarRight] =
    useState<boolean>(false);
  const [isPreviewForm, setIsPreviewForm] = useState<boolean>(false);
  const {
    primaryColor,
    backgroundColor,
    blockColor,
    formData,
    handleSelectedBlockLayout,
    blocksLayout,
    setBlocksLayout,
  } = useContext(BuilderContext);
  const queryClient = useQueryClient();
  const mutationSaveFormBuilder = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: IFormBuilderRequest;
    }) => {
      const res: IResponse<IFormResponse> = await saveFormBuilderService(
        id,
        data,
      );
      return res;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        handleSelectedBlockLayout(null);
        queryClient.invalidateQueries({ queryKey: ["form", data.data.id] });
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
              disabled={formData?.is_public}
              loading={mutationSaveFormBuilder.isPending}
              type="primary"
              text="Lưu"
              size="middle"
              icon={<FaSave className="text-base" />}
              textTooltip="Lưu"
              onclick={() => {
                mutationSaveFormBuilder.mutate({
                  id: formData?.id || "",
                  data: {
                    primary_color: primaryColor,
                    block_color: blockColor,
                    background_color: backgroundColor,
                    json_blocks: blocksLayout,
                  },
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
            loading={mutationSaveFormBuilder.isPending}
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
