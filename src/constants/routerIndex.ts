export const ROUTER_URL = {
  USER_PAGE: "/user",
  ROLE_PAGE: "/role",
  PERMISSION_PAGE: "/permission",
  FORM_PAGE: "/form",
  LOGIN_PAGE: "/login",
  DASHBOARD_PAGE: "/",
  PROFILE_PAGE: "/profile",
  SETTING_PAGE: "/settings",
  FORM_BUILDER_PAGE: (form_id: string) => {
    return `/form-builder/${form_id}`;
  },
  FORM_BUILDER_PREVIEW_PAGE: `viewForm`,
  FORM_BUILDER_RESPONSE_PAGE: `response`,
  FORM_BUILDER_STATISTICS_PAGE: `statistics`,
  NOT_FOUND_PAGE: "*",
};

export const PAGE_NAME = {
  USER: "Quản lý người dùng",
  ROLE: "Quản lý người vai trò",
  PERMISSION: "Quản lý người quyền hạn",
  FORM: "Quản lý biểu mẫu",
  LOGIN: "Trang đăng nhập",
  DASHBOARD: "Trang Dashboard",
  PROFILE: "Trang hồ sơ",
  SETTING: "Trang cài đặt",
  NOT_FOUND: "Không tìm thấy trang",
  NOT_PERMISSION: "Không có quyền truy cập",
  FORM_BUILDER: "Thiết kế biểu mẫu",
  FORM_BUILDER_PREVIEW: "Xem trước biểu mẫu",
  FORM_BUILDER_RESPONSE: "Phản hồi biểu mẫu",
  FORM_BUILDER_STATISTICS: "Thống kê biểu mẫu",
};
