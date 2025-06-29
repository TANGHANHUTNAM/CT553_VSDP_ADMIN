import { Tooltip } from "antd";
import { MdOutlineWbSunny } from "react-icons/md";
import { LuMoon } from "react-icons/lu";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { toggleDarkMode } from "../../redux/appReducer";
import { useEffect } from "react";

const LightDarkMode: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <Tooltip
      mouseLeaveDelay={0.1}
      mouseEnterDelay={0.1}
      title={`${isDarkMode ? "Giao diện tối" : "Giao diện sáng"}`}
    >
      <button
        className="rounded-full p-2"
        onClick={() => {
          dispatch(toggleDarkMode());
        }}
      >
        {isDarkMode ? <LuMoon size={24} /> : <MdOutlineWbSunny size={24} />}
      </button>
    </Tooltip>
  );
};

export default LightDarkMode;
