import google from "../../assets/google.png";

const LoginGoogle: React.FC = () => {
  return (
    <div className="mt-5 flex items-center justify-center gap-1">
      <h1 className="dark:text-text_primary mr-3 text-sm font-medium">Hoặc</h1>
      <button
        onClick={() => {}}
        className={`flex w-fit cursor-pointer items-center justify-center space-x-2 rounded border border-solid border-gray-200 bg-slate-100 px-3 py-2 shadow-md transition duration-150 hover:-translate-y-0.5 hover:bg-opacity-50 hover:shadow-lg dark:border-dark-500 dark:bg-dark-500`}
      >
        <img src={google} alt="" className="w-7" />
        <p className="dark:text-text_primary font-medium">Google</p>
      </button>
    </div>
  );
};

export default LoginGoogle;
