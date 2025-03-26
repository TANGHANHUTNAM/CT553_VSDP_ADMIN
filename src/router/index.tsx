import { createBrowserRouter, RouteObject } from "react-router-dom";
import { ALL_PERMISSIONS } from "../constants/permissions";
import { PAGE_NAME, ROUTER_URL } from "../constants/routerIndex";
import LayoutAdmin from "../layout/LayoutAdmin";
import LayoutFormBuilder from "../layout/LayoutFormBuilder";
import DashboardPage from "../pages/DashboardPage";
import FormBuilderAssignmentPage from "../pages/FormBuilderAssignmentPage";
import FormBuilderPage from "../pages/FormBuilderPage";
import FormBuilderPreviewPage from "../pages/FormBuilderPreviewPage";
import FormBuilderResponsePage from "../pages/FormBuilderResponsePage";
import FormBuilderScoringScholarship from "../pages/FormBuilderScoringScholarship";
import FormBuilderScoringSectionPage from "../pages/FormBuilderScoringSectionPage";
import FormBuilderStatisticsPage from "../pages/FormBuilderStatisticsPage";
import FormPage from "../pages/FormPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import PermissionPage from "../pages/PermissionPage";
import ProfilePage from "../pages/ProfilePage";
import RolePage from "../pages/RolePage";
import SettingPage from "../pages/SettingPage";
import UniversityPage from "../pages/UniversityPage";
import UserPage from "../pages/UserPage";
import Access from "./Access";
import ProtectRoute from "./ProtectRoute";

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
      {
        path: ROUTER_URL.FORM_PAGE,
        element: (
          <Access permission={ALL_PERMISSIONS.FORM.VIEW} hideChildren={false}>
            <FormPage />,
          </Access>
        ),
        breadcrumb: PAGE_NAME.FORM,
      },
      {
        path: ROUTER_URL.UNIVERSITY_PAGE,
        element: <UniversityPage />,
        breadcrumb: PAGE_NAME.UNIVERSITY,
      },
    ],
  },
  {
    path: ROUTER_URL.FORM_BUILDER_PAGE(":form_id"),
    element: (
      <ProtectRoute>
        <LayoutFormBuilder />
      </ProtectRoute>
    ),
    breadcrumb: PAGE_NAME.FORM_BUILDER,
    children: [
      {
        index: true,
        element: (
          <Access
            permission={ALL_PERMISSIONS.FORM.GET_BY_ID}
            hideChildren={false}
          >
            <FormBuilderPage />
          </Access>
        ),
        breadcrumb: PAGE_NAME.FORM_BUILDER,
      },
      {
        path: ROUTER_URL.FORM_BUILDER_PREVIEW_PAGE,
        element: <FormBuilderPreviewPage />,
        breadcrumb: PAGE_NAME.FORM_BUILDER_PREVIEW,
      },
      {
        path: ROUTER_URL.FORM_BUILDER_RESPONSE_PAGE,
        element: <FormBuilderResponsePage />,
        breadcrumb: PAGE_NAME.FORM_BUILDER_RESPONSE,
      },
      {
        path: ROUTER_URL.FORM_BUILDER_STATISTICS_PAGE,
        element: <FormBuilderStatisticsPage />,
        breadcrumb: PAGE_NAME.FORM_BUILDER_STATISTICS,
      },
      {
        path: ROUTER_URL.FORM_BUILDER_SCORING_SECTION_SCHOLARSHIP_PAGE,
        element: <FormBuilderScoringSectionPage />,
        breadcrumb: PAGE_NAME.FORM_BUILDER_SCORING_SECTION_SCHOLARSHIP,
      },
      {
        path: ROUTER_URL.FORM_BUILDER_ASSIGEMENT_SCHOLARSHIP_PAGE,
        element: <FormBuilderAssignmentPage />,
        breadcrumb: PAGE_NAME.FORM_BUILDER_ASSIGEMENT_SCHOLARSHIP,
      },
      {
        path: ROUTER_URL.FORM_BUILDER_SCORING_RESPONSE_PAGE,
        element: <FormBuilderScoringScholarship />,
        breadcrumb: PAGE_NAME.FORM_BUILDER_SCORING_RESPONSE,
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
