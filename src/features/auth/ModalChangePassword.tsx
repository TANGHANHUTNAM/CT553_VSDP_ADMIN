import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Modal, Steps } from "antd";
import { OTPProps } from "antd/es/input/OTP";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IResponse } from "../../interfaces";
import {
  changePasswordService,
  sendMailOTPService,
  verifyOTPService,
} from "../../services";

interface IModalChangePasswordProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalChangePassword: React.FC<IModalChangePasswordProps> = ({
  open,
  setOpen,
}) => {
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const [formSendOTP] = Form.useForm();
  const [formChangePassword] = Form.useForm();

  const [email, setEmail] = useState<string>("");
  const [otp, setOTP] = useState<string>("");
  const [tempToken, setTempToken] = useState<string>("");

  const mutateSendMailOTP = useMutation({
    mutationFn: async (email: string) => {
      const response: IResponse<number> = await sendMailOTPService(email);
      return response;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        setTimeLeft(data.data as number);
        toast.success(data.message as string);
        next();
      }
      if (data && data.error) {
        setTimeLeft(300);
        toast.success("Vui lòng kiểm tra email để lấy mã OTP");
        next();
      }
    },
  });

  const mutationVerifyOTP = useMutation({
    mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
      const response: IResponse<{
        email: string;
        temp_token: string;
      }> = await verifyOTPService(email, otp);
      return response;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        setTempToken(data.data.temp_token);
        setEmail(data.data.email);
        toast.success(data.message as string);
        next();
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
  });

  const mutationChangePassword = useMutation({
    mutationFn: async (data: {
      email: string;
      new_password: string;
      temp_token: string;
    }) => {
      const response: IResponse<string> = await changePasswordService(
        data.email,
        data.new_password,
        data.temp_token,
      );
      return response;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        setOpen(false);
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
  });

  const [timeLeft, setTimeLeft] = useState<number>(0);
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const onChange: OTPProps["onChange"] = (text) => {
    setOTP(text);
  };

  const steps = [
    {
      title: "Nhập email",
      content: (
        <Form
          layout="vertical"
          name="form-send-mail-otp"
          form={formSendOTP}
          className="flex flex-col items-center justify-center"
          initialValues={{ remember: true }}
          onFinish={(values) => {
            console.log(values);
            mutateSendMailOTP.mutate(values);
          }}
        >
          <Form.Item
            className="w-1/2"
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              {
                type: "email",
                message: "Email không đúng định dạng!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Xác thực OTP",
      content: (
        <>
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-center font-semibold">
              Mã OTP đã được gửi đến email của bạn. Vui lòng nhập mã OTP
            </p>
            <Input.OTP
              onChange={onChange}
              variant="outlined"
              size="large"
              formatter={(str) => str.toUpperCase()}
              value={""}
            />
            <div className="text-red-500">
              <span>Thời gian còn lại:</span> {timeLeft} giây
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Nhập mật khẩu mới",
      content: (
        <Form
          layout="vertical"
          name="form-create-password"
          form={formChangePassword}
          className="flex flex-col items-center justify-center"
          initialValues={{ remember: true }}
          onFinish={(values) => {
            const { new_password } = values;
            mutationChangePassword.mutate({
              email,
              new_password,
              temp_token: tempToken,
            });
          }}
        >
          <Form.Item
            className="w-1/2"
            label="Mật khẩu mới"
            name="new_password"
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              {
                min: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự!",
              },
            ]}
          >
            <Input.Password
              id="form-create-password_new_password"
              aria-required="true"
              type="password"
              autoComplete="new_password"
            />
          </Form.Item>
          <Form.Item
            className="w-1/2"
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            dependencies={["new_password"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              {
                min: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu nhập lại không khớp với mật khẩu mới!"),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              id="form-create-password_confirmPassword"
              aria-required="true"
              type="password"
              autoComplete="new_password"
            />
          </Form.Item>
        </Form>
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const contentStyle: React.CSSProperties = {};
  return (
    <>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        destroyOnClose
        maskClosable={false}
        width={800}
        footer={null}
        title="QUÊN MẬT KHẨU"
        afterClose={() => {
          setCurrent(0);
          formSendOTP.resetFields();
          formChangePassword.resetFields();
          setOTP("");
          setTimeLeft(0);
        }}
      >
        <>
          <Steps current={current} items={items} />
          <div
            style={contentStyle}
            className="mt-4 flex min-h-60 flex-col justify-center border-2 border-solid border-gray-200 bg-zinc-200 p-4"
          >
            {steps[current].content}
          </div>
          <div style={{ marginTop: 24 }} className="flex justify-center">
            {current <= 0 && (
              <Button
                htmlType="submit"
                form="form-send-mail-otp"
                type="primary"
                loading={mutateSendMailOTP.isPending}
                onClick={() => {
                  setEmail(formSendOTP.getFieldValue("email"));
                }}
              >
                Tiếp theo
              </Button>
            )}
            {current === 1 && (
              <Button
                htmlType="submit"
                form="form-otp"
                type="primary"
                loading={mutationVerifyOTP.isPending}
                onClick={() => {
                  if (!otp) {
                    toast.error("Vui lòng nhập mã OTP");
                    return;
                  }
                  mutationVerifyOTP.mutate({ email, otp });
                }}
              >
                Gửi
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                form="form-create-password"
                loading={mutationChangePassword.isPending}
              >
                Cập nhật
              </Button>
            )}
            {/* {current > 0 && current < 2 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Trở về
              </Button>
            )} */}
          </div>
        </>
      </Modal>
    </>
  );
};

export default ModalChangePassword;
