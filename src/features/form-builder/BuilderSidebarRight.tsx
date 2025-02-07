import { useContext } from "react";
import { BuilderContext } from "../../context/form-builder/BuilderContext";

interface IBuilderSidebarRightProps {}

const BuilderSidebarRight: React.FC<IBuilderSidebarRightProps> = ({}) => {
  const formData = useContext(BuilderContext);
  return <div>{formData.formData?.name}</div>;
};

export default BuilderSidebarRight;
