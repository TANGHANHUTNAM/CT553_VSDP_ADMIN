import { useContext } from "react";
import { LuMousePointerClick } from "react-icons/lu";
import { BuilderContext } from "../../context/form-builder/BuilderContext";
import { FormBlocks } from "../../interfaces/form-block";
import { LuFileLock2 } from "react-icons/lu";

const FormProperties = () => {
  const { selectedBlockLayout, formData } = useContext(BuilderContext);

  const LayoutPropertyBlock =
    selectedBlockLayout &&
    FormBlocks[selectedBlockLayout.blockType]?.propertiesComponent;
  return !selectedBlockLayout ? (
    <div className="flex h-[calc(100vh-150px)] items-center justify-center gap-2 text-primary">
      Chọn khối xem thuộc tính
    </div>
  ) : (
    <div className="mt-2 h-[calc(100vh-160px)] w-full overflow-y-auto p-1 text-gray-600 scrollbar-thin">
      {formData?.is_public ? (
        <div className="flex h-[calc(100vh-210px)] flex-col items-center justify-center text-primary">
          <LuFileLock2 className="mb-1 text-2xl" />
          <p className="text-base">Biểu mẫu đã khóa vì đã công khai!</p>
        </div>
      ) : (
        <p className="mb-2 text-lg">Thuộc tính</p>
      )}
      {LayoutPropertyBlock && (
        <>
          {formData?.is_public ? (
            <div className=""></div>
          ) : (
            <LayoutPropertyBlock blockInstance={selectedBlockLayout} />
          )}
        </>
      )}
    </div>
  );
};

export default FormProperties;
