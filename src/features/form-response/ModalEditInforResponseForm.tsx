import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SignatureCanvas from "react-signature-canvas";
import CustomReactQuill from "../../components/CustomReactQuill";
import EditComponent from "../../components/EditComponent";
import { STATUS_RESPONSE_FORM } from "../../constants/tableManagement";
import {
  IDataResponseFormUpdateRequest,
  IFieldSection,
  IFormResponsesResponse,
  ISectionsDataFormResponsesResponse,
  IUniversityResponse,
} from "../../interfaces";
import {
  deleteFileService,
  getResponseDetailByIdService,
  updateResponseService,
  uploadFileService,
} from "../../services";
import UploaderEditResponse from "./UploaderEditResponse";

dayjs.extend(utc);
dayjs.extend(timezone);

const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

interface IModalEditInforResponseFormProps {
  record: IFormResponsesResponse;
  universities: IUniversityResponse[] | undefined;
}

interface ISignatureData {
  public_id: string;
  url: string;
}

const ModalEditInforResponseForm: React.FC<
  IModalEditInforResponseFormProps
> = ({ record, universities }) => {
  const queryClient = useQueryClient();
  const signatureRefs = useRef<{ [key: string]: SignatureCanvas | null }>({});
  const [open, setOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [signatures, setSignatures] = useState<{
    [key: string]: ISignatureData;
  }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const { data: responseDetail, isFetching } = useQuery({
    queryKey: ["formResponses", record.id],
    queryFn: async () => getResponseDetailByIdService(record?.id),
    enabled: !!record?.id && open,
    refetchOnWindowFocus: false,
  });

  const mutationUpdateResponseForm = useMutation({
    mutationFn: (data: IDataResponseFormUpdateRequest) =>
      updateResponseService(record.id, data),
    onSuccess: (data) => {
      if (data && data.data) {
        queryClient.invalidateQueries({
          queryKey: ["formResponses", record.id],
        });
        queryClient.invalidateQueries({
          queryKey: ["formResponses"],
        });
        toast.success(data.message as string);
        setOpen(false);
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
    onError: (error) => {
      console.error("Error updating response form:", error);
      toast.error("Lỗi khi cập nhật thông tin");
    },
  });

  useEffect(() => {
    if (responseDetail?.data) {
      const signatureFields = responseDetail.data.sections
        .flatMap((section) => section.fields)
        .filter((field) => field.blockType === "Signature" && field.value);

      signatureFields.forEach((field) => {
        if (field.value?.url && signatureRefs.current[field.id]) {
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.onload = () => {
            const canvas = signatureRefs.current[field.id]?.getCanvas();
            if (canvas) {
              const ctx = canvas.getContext("2d");
              if (ctx) {
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;

                ctx.clearRect(0, 0, canvasWidth, canvasHeight);

                ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
              }
            }
          };
          img.onerror = () => {
            console.error(
              `Failed to load signature image for field ${field.id}`,
            );
            toast.error("Không thể tải chữ ký");
          };
          img.src = field.value.url;
        }
      });
    }
  }, [responseDetail]);

  const handleClear = (fieldId: string) => {
    if (signatureRefs.current[fieldId]) {
      signatureRefs.current[fieldId]?.clear();
      const currentSignature =
        signatures[fieldId] || form.getFieldValue(fieldId);
      if (currentSignature?.public_id) {
        deleteFileService(currentSignature.public_id)
          .then(() => toast.success("Xóa chữ ký thành công"))
          .catch(() => toast.error("Lỗi khi xóa chữ ký"));
      }
      setSignatures((prev) => {
        const newSignatures = { ...prev };
        delete newSignatures[fieldId];
        return newSignatures;
      });
      form.setFieldValue(fieldId, undefined);
    }
  };

  const handleSave = async (fieldId: string) => {
    if (
      !signatureRefs.current[fieldId] ||
      signatureRefs.current[fieldId]?.isEmpty()
    ) {
      handleClear(fieldId);
      return;
    }

    setLoading((prev) => ({ ...prev, [fieldId]: true }));
    try {
      const dataUrl = signatureRefs.current[fieldId]?.toDataURL("image/png");
      const formData = new FormData();
      formData.append("file", dataUrl!);
      formData.append("upload_preset", UPLOAD_PRESET);

      const uploadResponse = await uploadFileService("image", formData);
      const newSignatureData = {
        url: uploadResponse.data.secure_url,
        public_id: uploadResponse.data.public_id,
      };

      const oldSignature = signatures[fieldId] || form.getFieldValue(fieldId);
      if (oldSignature?.public_id) {
        await deleteFileService(oldSignature.public_id);
      }

      setSignatures((prev) => ({
        ...prev,
        [fieldId]: newSignatureData,
      }));
      form.setFieldValue(fieldId, newSignatureData);
      toast.success("Lưu chữ ký thành công");
    } catch (error) {
      console.error(`Error saving signature for field ${fieldId}:`, error);
      toast.error("Lỗi khi lưu chữ ký");
    } finally {
      setLoading((prev) => ({ ...prev, [fieldId]: false }));
    }
  };

  const onFinish = (values: any) => {
    const updatedData = {
      name: values.name,
      email: values.email,
      phone_number: values.phone_number,
      university: values.university ?? null,
      status: values.status,
      dynamic_fields: Object.keys(values).reduce((acc: any, key: string) => {
        if (
          !["name", "email", "phone_number", "university", "status"].includes(
            key,
          )
        ) {
          acc[key] = values[key];
        }
        return acc;
      }, {}),
    };
    console.log(updatedData);
    mutationUpdateResponseForm.mutate(updatedData);
  };

  const renderField = (field: IFieldSection) => {
    switch (field.blockType) {
      case "InputText":
        return <Input />;
      case "TextArea":
        return <Input.TextArea />;
      case "InputNumber":
        return <InputNumber />;
      case "EditorText":
        return <CustomReactQuill />;
      case "SelectOption":
        return (
          <Select>
            {field.options?.map((option: string) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        );
      case "CheckBox":
        return (
          <Select mode="multiple">
            {field.options?.map((option: string) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        );
      case "RadioSelect":
        return (
          <Radio.Group>
            {field.options?.map((option: string) => (
              <Radio key={option} value={option}>
                {option}
              </Radio>
            ))}
          </Radio.Group>
        );
      case "DatePicker":
        return <DatePicker format={"DD/MM/YYYY"} />;
      case "TimePicker":
        return <TimePicker />;
      case "RangePicker":
        return <DatePicker.RangePicker format={"DD/MM/YYYY"} />;
      case "Uploader":
        return (
          <>
            <UploaderEditResponse field={field as IFieldSection} form={form} />
          </>
        );

      case "Signature":
        return (
          <div className="flex flex-col gap-2">
            <div className="h-[200px] w-[400px]">
              <SignatureCanvas
                ref={(ref) => (signatureRefs.current[field.id] = ref)}
                penColor="black"
                canvasProps={{
                  className: "border border-gray-300 cursor-default",
                  width: 400,
                  height: 200,
                }}
                clearOnResize={false}
              />
            </div>

            <div className="mt-2 flex justify-start">
              <Button
                className="mr-2"
                size="small"
                onClick={() => handleClear(field.id)}
                type="default"
              >
                Xóa
              </Button>
              <Button
                loading={loading[field.id]}
                className="mr-2"
                size="small"
                onClick={() => handleSave(field.id)}
                type="primary"
              >
                Lưu
              </Button>
            </div>
          </div>
        );

      default:
        return <Input disabled />;
    }
  };

  return (
    <>
      <EditComponent titleTooltip="Chỉnh sửa" onClick={() => setOpen(true)} />
      <Modal
        width={800}
        open={open}
        centered
        loading={isFetching}
        title={`Chỉnh sửa thông tin: ${record?.name || ""}`}
        onCancel={() => setOpen(false)}
        okButtonProps={{ loading: mutationUpdateResponseForm.isPending }}
        onOk={() => form.submit()}
        okText="Lưu"
        cancelText="Hủy"
        afterOpenChange={(visible) => {
          if (visible && responseDetail?.data) {
            form.setFieldsValue({
              name: responseDetail.data.name,
              email: responseDetail.data.email,
              phone_number: responseDetail.data.phone_number,
              status: responseDetail.data.status,
              university: universities?.find(
                (uni) => uni.name === responseDetail?.data?.university,
              )?.id,
              ...responseDetail.data.sections.reduce(
                (acc: any, section: ISectionsDataFormResponsesResponse) => {
                  section.fields.forEach((field: IFieldSection) => {
                    if (
                      field.blockType === "RangePicker" &&
                      field.value &&
                      Array.isArray(field.value)
                    ) {
                      acc[field.id] = field.value.map((val) =>
                        typeof val === "string" || typeof val === "number"
                          ? dayjs.utc(val).tz("Asia/Ho_Chi_Minh")
                          : val,
                      );
                    } else if (
                      field.blockType === "DatePicker" &&
                      field.value &&
                      typeof field.value === "string"
                    ) {
                      acc[field.id] = dayjs
                        .utc(field.value)
                        .tz("Asia/Ho_Chi_Minh");
                    } else if (
                      field.blockType === "TimePicker" &&
                      field.value &&
                      typeof field.value === "string"
                    ) {
                      acc[field.id] = dayjs
                        .utc(field.value)
                        .tz("Asia/Ho_Chi_Minh");
                    } else {
                      acc[field.id] = field.value;
                    }
                  });
                  return acc;
                },
                {},
              ),
            });
          }
        }}
      >
        <div className="max-h-[80vh] overflow-y-auto">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              name: record?.name,
              email: record?.email,
              phone_number: record?.phone_number,
              status: record?.status,
              university: universities?.find(
                (uni) => uni.name === record?.university,
              )?.id,
            }}
          >
            <Form.Item
              label="Họ tên"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone_number"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input />
            </Form.Item>
            {universities && (
              <Form.Item
                label="Tên trường"
                name="university"
                rules={[{ required: true, message: "Vui lòng chọn trường!" }]}
              >
                <Select
                  options={universities.map((uni) => ({
                    label: uni.name,
                    value: uni.id,
                  }))}
                />
              </Form.Item>
            )}
            <Form.Item
              label="Trạng thái"
              name="status"
              rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
            >
              <Select
                options={STATUS_RESPONSE_FORM.map((status) => ({
                  label: status.label,
                  value: status.value,
                }))}
              />
            </Form.Item>
            {responseDetail?.data?.sections.map(
              (section: ISectionsDataFormResponsesResponse) => (
                <div key={section.name} className="mb-4">
                  <h3 className="text-lg font-semibold">{section.name}</h3>
                  {section.fields.map((field: IFieldSection) => (
                    <Form.Item
                      key={field.id}
                      label={field.label}
                      name={field.id}
                      initialValue={
                        field.blockType === "RangePicker" &&
                        field.value &&
                        Array.isArray(field.value)
                          ? field.value.map((val) =>
                              typeof val === "string" || typeof val === "number"
                                ? dayjs.utc(val).tz("Asia/Ho_Chi_Minh")
                                : val,
                            )
                          : field.blockType === "DatePicker" &&
                              field.value &&
                              typeof field.value === "string"
                            ? dayjs.utc(field.value).tz("Asia/Ho_Chi_Minh")
                            : field.blockType === "TimePicker" &&
                                field.value &&
                                typeof field.value === "string"
                              ? dayjs.utc(field.value).tz("Asia/Ho_Chi_Minh")
                              : field.value
                      }
                    >
                      {renderField(field)}
                    </Form.Item>
                  ))}
                </div>
              ),
            )}
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModalEditInforResponseForm;
