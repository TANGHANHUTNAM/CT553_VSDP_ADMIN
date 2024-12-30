import { createBrowserRouter } from "react-router-dom";
import LayoutAdmin from "../layout/LayoutAdmin";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import SettingPage from "../pages/SettingPage";
import { routerURL } from "../constants/routerIndex";

const router = createBrowserRouter([
  {
    path: routerURL.DASHBOARD_PAGE,
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: routerURL.PROFILE_PAGE,
        element: <ProfilePage />,
      },
      {
        path: routerURL.SETTING_PAGE,
        element: <SettingPage />,
      },
    ],
  },
  {
    path: routerURL.LOGIN_PAGE,
    element: <LoginPage />,
  },
  {
    path: routerURL.NOT_FOUND_PAGE,
    element: <NotFoundPage />,
  },
]);

export default router;
