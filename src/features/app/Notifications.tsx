import { BellOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge, Dropdown } from "antd";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "../../hooks";

import { formatDateTime } from "../../utils/functionUtils";

import { store } from "../../redux/store";
import { logout } from "../../redux/authReducer";
import { clearUser } from "../../redux/userReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTER_URL } from "../../constants/routerIndex";
import { getPendingAssignmentService } from "../../services";
import Access from "../../router/Access";
import { ALL_PERMISSIONS } from "../../constants/permissions";
const API_URL = import.meta.env.VITE_API_URL;
const Notifications: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();
  const eventSourceRef = useRef<EventSource | null>(null);
  const retryRef = useRef<boolean>(false);
  const navigate = useNavigate();
  const { data: notifications, isLoading: loading } = useQuery({
    queryKey: ["assignments_pending"],
    queryFn: async () => (await getPendingAssignmentService(user!.id)).data,
    enabled: !!user?.id,
  });

  const connectEventSource = (userId: number, accessToken: string) => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const eventSource = new EventSource(
      `${API_URL}/notifications/events?userId=${userId}&token=${encodeURIComponent(
        accessToken,
      )}`,
      {
        withCredentials: true,
      },
    );

    eventSource.onmessage = (event) => {
      const notification = JSON.parse(JSON.parse(event?.data).data);
      queryClient.invalidateQueries({
        queryKey: ["assignments_pending"],
      });
      toast.success(notification.message);
    };

    eventSource.onerror = async (error) => {
      console.error("SSE error:", error);
      eventSource.close();
      eventSourceRef.current = null;

      if (!retryRef.current) {
        retryRef.current = true;
        try {
          const response = await axios.get(`${API_URL}/auth/refresh_token`, {
            withCredentials: true,
          });
          if (response && response.data && response.data.access_token) {
            const newAccessToken = response.data.access_token;
            localStorage.setItem("access_token", newAccessToken);
            connectEventSource(userId, newAccessToken);
            toast.success("Đã làm mới kết nối thông báo");
          } else {
            toast.error("Không thể làm mới token");
            store.dispatch(logout());
            store.dispatch(clearUser());
          }
        } catch (refreshError) {
          console.error("Refresh token error:", refreshError);
          toast.error("Mất kết nối thông báo. Vui lòng đăng nhập lại.");
        }
      } else {
        toast.error("Không thể kết nối lại thông báo");
      }
      retryRef.current = false;
    };

    eventSourceRef.current = eventSource;
  };

  useEffect(() => {
    if (user?.id) {
      const access_token = window.localStorage.getItem("access_token");
      if (!access_token) {
        toast.error("Vui lòng đăng nhập lại");
        store.dispatch(logout());
        store.dispatch(clearUser());
        return;
      }

      connectEventSource(user.id, access_token);

      return () => {
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
      };
    }
  }, [
    user,
    user?.id,
    queryClient,
    navigate,
    store,
    logout,
    clearUser,
    toast,
    axios,
  ]);

  const menuItems = [
    {
      key: "header",
      label: (
        <div className="text-center text-base font-semibold text-primary">
          Hồ sơ phân công
        </div>
      ),
    },
    ...(loading
      ? [
          {
            key: "loading",
            label: (
              <div className="py-4 text-center text-gray-500">Đang tải...</div>
            ),
          },
        ]
      : notifications?.length === 0
        ? [
            {
              key: "empty",
              label: (
                <div className="py-4 text-center text-gray-500">
                  Không có hồ sơ được phân công!
                </div>
              ),
            },
          ]
        : notifications!.map((msg, idx) => ({
            key: idx.toString(),
            label: (
              <div
                className="cursor-pointer rounded-md border border-gray-200 p-1.5 transition-colors duration-150 hover:bg-gray-50 dark:text-white hover:dark:bg-black/5"
                onClick={() => {
                  navigate(
                    ROUTER_URL.DETAIL_REVIEW_APPLICATION_PAGE(
                      msg?.id.toString(),
                    ),
                  );
                }}
              >
                <div className="flex w-full items-start justify-between">
                  <div className="flex w-2/3 flex-col space-y-1">
                    <div className="truncate font-semibold text-gray-800 dark:text-gray-300">
                      Hồ sơ {msg.form_response.name}
                    </div>
                    <div className="max-w-[200px] truncate text-xs text-gray-600 dark:text-gray-400">
                      Phần điểm: {msg.scoring_section.name}
                    </div>
                  </div>
                  <div className="w-1/3 text-right text-xs text-gray-400">
                    Thời gian giao {formatDateTime(msg.created_at)}
                  </div>
                </div>
              </div>
            ),
          }))),
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={["hover"]}
      placement="bottomRight"
      overlayClassName="w-80 rounded-xl border border-gray-200 bg-white shadow-lg max-h-96 overflow-y-auto dark:bg-gray-800 dark:text-white"
    >
      <Badge count={notifications?.length || 0} size="small" offset={[-2, 2]}>
        <div
          className={`cursor-pointer text-2xl text-primary ${
            notifications && notifications?.length > 0
              ? "animate-[bell-shake_2s_ease-in-out_infinite]"
              : ""
          }`}
        >
          <BellOutlined />
        </div>
      </Badge>
    </Dropdown>
  );
};

export default Notifications;
