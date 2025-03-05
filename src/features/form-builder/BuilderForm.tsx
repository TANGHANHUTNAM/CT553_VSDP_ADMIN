import { useContext, useState } from "react";
import { FaSave } from "react-icons/fa";
import { FaLock, FaPaintbrush, FaUnlock } from "react-icons/fa6";
import { MdPlayArrow } from "react-icons/md";
import { IFormResponse, IResponse } from "../../interfaces";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { GrPowerReset } from "react-icons/gr";
import ButtonComponent from "../../components/ButtonComponent";
import { BuilderContext } from "../../context/form-builder/BuilderContext";

import {
  IDataFormSectionRequest,
  IDataFormSectionResponse,
} from "../../interfaces/form-sections";
import { updateStatusPublicFormService } from "../../services";
import { updateSectionFormService } from "../../services/form-sections/form-sections-service";
import BuilderCanvas from "./BuilderCanvas";
import BuilderSidebarLeft from "./BuilderSidebarLeft";
import BuilderSidebarRight from "./BuilderSidebarRight";
import FormPreview from "./FormPreview";

const BuilderForm: React.FC = () => {
  const queryClient = useQueryClient();
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
    setSectionsForm,
    setFormData,
  } = useContext(BuilderContext);

  const mutationUpdaeStatusPublicForm = useMutation({
    mutationFn: async (is_public: boolean) => {
      const res: IResponse<IFormResponse> = await updateStatusPublicFormService(
        formData?.id as string,
        is_public,
      );
      return res;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        setFormData(data.data);
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    },
  });

  const mutationUpdateSectionId = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: IDataFormSectionRequest;
    }) => {
      const res: IResponse<IDataFormSectionResponse[]> =
        await updateSectionFormService(id, data);
      return res;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        handleSelectedBlockLayout(null);
        setSectionsForm(data.data);
        queryClient.invalidateQueries({
          queryKey: ["forms"],
        });
        toast.success(data.message as string);
      }
      if (data && data.error) {
        toast.error(data.message as string);
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
      <div
        className={`relative flex-1 ${!isPreviewForm ? "pb-3" : "bg-slate-100"}`}
      >
        {/* HEADER */}
        <div
          className={`${isPreviewForm ? "mx-auto max-w-screen-md" : ""} flex items-center justify-between p-3`}
        >
          <div className="flex items-center justify-center gap-2">
            <ButtonComponent
              disabled={formData?.is_public || !selectedSection}
              loading={mutationUpdateSectionId.isPending}
              type="primary"
              text="Lưu"
              size="middle"
              icon={<FaSave className="text-base" />}
              textTooltip="Lưu"
              onclick={() => {
                mutationUpdateSectionId.mutate({
                  id: +(selectedSection?.id ?? 0),
                  data: {
                    json_blocks: blocksLayout,
                  },
                });
              }}
            />
            <ButtonComponent
              disabled={formData?.is_public || !selectedSection}
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
              className="shadow-lg"
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
              disabled={!selectedSection}
              icon={<MdPlayArrow className="text-xl" />}
              text="Xem"
              textTooltip="Xem"
              size="middle"
              onclick={() => setIsPreviewForm(!isPreviewForm)}
            />
          )}

          <ButtonComponent
            type="primary"
            onclick={() => {
              mutationUpdaeStatusPublicForm.mutate(!formData?.is_public);
            }}
            icon={
              !formData?.is_public ? (
                <FaLock className="text-base" />
              ) : (
                <FaUnlock className="text-base" />
              )
            }
            text={`${formData?.is_public ? "Mở khóa biểu mẫu" : "Khóa biểu mẫu"}`}
            textTooltip={`${formData?.is_public ? "Mở khóa biểu mẫu" : "Khóa biểu mẫu"}`}
            size="middle"
            loading={mutationUpdaeStatusPublicForm.isPending}
            danger={formData?.is_public}
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
