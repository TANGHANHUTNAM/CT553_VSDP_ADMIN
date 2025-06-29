import { useContext } from "react";
import { BuilderContext } from "../../../context/form-builder/BuilderContext";

const Border = ({ color }: { color: string }) => {
  const { primaryColor } = useContext(BuilderContext);
  return (
    <div
      style={{
        backgroundColor: primaryColor || color,
      }}
      className="min-h-[12px] w-full rounded-t-lg"
    />
  );
};

export default Border;
