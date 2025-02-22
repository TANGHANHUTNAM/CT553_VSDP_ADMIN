import { useContext } from "react";
import { BuilderContext } from "../../../context/form-builder/BuilderContext";

const Border = () => {
  const { primaryColor } = useContext(BuilderContext);
  return (
    <div
      style={{
        backgroundColor: primaryColor,
      }}
      className="min-h-[10px] w-full rounded-t-md"
    />
  );
};

export default Border;
