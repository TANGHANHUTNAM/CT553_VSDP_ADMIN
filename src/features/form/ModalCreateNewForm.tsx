import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useRef } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import CustomReactQuill from "../../components/CustomReactQuill";
import { SCOPE_FORM } from "../../constants/tableManagement";
import { useAppSelector } from "../../hooks";
import { IDataFormRequest } from "../../interfaces";
import { createFormService } from "../../services";
const { RangePicker } = DatePicker;

interface IModalCreateNewFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface IDataForm {
  name: string;
  description: string;
  scope: string;
  time: [string, string];
}

const ModalCreateNewForm: React.FC<IModalCreateNewFormProps> = ({
  open,
  setOpen,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const quillRef = useRef<ReactQuill>(null);

  const mutationCreateForm = useMutation({
    mutationFn: async (data: IDataFormRequest) => {
      const response = await createFormService(data);
      return response;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        queryClient.invalidateQueries({ queryKey: ["forms"] });
        setOpen(false);
        navigate(`/form-builder/${data.data.id}`);
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    },
  });

  const { user } = useAppSelector((state) => state.user);

  const onCreate = (data: IDataForm) => {
    mutationCreateForm.mutate({
      ...data,
      start_date: data.time[0],
      end_date: data.time[1],
      creator_id: user?.id as number,
      creator_name: user?.name as string,
    });
  };
  return (
    <>
      <Modal
        open={open}
        title="Tạo mới biểu mẫu"
        okText="Tạo"
        cancelText="Hủy"
        maskClosable={false}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: mutationCreateForm.isPending,
        }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        centered
        width={1000}
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            disabled={mutationCreateForm.isPending}
            initialValues={{ modifier: "public" }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="name"
          label="Tên biểu mẫu"
          rules={[
            { required: true, message: "Tên biểu mẫu không được để trống!" },
          ]}
        >
          <Input placeholder="Tên biểu mẫu" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[
            {
              required: true,
              message: "Mô tả không được để trống!",
            },
            {
              validator: (_: unknown, content: string) => {
                const textContent = content.replace(/<(.|\n)*?>/g, "").trim();
                const hasImage = /<img\s+[^>]*src=["'][^"']+["'][^>]*>/i.test(
                  content,
                );

                if (textContent === "" && !hasImage) {
                  return Promise.reject(new Error("Mô tả là bắt buộc!"));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <CustomReactQuill
            quillRef={quillRef}
            onChange={(content) => {
              console.log(content);
              return form.setFieldsValue({ description: content });
            }}
            theme="snow"
            value={form.getFieldValue("description")}
            placeholder="Mô tả thông tin biểu mẫu một cách chi tiết!"
          />
        </Form.Item>
        <Form.Item
          name="scope"
          label="Mục đích"
          rules={[
            {
              required: true,
              message: "Mục đích không được để trống!",
            },
          ]}
        >
          <Select options={SCOPE_FORM} placeholder="Chọn mục đích" />
        </Form.Item>
        <Form.Item
          label="Chọn thời gian hoạt động"
          name={"time"}
          rules={[
            { required: true, message: "Thời gian không được để trống!" },
          ]}
          getValueProps={(value: string[]) => ({
            value: value
              ? [value[0] && dayjs(value[0]), value[1] && dayjs(value[1])]
              : [],
          })}
          normalize={(value: Dayjs[]) => {
            return value
              ? [
                  value[0] && value[0].tz().format(),
                  value[1] && value[1].tz().format(),
                ]
              : [];
          }}
        >
          <RangePicker format={"DD/MM/YYYY"} style={{ width: "100%" }} />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateNewForm;
