import { createBrowserRouter, RouteObject } from "react-router-dom";
import { PAGE_NAME, ROUTER_URL } from "../constants/routerIndex";
import LayoutAdmin from "../layout/LayoutAdmin";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import PermissionPage from "../pages/PermissionPage";
import ProfilePage from "../pages/ProfilePage";
import RolePage from "../pages/RolePage";
import SettingPage from "../pages/SettingPage";
import UserPage from "../pages/UserPage";
import ProtectRoute from "./ProtectRoute";
import Access from "./Access";
import { ALL_PERMISSIONS } from "../constants/permissions";

export type CustomRouteObject = RouteObject & {
  breadcrumb?: string;
  children?: CustomRouteObject[];
};

export const routerCustom: CustomRouteObject[] = [
  {
    path: ROUTER_URL.DASHBOARD_PAGE,
    breadcrumb: PAGE_NAME.DASHBOARD,
    element: (
      <ProtectRoute>
        <LayoutAdmin />
      </ProtectRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
        breadcrumb: PAGE_NAME.DASHBOARD,
      },
      {
        path: ROUTER_URL.PROFILE_PAGE,
        element: <ProfilePage />,
        breadcrumb: PAGE_NAME.PROFILE,
      },
      {
        path: ROUTER_URL.SETTING_PAGE,
        element: <SettingPage />,
        breadcrumb: PAGE_NAME.SETTING,
      },
      {
        path: ROUTER_URL.USER_PAGE,
        element: (
          <Access permission={ALL_PERMISSIONS.USER.VIEW} hideChildren={false}>
            <UserPage />
          </Access>
        ),
        breadcrumb: PAGE_NAME.USER,
      },
      {
        path: ROUTER_URL.ROLE_PAGE,
        element: (
          <Access permission={ALL_PERMISSIONS.ROLE.VIEW} hideChildren={false}>
            <RolePage />
          </Access>
        ),
        breadcrumb: PAGE_NAME.ROLE,
      },
      {
        path: ROUTER_URL.PERMISSION_PAGE,
        element: (
          <Access
            permission={ALL_PERMISSIONS.PERMISSION.VIEW}
            hideChildren={false}
          >
            <PermissionPage />
          </Access>
        ),
        breadcrumb: PAGE_NAME.PERMISSION,
      },
    ],
  },
  {
    path: ROUTER_URL.LOGIN_PAGE,
    element: <LoginPage />,
    breadcrumb: PAGE_NAME.LOGIN,
  },
  {
    path: ROUTER_URL.NOT_FOUND_PAGE,
    element: <NotFoundPage />,
    breadcrumb: PAGE_NAME.NOT_FOUND,
  },
];

const router = createBrowserRouter(routerCustom);

export default router;
