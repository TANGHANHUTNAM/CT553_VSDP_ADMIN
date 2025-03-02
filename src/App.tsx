import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import viVN from "antd/es/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import {
  dark,
  GLOBAL_COLOR,
  GLOBAL_COLOR_ERROR,
  GLOBAL_COLOR_SUCCESS,
  GLOBAL_COLOR_TEXT_PRIMARY,
  GLOBAL_COLOR_TEXT_SECONDARY,
} from "./constants/colorCustom";
import { useAppSelector } from "./hooks";
import router from "./router";
import { loadingBarRef } from "./services/apiClient";

dayjs.locale("vi");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Ho_Chi_Minh");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});
function App() {
  const { isDarkMode } = useAppSelector((state) => state.app);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <ConfigProvider
          locale={viVN}
          theme={{
            algorithm: isDarkMode
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
            token: {
              colorPrimary: GLOBAL_COLOR,
              colorSuccess: GLOBAL_COLOR_SUCCESS,
              colorError: GLOBAL_COLOR_ERROR,
              borderRadius: 4,
              colorText: isDarkMode
                ? GLOBAL_COLOR_TEXT_PRIMARY
                : GLOBAL_COLOR_TEXT_SECONDARY,
            },
            components: {
              Layout: {
                algorithm: true,
                headerBg: isDarkMode ? dark.DEFAULT : "#ffff",
                bodyBg: isDarkMode ? "#181818" : GLOBAL_COLOR_TEXT_PRIMARY,
                headerColor: isDarkMode
                  ? GLOBAL_COLOR_TEXT_PRIMARY
                  : dark.DEFAULT,
              },
              Dropdown: {
                colorBgLayout: isDarkMode
                  ? dark.DEFAULT
                  : GLOBAL_COLOR_TEXT_PRIMARY,
              },
              Result: {
                algorithm: true,
              },
              Table: {
                headerBg: isDarkMode ? "" : GLOBAL_COLOR,
                headerColor: isDarkMode ? "" : "#fff",
                headerBorderRadius: 10,
                headerSortActiveBg: isDarkMode ? "" : GLOBAL_COLOR,
                headerSortHoverBg: isDarkMode ? "" : GLOBAL_COLOR,
              },
            },
          }}
        >
          <RouterProvider router={router} />
        </ConfigProvider>
        <LoadingBar color={GLOBAL_COLOR} ref={loadingBarRef} />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={10}
          containerStyle={{
            marginTop: 18,
          }}
          toastOptions={{
            duration: 3000,
            style: {
              paddingInline: 20,
              borderRadius: 4,
              background: isDarkMode ? dark[800] : "#fff",
              fontSize: "1rem",
              maxWidth: "calc(100vw - 40px)",
            },
            success: {
              style: {
                color: GLOBAL_COLOR_SUCCESS,
              },
            },
            error: {
              style: {
                color: GLOBAL_COLOR_ERROR,
              },
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
