import { IoMdSearch } from "react-icons/io";
import InputSearchComponent from "../../components/InputSearchComponent";
import { useState } from "react";
import BlockBtnElement from "../../components/block/BlockBtnElement";
import { FormBlocks } from "../../interfaces/form-block";

const FormComponents: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const filterdBlock = Object.values(FormBlocks).filter((block) =>
    block.blockBtnElement.label?.toLowerCase().includes(search.toLowerCase()),
  );
  const layoutBlocks = filterdBlock.filter(
    (block) => block.blockCategory === "Layout",
  );
  const fieldBlocks = filterdBlock.filter(
    (block) => block.blockCategory === "Field",
  );
  return (
    <div className="mt-3">
      <InputSearchComponent
        onSearch={(value) => setSearch(value)}
        size="middle"
        allowClear
        placeholder="Search..."
        className="w-full"
        enterButton={<IoMdSearch className="text-xl" />}
      />
      <div className="h-[calc(100vh-200px)] w-full overflow-y-auto p-1 text-gray-600 scrollbar-thin">
        {/* Layout */}
        {layoutBlocks.length > 0 && (
          <div className="mt-2">
            <h1 className="text-base font-medium">Layout</h1>
            <div className="mt-2 grid grid-cols-2 gap-3.5">
              {layoutBlocks.map((block) => (
                <BlockBtnElement key={block.blockType} formBlock={block} />
              ))}
            </div>
          </div>
        )}
        {/* Field */}
        {fieldBlocks.length > 0 && (
          <div className="mt-3">
            <h1 className="text-base font-medium">Field</h1>
            <div className="mt-2 grid grid-cols-2 gap-3.5">
              {fieldBlocks.map((block) => (
                <BlockBtnElement key={block.blockType} formBlock={block} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormComponents;
