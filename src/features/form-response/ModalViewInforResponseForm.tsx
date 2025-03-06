import { Button, Collapse, Modal, Tag } from "antd";
import { useState } from "react";
import ViewComponent from "../../components/ViewComponent";
import { IDataFormSectionResponse, IFormResponse } from "../../interfaces";
import {
  FormBlockInstance,
  FormNotInputBlockTypes,
} from "../../interfaces/form-block";
import { RenderResponseData } from "./RenderResponseData";
import { colorStatusSubmit, formatDateTime } from "../../utils/functionUtils";

const { Panel } = Collapse;

interface IModalViewInforResponseFormProps {
  record: any;
  formResponse: IFormResponse | undefined;
}

const ModalViewInforResponseForm: React.FC<
  IModalViewInforResponseFormProps
> = ({ record, formResponse }) => {
  console.log("record", record);
  console.log("formResponse", formResponse);
  const [open, setOpen] = useState<boolean>(false);

  const renderSectionContent = (section: IDataFormSectionResponse) => {
    const blocks = section.json_blocks
      .flatMap((block: FormBlockInstance) => block.childBlock || [])
      ?.filter((block) => !FormNotInputBlockTypes.includes(block.blockType));
    return (
      <div className="grid grid-cols-2 gap-4">
        {blocks.map((block: FormBlockInstance) => (
          <div key={block.id} className="flex flex-col">
            <span className="font-semibold text-gray-700">
              {(block.attributes?.label as React.ReactNode) || "Không có nhãn"}:
            </span>
            <div className="mt-1">
              {
                RenderResponseData(
                  block.blockType,
                  record[block.id],
                ) as React.ReactNode
              }
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <ViewComponent
        onClick={() => setOpen(true)}
        titleTooltip={`xem chi tiết ${record?.name || ""}`}
      />
      <Modal
        width={800}
        open={open}
        centered
        title={`Chi tiết phản hồi biểu mẫu ${record?.name || ""}`}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="close" onClick={() => setOpen(false)}>
            Đóng
          </Button>,
        ]}
      >
        <div className="max-h-[60vh] overflow-y-auto">
          <div className="mb-6 border-b pb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold text-gray-700">Họ tên: </span>
                {record?.name || "-"}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Email: </span>
                {record?.email || "-"}
              </div>
              <div>
                <span className="font-semibold text-gray-700">
                  Số điện thoại:{" "}
                </span>
                {record?.phone_number || "-"}
              </div>
              {formResponse?.scope === "SCHOLARSHIP" && (
                <>
                  <div>
                    <span className="font-semibold text-gray-700">
                      Tên trường:{" "}
                    </span>
                    {record?.university || "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">
                      Tổng điểm:{" "}
                    </span>
                    {record?.total_final_score ?? "-"}
                  </div>{" "}
                  <div>
                    <span className="font-semibold text-gray-700">
                      Điểm từng phần:{" "}
                    </span>
                    {record?.final_scores?.length > 0
                      ? JSON.stringify(record.final_scores)
                      : "-"}
                  </div>
                </>
              )}
              <div>
                <span className="font-semibold text-gray-700">
                  Trạng thái:{" "}
                </span>
                <Tag color={colorStatusSubmit(record?.status)}>
                  {record?.status || "-"}
                </Tag>
              </div>
              <div>
                <span className="font-semibold text-gray-700">
                  Thời gian nộp:{" "}
                </span>
                {formatDateTime(record?.created_at) || "-"}
              </div>
            </div>
          </div>
          <Collapse defaultActiveKey={[""]} expandIconPosition="end">
            {formResponse?.form_sections.map(
              (section: IDataFormSectionResponse, index: number) => (
                <Panel
                  header={section.name || `Phần ${index + 1}`}
                  key={index.toString()}
                >
                  {renderSectionContent(section)}
                </Panel>
              ),
            )}
          </Collapse>
        </div>
      </Modal>
    </>
  );
};

export default ModalViewInforResponseForm;
