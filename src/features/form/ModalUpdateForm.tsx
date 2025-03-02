import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import toast from "react-hot-toast";
import EditorJodit from "../../components/EditorJodit";
import { SCOPE_FORM } from "../../constants/tableManagement";
import { IDataFormRequest, IFormResponse } from "../../interfaces";
import { updateFormService } from "../../services";
const { RangePicker } = DatePicker;

interface IModalUpdateFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  dataDetailForm: IFormResponse | null;
}

interface IDataForm {
  name: string;
  description: string;
  scope: string;
  time: [string, string];
}

const ModalUpdateForm: React.FC<IModalUpdateFormProps> = ({
  open,
  setOpen,
  dataDetailForm,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const mutationUpdateForm = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: IDataFormRequest;
    }) => {
      const response = await updateFormService(id, data);
      return response;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        queryClient.invalidateQueries({ queryKey: ["forms"] });
        setOpen(false);
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    },
  });

  const onCreate = (data: IDataForm) => {
    mutationUpdateForm.mutate({
      id: dataDetailForm?.id as string,
      data: {
        ...data,
        start_date: data.time[0],
        end_date: data.time[1],
      },
    });
  };
  const descriptionValue = Form.useWatch("description", form);
  return (
    <>
      <Modal
        open={open}
        title={`Cập nhật biểu mẫu ${dataDetailForm?.name || ""}`}
        okText="Cập nhật"
        cancelText="Hủy"
        maskClosable={false}
        centered
        width={1000}
        afterOpenChange={(open) => {
          if (!open) {
            form.resetFields();
          }
          if (open && dataDetailForm) {
            form.setFieldsValue({
              name: dataDetailForm.name,
              description: dataDetailForm.description,
              scope: dataDetailForm.scope,
              time: [
                dataDetailForm.start_date && dayjs(dataDetailForm.start_date),
                dataDetailForm.end_date && dayjs(dataDetailForm.end_date),
              ],
            });
          }
        }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: mutationUpdateForm.isPending,
        }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            disabled={mutationUpdateForm.isPending}
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
          <EditorJodit
            content={descriptionValue}
            setContent={(content: string) =>
              form.setFieldValue("description", content)
            }
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

export default ModalUpdateForm;
