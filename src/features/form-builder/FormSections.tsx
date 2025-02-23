import { useQueryClient } from "@tanstack/react-query";
import { Collapse, Descriptions, Tag, Tooltip } from "antd";
import { useContext } from "react";
import { FaListOl, FaRegEdit, FaRegPlusSquare } from "react-icons/fa";
import { LuMousePointerClick } from "react-icons/lu";
import LoadingComponent from "../../components/LoadingComponent";
import { GLOBAL_COLOR } from "../../constants/colorCustom";
import { BuilderContext } from "../../context/form-builder/BuilderContext";
import { IResponse } from "../../interfaces";
import {
  IDataSectionVersionRequest,
  IDataSectionVersionResponse,
} from "../../interfaces/section-versions";
import { createNewVersionSectionService } from "../../services/section-versions/section-versions-service";
import ModalCreateSectionForm from "./ModalCreateSectionForm";
import toast from "react-hot-toast";

const FormSections: React.FC = () => {
  const {
    sectionsForm,
    isLoadingSection,
    selectedSection,
    setBlocksLayout,
    setSelectedSection,
  } = useContext(BuilderContext);
  const queryClient = useQueryClient();
  const createNewVersionSection = async (data: IDataSectionVersionRequest) => {
    try {
      const res: IResponse<IDataSectionVersionResponse> =
        await createNewVersionSectionService(data);
      if (res && res.data) {
        queryClient.invalidateQueries({ queryKey: ["sections"] });
        setBlocksLayout([]);
        toast.success(res.message as string);
      }
      if (res && res.error) {
        toast.error(res.message as string);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[calc(100vh-155px)] w-full overflow-y-auto p-2 text-gray-600 scrollbar-thin">
      {isLoadingSection && <LoadingComponent />}
      <Descriptions
        bordered
        styles={{
          label: {
            display: "none",
          },
          content: {
            padding: "4px",
          },
        }}
        column={1}
        className="mt-2"
        size="default"
        title={
          <div className="flex items-center justify-between text-primary">
            <div className="flex items-center gap-2">
              <FaListOl className="text-lg" />
              <div className="text-lg font-medium">Phần của biểu mẫu</div>
            </div>
            <ModalCreateSectionForm />
          </div>
        }
        items={sectionsForm.map((section) => ({
          key: section.id,
          children: (
            <Collapse
              defaultActiveKey={[selectedSection?.id || ""]}
              size="small"
              items={[
                {
                  styles: {
                    header: {
                      color:
                        selectedSection?.id === section?.id ? GLOBAL_COLOR : "",
                    },
                  },
                  key: section.id,
                  label: (
                    <div className="flex justify-between">
                      <div className="w-3/4 truncate">{section.name}</div>
                      <div className="w-1/4 text-end">
                        <Tag color="default" className="font-semibold">
                          v{`${section.section_versions.version}.0`}
                        </Tag>
                      </div>
                    </div>
                  ),
                  children: (
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Tooltip title="Tạo phiên bản mới">
                          <FaRegPlusSquare
                            onClick={() => {
                              createNewVersionSection({
                                form_section_id: section?.id,
                              });
                            }}
                            className="cursor-pointer text-xl text-blue-400"
                          />
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa tên phần">
                          <FaRegEdit className="cursor-pointer text-xl text-yellow-300" />
                        </Tooltip>
                      </div>
                      <Tooltip title="Chọn để thiết kế">
                        <div
                          onClick={() => {
                            setSelectedSection(section);
                          }}
                          className={`${selectedSection?.id === section.id ? "bg-primary text-white" : ""} flex cursor-pointer items-center justify-center rounded-md border border-primary p-1 text-primary duration-300 hover:bg-primary hover:text-white`}
                        >
                          <LuMousePointerClick className="text-lg" />
                        </div>
                      </Tooltip>
                    </div>
                  ),
                },
              ]}
            />
          ),
        }))}
      />
    </div>
  );
};

export default FormSections;
