import { Card, FormInstance } from "antd";
import { IFormResponse } from "../../interfaces";
import { FormBlockInstance, FormBlocks } from "../../interfaces/form-block";
import { IDataFormSectionResponse } from "../../interfaces/form-sections";

export const renderFormSections = (
  formPreview: IFormResponse | undefined,
  section: IDataFormSectionResponse | undefined,
  form: FormInstance,
) => {
  const blocks = section?.json_blocks as FormBlockInstance[];
  if (!blocks) return null;
  return (
    <div className="flex w-full flex-col space-y-4">
      {/* Section Infor */}
      <div>
        <div
          style={{
            backgroundColor: formPreview?.primary_color as string,
          }}
          className="min-h-[24px] w-full rounded-t-lg px-5"
        >
          <div className="py-2 text-lg font-medium uppercase">
            {section?.name}
          </div>
        </div>
        <Card
          className={`relative w-full max-w-3xl shadow-sm`}
          style={{
            backgroundColor: formPreview?.block_color as string,
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
              {section?.description}
            </p>
          </div>
        </Card>
      </div>
      {/* Render form */}
      {blocks.length > 0 && (
        <div className="flex w-full flex-col gap-4">
          {blocks.map((blockLayout) => {
            const FormBlockComponent =
              FormBlocks[blockLayout.blockType].formComponent;
            return (
              <FormBlockComponent
                key={blockLayout.id}
                blockInstance={blockLayout}
                primary_color={formPreview?.primary_color as string}
                block_color={formPreview?.block_color as string}
                form={form}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
