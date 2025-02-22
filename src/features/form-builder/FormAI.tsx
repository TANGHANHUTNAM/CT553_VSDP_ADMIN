import { Button, Input, Popconfirm } from "antd";
import { useContext, useState } from "react";
import { FaRobot } from "react-icons/fa6";
import { BuilderContext } from "../../context/form-builder/BuilderContext";
import toast from "react-hot-toast";
import { generateFormQuestionPrompt } from "../../utils/prompt-ai";
import { AIChatSession } from "../../utils/google-ai";
import { updateUniqueId } from "../../utils/functionUtils";

const FormAI = () => {
  const { blocksLayout, setBlocksLayout, formData } =
    useContext(BuilderContext);
  const [userRequest, setUserRequest] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const suggestQuestions = () => {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="mb-2 font-medium text-primary">Tạo biểu mẫu mới:</h4>
          <ul className="flex list-inside list-disc flex-col gap-1 text-gray-600">
            <li>
              Bạn muốn tạo loại biểu mẫu nào (ví dụ: biểu mẫu liên hệ, khảo sát,
              đăng ký)?
            </li>
            <li>Mục đích chính của biểu mẫu này là gì?</li>
            <li>Bạn cần thu thập những thông tin gì trong biểu mẫu này?</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-medium text-primary">
            Thêm trường vào biểu mẫu hiện tại:
          </h4>
          <ul className="flex list-inside list-disc flex-col gap-1 text-gray-600">
            <li>Bạn muốn thêm trường nào vào biểu mẫu?</li>
            <li>Bạn cần thu thập thông tin gì tiếp theo?</li>
            <li>Bạn muốn thêm loại trường nhập liệu nào?</li>
          </ul>
        </div>
      </div>
    );
  };

  const generateFormWithAI = async () => {
    if (!userRequest) {
      toast.error("Vui lòng mô tả yêu cầu của bạn");
      return;
    }
    try {
      setLoading(true);
      const formName = formData?.name || "";
      const formDescription = formData?.description || "";
      const PROMPT = generateFormQuestionPrompt(
        userRequest,
        formName,
        formDescription,
        blocksLayout,
      );
      const result = await AIChatSession.sendMessage(PROMPT);

      const responseText = result.response.text();

      const parsedResponse = JSON?.parse(responseText);
      const actionType = parsedResponse?.actionType;
      const generatedBlocks = parsedResponse?.blocks;

      const updatedUniqueIds = updateUniqueId(generatedBlocks);

      setBlocksLayout((prev) => {
        if (actionType === "addQuestions") {
          return [...prev, ...updatedUniqueIds];
        } else if (actionType === "createForm") {
          return [...updatedUniqueIds];
        } else {
          return prev;
        }
      });
      setUserRequest("");
      toast.success("AI đã trả lời yêu cầu của bạn thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
      console.log(error);
    } finally {
      setUserRequest("");
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 h-[calc(100vh-160px)] w-full overflow-y-auto p-1 pr-3 text-gray-600 scrollbar-thin">
      <div className="mb-3 flex items-center justify-start gap-2 font-medium text-primary">
        <FaRobot className="text-lg" />
        <span>Hỏi AI để tạo biểu mẫu:</span>
      </div>
      <Input.TextArea
        rows={5}
        size="large"
        allowClear
        placeholder="Mô tả yêu cầu của bạn..."
        className="ring-1 ring-primary"
        value={userRequest}
        onChange={(e) => setUserRequest(e.target.value)}
      />
      <div className="mt-4 flex items-center justify-between">
        <Popconfirm
          title="AI sẽ giúp bạn tạo biểu mẫu dựa trên yêu cầu của bạn. Hãy mô tả yêu cầu của bạn"
          icon={null}
          description={suggestQuestions}
          trigger={"hover"}
          className=""
          showCancel={false}
          okButtonProps={{ className: "hidden" }}
        >
          <div className="flex cursor-help items-center justify-center rounded-full text-sm font-medium text-primary/50">
            <u>Gợi ý?</u>
          </div>
        </Popconfirm>
        <Button
          disabled={formData?.is_public || userRequest === ""}
          onClick={() => {
            generateFormWithAI();
          }}
          loading={loading}
          type="primary"
        >
          Gửi yêu cầu
        </Button>
      </div>
    </div>
  );
};

export default FormAI;
