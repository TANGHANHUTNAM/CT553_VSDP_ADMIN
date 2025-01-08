import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import google from "../../assets/google.png";
import { useAppDispatch } from "../../hooks";
import { IAuthResponse, IResponse } from "../../interfaces";
import { loginSuccess } from "../../redux/authReducer";
import { loginGoogleService } from "../../services";
import { auth, provider } from "../../utils/firsebaseAuth";

const LoginGoogle: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoadingLoginGoogle, setIsLoadingLoginGoogle] =
    useState<boolean>(false);

  const handleLoginGoogle = async () => {
    if (isLoadingLoginGoogle) return;
    setIsLoadingLoginGoogle(true);
    try {
      await signOut(auth);
      const res = await signInWithPopup(auth, provider);
      const accessToken = await res.user.getIdToken();
      if (!accessToken) return;

      // handle API LOGIN
      const resAPI: IResponse<IAuthResponse> = await loginGoogleService({
        access_token: accessToken,
      });
      if (resAPI && resAPI.data) {
        localStorage.setItem("access_token", resAPI.data.access_token);
        dispatch(loginSuccess());
        navigate("/");
        toast.success("Đăng nhập thành công!");
      }
      if (resAPI && resAPI.error) {
        toast.error(resAPI.message as string);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingLoginGoogle(false);
    }
  };

  return (
    <div className="mt-5 flex items-center justify-center gap-1">
      <h1 className="mr-3 text-sm font-medium dark:text-text_primary">Hoặc</h1>
      <button
        onClick={() => {
          handleLoginGoogle();
        }}
        className={`flex w-fit cursor-pointer items-center justify-center space-x-2 rounded border border-solid border-gray-200 bg-slate-100 px-3 py-2 shadow-md transition duration-150 hover:-translate-y-0.5 hover:bg-opacity-50 hover:shadow-lg dark:border-dark-500 dark:bg-dark-500`}
      >
        <img src={google} alt="" className="w-7" />
        <p className="font-medium dark:text-text_primary">Google</p>
      </button>
    </div>
  );
};

export default LoginGoogle;
