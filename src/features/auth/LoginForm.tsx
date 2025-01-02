import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IAuthRequest, IAuthResponse, IResponse } from "../../interfaces";
import { loginSuccess } from "../../redux/authReducer";
import { loginService } from "../../services";
import { ROUTER_URL } from "../../constants/routerIndex";

const LoginForm: React.FC = () => {
  const [loginForm] = Form.useForm<IAuthRequest>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = window.localStorage.getItem("access_token");
  const { isAuth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken && isAuth) {
      navigate(ROUTER_URL.DASHBOARD_PAGE);
    }
  }, [accessToken, isAuth, navigate]);

  const onFinish = async (data: IAuthRequest) => {
    try {
      const res: IResponse<IAuthResponse> = await loginService(data);

      if (res && res.data) {
        window.localStorage.setItem("access_token", res.data.access_token);
        dispatch(loginSuccess());
        navigate("/");
        toast.success("Đăng nhập thành công!");
      }
      if (res && res.error) {
        toast.error(res.message as string);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form
        className="flex flex-col"
        onFinish={onFinish}
        form={loginForm}
        layout="vertical"
        size="large"
      >
        <Form.Item
          label="Email"
          name="username"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email",
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Email không hợp lệ",
            },
          ]}
        >
          <Input
            allowClear
            prefix={<UserOutlined />}
            placeholder="Email"
            autoComplete="username"
          />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu",
            },
            {
              min: 6,
              message: "Mật khẩu phải dài hơn 6 ký tự",
            },
            {
              max: 32,
              message: "Mật khẩu phải ngắn hơn 32 ký tự",
            },
          ]}
        >
          <Input.Password
            autoComplete="current-password"
            allowClear
            prefix={<LockOutlined />}
            placeholder="Mật khẩu"
          />
        </Form.Item>

        <Form.Item>
          <button
            type="submit"
            className="focus:shadow-outline text-text_primary mt-2 w-full rounded bg-primary py-2 font-bold hover:bg-[#25c7e8] focus:outline-none"
          >
            Đăng nhập
          </button>
        </Form.Item>
        <div className="flex cursor-pointer justify-end font-medium underline">
          Quên mật khẩu ?
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
