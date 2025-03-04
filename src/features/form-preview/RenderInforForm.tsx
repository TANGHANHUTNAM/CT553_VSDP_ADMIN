import { Card, Form, Input, Select } from "antd";
import { IFormResponse } from "../../interfaces";
import parse from "html-react-parser";

export const renderInforForm = (formPreview: IFormResponse | undefined) => {
  return (
    <div className="flex w-full flex-col space-y-4">
      <div>
        <div
          style={{
            backgroundColor: formPreview?.primary_color as string,
          }}
          className="min-h-[12px] w-full rounded-t-lg px-5"
        />
        <Card
          className={`relative w-full max-w-3xl shadow-sm`}
          style={{
            backgroundColor: formPreview?.block_color as string,
            borderRadius: "0.5rem",
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
            minHeight: "128px",
            border: 0,
          }}
          styles={{
            body: {
              padding: "4px",
            },
          }}
        >
          {/* Content */}
          <div className="px-5 py-5">
            <div className="flex flex-wrap gap-2 font-medium">
              <span className="prose">
                {parse(formPreview?.description as string)}
              </span>
            </div>
          </div>
        </Card>
      </div>
      <Card
        className={`relative w-full max-w-3xl shadow-sm`}
        style={{
          backgroundColor: formPreview?.block_color as string,
          borderRadius: "0.5rem",
          minHeight: "128px",
          border: 0,
        }}
        styles={{
          body: {
            padding: "4px",
          },
        }}
      >
        {/* Content */}
        <div className="px-5 py-5">
          <div className="flex flex-col flex-wrap gap-2">
            <span className="text-lg font-semibold uppercase">
              Thứ tự điền đơn
            </span>
            <span className="text-sm">
              Đơn gồm {(formPreview?.form_sections?.length as number) + 1} phần:
            </span>
            <span className="text-base">1. Thông tin người điền biểu mẫu</span>
            {formPreview?.form_sections?.map((section, index) => (
              <span key={section?.id} className="text-base">
                {index + 2}. {section.name}
              </span>
            ))}
          </div>
        </div>
      </Card>
      <div>
        <div
          style={{
            backgroundColor: formPreview?.primary_color as string,
          }}
          className="min-h-[24px] w-full rounded-t-lg px-5"
        >
          <div className="py-2 text-lg font-medium uppercase">
            Thông tin người điền biểu mẫu
          </div>
        </div>
        <Card
          className={`relative w-full max-w-3xl shadow-sm`}
          style={{
            backgroundColor: formPreview?.block_color as string,
            borderRadius: "0.5rem",
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
            minHeight: "128px",
            border: 0,
          }}
          styles={{
            body: {
              padding: "4px",
            },
          }}
        >
          <div className="p-5">
            <Form.Item
              name="name"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
              className="w-2/3"
            >
              <Input
                allowClear
                variant="underlined"
                placeholder="Nhập họ và tên"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              className="w-2/3"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input allowClear variant="underlined" placeholder="Nhập email" />
            </Form.Item>
            <Form.Item
              name="phone_number"
              label="Số điện thoại"
              className="w-2/3"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Số điện thoại phải có 10 chữ số!",
                },
              ]}
            >
              <Input
                allowClear
                variant="underlined"
                placeholder="Nhập số điện thoại"
                maxLength={10}
              />
            </Form.Item>
            {formPreview?.universities && (
              <Form.Item
                name="university"
                label="Trường học"
                className="w-2/3"
                rules={[
                  { required: true, message: "Vui lòng chọn trường học" },
                ]}
              >
                <Select
                  allowClear
                  options={formPreview.universities.map((university) => {
                    return { label: university.name, value: university.id };
                  })}
                />
              </Form.Item>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
