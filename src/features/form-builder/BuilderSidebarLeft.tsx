import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { LuSettings2 } from "react-icons/lu";
import FormComponents from "./FormComponents";
import FormSettings from "./FormSettings";

interface IBuilderSidebarLeftProps {}

const BuilderSidebarLeft: React.FC<IBuilderSidebarLeftProps> = ({}) => {
  const [tab, setTab] = useState<"component" | "setting">("component");
  return (
    <div className="">
      {/* TAB */}
      <div className="flex w-full items-center justify-between border-b-2 border-gray-300 text-sm text-gray-700">
        <div
          onClick={() => setTab("component")}
          className={`${tab === "component" ? "text-primary" : "text-gray-700"} flex w-1/2 cursor-pointer flex-col items-center py-2`}
        >
          <CiCirclePlus className="text-xl" />
          <div>Components</div>
        </div>
        <div
          onClick={() => setTab("setting")}
          className={`${tab === "setting" ? "text-primary" : "text-gray-700"} flex w-1/2 cursor-pointer flex-col items-center py-2`}
        >
          <LuSettings2 className="text-xl" />
          <div>Settings</div>
        </div>
      </div>
      <div className="">
        {tab === "component" && <FormComponents />}
        {tab === "setting" && <FormSettings />}
      </div>
    </div>
  );
};

export default BuilderSidebarLeft;
