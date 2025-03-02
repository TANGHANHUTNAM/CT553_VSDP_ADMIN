import { Collapse, Descriptions, Popconfirm, Tooltip } from "antd";
import { useContext } from "react";
import { FaListOl } from "react-icons/fa";
import { LuMousePointerClick } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { GLOBAL_COLOR } from "../../constants/colorCustom";
import { BuilderContext } from "../../context/form-builder/BuilderContext";
import ModalCreateSectionForm from "./ModalCreateSectionForm";
import ModalUpdateSectionForm from "./ModalUpdateSectionForm";
import toast from "react-hot-toast";
import { IResponse } from "../../interfaces";
import { deleteSectionFormService } from "../../services/form-sections/form-sections-service";
import { IDataFormSectionResponse } from "../../interfaces/form-sections";

const FormSections: React.FC = () => {
  const {
    formData,
    sectionsForm,
    selectedSection,
    setSelectedSection,
    setSectionsForm,
  } = useContext(BuilderContext);

  const handleDeleteSection = async (sectionId: number) => {
    try {
      const res: IResponse<IDataFormSectionResponse[]> =
        await deleteSectionFormService(sectionId);
      if (res && res.data) {
        setSectionsForm(res.data);
        if (selectedSection?.id === sectionId) {
          setSelectedSection(null);
        }
        toast.success(res.message as string);
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra khi xóa phần của biểu mẫu");
    }
  };

  return (
    <div className="h-[calc(100vh-155px)] w-full overflow-y-auto p-2 text-gray-600 scrollbar-thin">
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
          styles: {
            content: {
              backgroundColor: "#fcfcfc",
            },
          },
          children: (
            <Collapse
              defaultActiveKey={
                selectedSection ? [`${selectedSection.id as number}`] : []
              }
              ghost
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
                      <div className="w-3/4 overflow-hidden truncate whitespace-nowrap font-medium">
                        {section.name}
                      </div>
                      <div className="w-1/4 text-end"></div>
                    </div>
                  ),
                  children: (
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <ModalUpdateSectionForm section={section} />
                        <Popconfirm
                          disabled={formData?.is_public}
                          onConfirm={() => {
                            handleDeleteSection(section.id as number);
                          }}
                          title={`Xóa ${section.name}?`}
                          okText="Xóa"
                          cancelText="Hủy"
                        >
                          <MdDelete className="cursor-pointer text-2xl text-red-500" />
                        </Popconfirm>
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
