import { useContext } from "react";
import { BuilderContext } from "../../context/form-builder/BuilderContext";
import { FormBlocks } from "../../interfaces/form-block";
import { LuMousePointerClick } from "react-icons/lu";

const FormProperties = () => {
  const { selectedBlockLayout } = useContext(BuilderContext);

  const LayoutPropertyBlock =
    selectedBlockLayout &&
    FormBlocks[selectedBlockLayout.blockType]?.propertiesComponent;
  return !selectedBlockLayout ? (
    <div className="flex h-[calc(100vh-150px)] items-center justify-center gap-2">
      <LuMousePointerClick className="text-2xl text-gray-400" />
      Select a block to view properties
    </div>
  ) : (
    <div className="mt-2 h-[calc(100vh-160px)] w-full overflow-y-auto p-1 text-gray-600 scrollbar-thin">
      <h1 className="mb-2 text-lg"> Properties </h1>
      {LayoutPropertyBlock && (
        <LayoutPropertyBlock blockInstance={selectedBlockLayout} />
      )}
    </div>
  );
};

export default FormProperties;
