import { useQuery } from "@tanstack/react-query";
import { Button, Collapse, Empty, Modal, Tag } from "antd";
import { useState } from "react";
import ViewComponent from "../../components/ViewComponent";
import {
  IFieldSection,
  IFormResponse,
  IFormResponsesResponse,
  ISectionsDataFormResponsesResponse,
} from "../../interfaces";
import { getResponseDetailByIdService } from "../../services";
import { colorStatusSubmit, formatDateTime } from "../../utils/functionUtils";
import RenderContentResponse from "./RenderContentResponse";

interface IModalViewInforResponseFormProps {
  formData: IFormResponse;
  record: IFormResponsesResponse;
}

const ModalViewInforResponseForm: React.FC<
  IModalViewInforResponseFormProps
> = ({ record, formData }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: responseDetail, isLoading } = useQuery({
    queryKey: ["formResponses", record.id],
    queryFn: async () => getResponseDetailByIdService(record?.id),
    enabled: !!record?.id && open,
    refetchOnWindowFocus: false,
  });

  const renderSectionContent = (
    section: ISectionsDataFormResponsesResponse,
  ) => {
    const blocks = section.fields.flatMap(
      (field: IFieldSection) => field || [],
    );

    return (
      <>
        {blocks.length > 0 ? (
          <>
            {
              <div className="grid grid-cols-2 gap-4">
                {blocks.map((block: IFieldSection) => (
                  <div key={block.id} className="flex flex-col">
                    <span className="font-semibold text-gray-700">
                      {block.label || "Không có nhãn"}:
                    </span>
                    <div className="mt-1">
                      <RenderContentResponse
                        blockType={block.blockType}
                        value={block.value}
                      />
                    </div>
                  </div>
                ))}
              </div>
            }
          </>
        ) : (
          <div className="mx-auto w-full">
            <Empty />
          </div>
        )}
      </>
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
        loading={isLoading}
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
                {responseDetail?.data?.name || "-"}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Email: </span>
                {responseDetail?.data?.email || "-"}
              </div>
              <div>
                <span className="font-semibold text-gray-700">
                  Số điện thoại:{" "}
                </span>
                {responseDetail?.data?.phone_number || "-"}
              </div>
              {formData?.scope === "SCHOLARSHIP" && (
                <>
                  <div>
                    <span className="font-semibold text-gray-700">
                      Tên trường:{" "}
                    </span>
                    {responseDetail?.data?.university || "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">
                      Tổng điểm:{" "}
                    </span>
                    {responseDetail?.data?.total_final_score ?? "-"}
                  </div>{" "}
                  <div>
                    <span className="font-semibold text-gray-700">
                      Điểm từng phần:{" "}
                    </span>
                    {(responseDetail?.data?.final_scores?.length ?? 0 > 0)
                      ? JSON.stringify(record.final_scores)
                      : "-"}
                  </div>
                </>
              )}

              <div>
                <span className="font-semibold text-gray-700">
                  Trạng thái:{" "}
                </span>
                <Tag
                  color={colorStatusSubmit(
                    responseDetail?.data?.status as
                      | "SUBMITTED"
                      | "CHECKED"
                      | "REJECTED"
                      | "ASSIGNED"
                      | "REVIEWING"
                      | "FAILED"
                      | "PASSED",
                  )}
                >
                  {record?.status || "-"}
                </Tag>
              </div>
              <div>
                <span className="font-semibold text-gray-700">
                  Thời gian nộp:{" "}
                </span>
                {formatDateTime(responseDetail?.data?.created_at as string) ||
                  "-"}
              </div>
            </div>
          </div>
          <Collapse
            items={responseDetail?.data?.sections.map(
              (section, index: number) => {
                return {
                  key: index,
                  label: section.name || `Phần ${index + 1}`,
                  children: renderSectionContent(section),
                };
              },
            )}
            defaultActiveKey={[""]}
            expandIconPosition="end"
          ></Collapse>
        </div>
      </Modal>
    </>
  );
};

export default ModalViewInforResponseForm;
