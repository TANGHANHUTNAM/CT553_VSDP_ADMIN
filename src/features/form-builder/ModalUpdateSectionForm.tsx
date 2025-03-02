import { Form, Input, Modal, Tooltip } from "antd";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { BuilderContext } from "../../context/form-builder/BuilderContext";
import { IResponse } from "../../interfaces";
import {
  IDataFormSectionRequest,
  IDataFormSectionResponse,
} from "../../interfaces/form-sections";
import { updateSectionFormService } from "../../services/form-sections/form-sections-service";

const ModalUpdateSectionForm = ({
  section,
}: {
  section: IDataFormSectionResponse;
}) => {
  const {
    isLoadingSection,
    formData,
    setIsLoadingSection,
    setSectionsForm,
    selectedSection,
    setSelectedSection,
  } = useContext(BuilderContext);
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);

  const updateSectionForm = async (data: IDataFormSectionRequest) => {
    setIsLoadingSection(true);
    try {
      const res: IResponse<IDataFormSectionResponse[]> =
        await updateSectionFormService(section.id, data);
      if (res && res.data) {
        toast.success(res.message as string);
        setSectionsForm(res.data);
        if (selectedSection) {
          setSelectedSection(
            res.data.find((item) => item.id === selectedSection.id) || null,
          );
        }
        setOpen(false);
      }
      if (res && res.error) {
        toast.error(res.message as string);
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      setIsLoadingSection(false);
    }
  };
  return (
    <>
      <Tooltip title="Chỉnh sửa thông tin phần">
        <FaRegEdit
          onClick={() => {
            setOpen(true);
          }}
          className="cursor-pointer text-xl text-yellow-300"
        />
      </Tooltip>
      <Modal
        open={open}
        title={`Thêm phần mới cho biểu mẫu`}
        onCancel={() => setOpen(false)}
        cancelText="Hủy"
        okText="Lưu"
        okButtonProps={{
          disabled: formData?.is_public,
          htmlType: "submit",
          loading: isLoadingSection,
        }}
        afterOpenChange={(open) => {
          if (open) {
            form.setFields([
              { name: "name", value: section.name },
              { name: "description", value: section.description },
            ]);
          }
        }}
        maskClosable={false}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            initialValues={{ modifier: "public" }}
            clearOnDestroy
            onFinish={(values) => {
              updateSectionForm(values);
            }}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="name"
          label="Tên phần"
          rules={[{ required: true, message: "Tên phần không được để trống!" }]}
        >
          <Input readOnly={formData?.is_public} placeholder="Tên phần" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Tên phần không được để trống!" }]}
        >
          <Input.TextArea
            readOnly={formData?.is_public}
            rows={4}
            placeholder="Miêu tả"
          />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalUpdateSectionForm;
