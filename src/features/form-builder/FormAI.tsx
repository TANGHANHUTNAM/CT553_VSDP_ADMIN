import { Button, Input, Popconfirm } from "antd";
import { useState } from "react";
import { FaRobot } from "react-icons/fa6";

const FormAI = () => {
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
        placeholder="Chat with AI"
        className="ring-1 ring-primary"
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
        <Button loading={loading} type="primary">
          Generate Form
        </Button>
      </div>
    </div>
  );
};

export default FormAI;
