import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import { IDataFormRequest } from "../../interfaces";
import { createFormService } from "../../services";
import toast from "react-hot-toast";
import { SCOPE_FORM } from "../../constants/tableManagement";
import dayjs, { Dayjs } from "dayjs";
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
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

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
    mutationCreateForm.mutate({
      ...data,
      start_date: data.time[0],
      end_date: data.time[1],
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
          ]}
        >
          <Input placeholder="Mô tả" />
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
