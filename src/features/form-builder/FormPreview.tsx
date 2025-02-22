import { useContext } from "react";
import { BuilderContext } from "../../context/form-builder/BuilderContext";
import { FormBlocks } from "../../interfaces/form-block";
import { ConfigProvider } from "antd";

const FormPreview: React.FC = () => {
  const { blocksLayout, backgroundColor, primaryColor, imge_url } =
    useContext(BuilderContext);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
        },
      }}
    >
      <div
        style={{
          backgroundColor,
        }}
        className={`min-h-[calc(100vh-140px)] py-4 scrollbar-thin`}
      >
        <div className="mx-auto flex h-full w-full max-w-3xl flex-col items-center space-y-4 rounded-md">
          <div
            style={{
              backgroundImage: `url(${imge_url})`,
            }}
            className={`h-[135px] w-full rounded-lg bg-gray-300 bg-cover bg-center bg-no-repeat`}
          />
          {blocksLayout.length > 0 && (
            <div className="flex w-full flex-col gap-4">
              {blocksLayout.map((blockLayout) => {
                const FormBlockComponent =
                  FormBlocks[blockLayout.blockType].formComponent;
                return (
                  <FormBlockComponent
                    key={blockLayout.id}
                    blockInstance={blockLayout}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default FormPreview;
