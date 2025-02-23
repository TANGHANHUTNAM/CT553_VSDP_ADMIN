import { Button, Form, Input, Modal } from "antd";
import { useContext, useState } from "react";
import { IResponse } from "../../interfaces";
import {
  IDataFormSectionRequest,
  IDataFormSectionResponse,
} from "../../interfaces/form-sections";
import { createNewSectionFormService } from "../../services/form-sections/form-sections-service";
import toast from "react-hot-toast";
import { BuilderContext } from "../../context/form-builder/BuilderContext";
import { useQueryClient } from "@tanstack/react-query";

const ModalCreateSectionForm: React.FC = () => {
  const { formData, isLoadingSection, setIsLoadingSection } =
    useContext(BuilderContext);
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const createNewSection = async (data: IDataFormSectionRequest) => {
    setIsLoadingSection(true);
    try {
      const res: IResponse<IDataFormSectionResponse> =
        await createNewSectionFormService({
          ...data,
          form_id: formData?.id || "",
        });
      if (res && res.data) {
        toast.success(res.message as string);
        queryClient.invalidateQueries({ queryKey: ["sections"] });
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
      <Button
        onClick={() => {
          setOpen(true);
        }}
        size="small"
        type="primary"
      >
        Thêm mới
      </Button>
      <Modal
        open={open}
        title={`Thêm phần mới cho biểu mẫu`}
        onCancel={() => setOpen(false)}
        cancelText="Hủy"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: isLoadingSection,
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
              createNewSection(values);
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
          <Input placeholder="Tên phần" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Tên phần không được để trống!" }]}
        >
          <Input.TextArea rows={4} placeholder="Miêu tả" />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateSectionForm;
