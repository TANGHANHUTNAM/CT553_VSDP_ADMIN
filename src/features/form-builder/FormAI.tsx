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
      <div className="">
        <ul className="flex list-inside list-disc flex-col gap-1">
          <li>What is your name?</li>
          <li>What is your email?</li>
          <li>What is your phone number?</li>
          <li>What is your address?</li>
        </ul>
      </div>
    );
  };

  const generateFormWithAI = async () => {
    if (!userRequest) {
      toast.error("Please describe your form requirements");
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
      console.log("parsedResponse", parsedResponse);
      const updatedUniqueIds = updateUniqueId(generatedBlocks);
      console.log("updatedUniqueIds", updatedUniqueIds);
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
      toast.success("Form generated successfully");
    } catch (error) {
      toast.error("Failed to generate form with AI");
      console.log(error);
    } finally {
      setUserRequest("");
      setLoading(false);
    }
  };
  return (
    <div className="mt-2 h-[calc(100vh-160px)] w-full overflow-y-auto p-1 pr-3 text-gray-600 scrollbar-thin">
      <div className="mb-3 flex items-center justify-start gap-2 font-medium text-primary">
        <FaRobot className="text-base" />
        <span>Ask AI for generated form:</span>
      </div>

      <Input.TextArea
        rows={5}
        size="large"
        allowClear
        placeholder="Describe your form requirements..."
        className="ring-1 ring-primary"
        value={userRequest}
        onChange={(e) => setUserRequest(e.target.value)}
      />
      <div className="mt-4 flex items-center justify-between">
        <Popconfirm
          title="AI can suggest questions based on your input"
          icon={null}
          description={suggestQuestions}
          trigger={"hover"}
          className=""
          showCancel={false}
          okButtonProps={{ className: "hidden" }}
        >
          <div className="flex cursor-help items-center justify-center rounded-full text-sm font-medium text-primary/50">
            <u>Help?</u>
          </div>
        </Popconfirm>
        <Button
          onClick={() => {
            generateFormWithAI();
          }}
          loading={loading}
          type="primary"
        >
          Generate Form
        </Button>
      </div>
    </div>
  );
};

export default FormAI;
