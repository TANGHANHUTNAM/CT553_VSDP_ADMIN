import { useContext } from "react";
import { BuilderContext } from "../../../context/form-builder/BuilderContext";

const PlaceHolder = () => {
  const { primaryColor } = useContext(BuilderContext);
  return (
    <div
      style={
        {
          backgroundColor: primaryColor + "10",
          "--hover-color": primaryColor + "5",
          borderColor: primaryColor,
        } as React.CSSProperties
      }
      className="flex h-28 w-full flex-col items-center justify-center gap-1 border border-dotted text-base font-medium"
    >
      <p
        style={{
          color: primaryColor + "80",
        }}
        className="text-center"
      >
        Kéo thả một khối vào đây
      </p>
    </div>
  );
};

export default PlaceHolder;
