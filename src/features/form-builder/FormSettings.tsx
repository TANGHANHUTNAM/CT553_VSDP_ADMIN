import { useContext } from "react";
import { BuilderContext } from "../../context/form-builder/BuilderContext";

const FormSettings: React.FC = () => {
  const { formData } = useContext(BuilderContext);
  return (
    <div className="h-[calc(100vh-155px)] w-full overflow-y-auto p-1 text-gray-600 scrollbar-thin">
      <div className="">Form Name: {formData?.name}</div>
    </div>
  );
};

export default FormSettings;
