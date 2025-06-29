import { useContext } from "react";
import { BuilderContext } from "../../context/form-builder/BuilderContext";
import { FormBlocks } from "../../interfaces/form-block";
import { Card, ConfigProvider, Form } from "antd";

const FormPreview: React.FC = () => {
  const {
    blocksLayout,
    selectedSection,
    backgroundColor,
    primaryColor,
    imge_url,
    blockColor,
  } = useContext(BuilderContext);

  const [form] = Form.useForm();
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
        className={`min-h-[calc(100vh-126px)] py-4 scrollbar-thin`}
      >
        <div className="mx-auto flex h-full w-full max-w-screen-sm flex-col items-center space-y-4 rounded-md">
          <div
            style={{
              backgroundImage: `url(${imge_url})`,
            }}
            className={`h-[135px] w-full rounded-lg bg-gray-300 bg-cover bg-center bg-no-repeat`}
          />

          {selectedSection && (
            <div className="mt-4 w-full max-w-full">
              <div
                style={{
                  backgroundColor: primaryColor,
                }}
                className="min-h-[24px] w-full rounded-t-lg px-5"
              >
                <div className="py-2 text-lg font-medium uppercase">
                  {selectedSection?.name}
                </div>
              </div>
              <Card
                className={`relative w-full max-w-3xl shadow-sm`}
                style={{
                  backgroundColor: blockColor,
                  borderRadius: "0.5rem",
                  borderTopLeftRadius: "0",
                  borderTopRightRadius: "0",
                  minHeight: "128px",
                  border: 0,
                }}
                styles={{
                  body: {
                    padding: "4px",
                  },
                }}
              >
                {/* Content */}
                <div className="px-5 py-5">
                  <p className="flex flex-wrap gap-2 font-medium">
                    {selectedSection?.description}
                  </p>
                </div>
              </Card>
            </div>
          )}
          {blocksLayout.length > 0 && (
            <Form
              className="w-full"
              form={form}
              layout="vertical"
              validateTrigger={["onChange", "onBlur"]}
            >
              <div className="flex h-full w-full flex-col gap-4">
                {blocksLayout.map((blockLayout) => {
                  const FormBlockComponent =
                    FormBlocks[blockLayout.blockType].formComponent;
                  return (
                    <FormBlockComponent
                      key={blockLayout.id}
                      blockInstance={blockLayout}
                      primary_color={primaryColor}
                      block_color={blockColor}
                      form={form}
                    />
                  );
                })}
              </div>
            </Form>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default FormPreview;
