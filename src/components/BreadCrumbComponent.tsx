import { Breadcrumb } from "antd";

import { CustomRouteObject } from "../router";
import { Link, useLocation } from "react-router-dom";
import { MdHome } from "react-icons/md";

interface IBreadCrumbComponentProps {
  routes: CustomRouteObject[];
}

const generateBreadcrumbItems = (
  routes: CustomRouteObject[],
  pathname: string,
): { title: React.ReactNode; href?: string }[] => {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbItems: { title: React.ReactNode; href?: string }[] = [];

  // Thêm trang chủ vào breadcrumb
  const homeRoute = findRoute(routes, "/");
  if (homeRoute) {
    breadcrumbItems.push({
      title: (
        <span className="flex items-center space-x-1">
          <MdHome className="text-xl text-primary" />
          <span>{homeRoute.breadcrumb}</span>
        </span>
      ),
      href: "/",
    });
  }

  let currentPath = "";

  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const matchedRoute = findRoute(routes, currentPath);
    if (matchedRoute) {
      breadcrumbItems.push({
        title: matchedRoute.breadcrumb || "",
        href: currentPath !== pathname ? currentPath : undefined, // Chỉ thêm `href` nếu không phải mục cuối cùng
      });
    }
  });

  return breadcrumbItems;
};

const findRoute = (
  routes: CustomRouteObject[],
  path: string,
): CustomRouteObject | null => {
  for (const route of routes) {
    if (route.path === path) {
      return route;
    }
    if (route.children) {
      const childMatch = findRoute(route.children, path);
      if (childMatch) return childMatch;
    }
  }
  return null;
};

const findTitlePage = (
  routes: CustomRouteObject[],
  pathname: string,
): CustomRouteObject | undefined => {
  for (const route of routes) {
    if (route.path === pathname) {
      return route; // Trả về route nếu `path` khớp với `pathname`
    }
    if (route.children) {
      const childMatch = findTitlePage(route.children, pathname);
      if (childMatch) {
        return childMatch; // Trả về route con nếu tìm thấy
      }
    }
  }
  return undefined; // Không tìm thấy
};

const BreadCrumbComponent: React.FC<IBreadCrumbComponentProps> = ({
  routes,
}) => {
  const location = useLocation();
  const breadcrumbItems = generateBreadcrumbItems(routes, location.pathname);

  const titlePage = findTitlePage(routes, location.pathname);

  return (
    <div className="mb-3 flex items-center justify-between rounded-md border border-solid border-gray-200 bg-white p-4 text-xl font-semibold dark:rounded-none dark:border-dark-600 dark:bg-dark-800">
      <span className="dark:text-text_primary text-dark-700">
        {titlePage?.breadcrumb}
      </span>
      <Breadcrumb
        style={{}}
        className="dark:text-text_primary text-dark-50"
        separator=">"
        items={breadcrumbItems.map((item) => ({
          title: item.href ? (
            <Link to={item.href}>{item.title}</Link>
          ) : (
            <span className="dark:text-text_primary text-dark-700">
              {item.title}
            </span>
          ),
        }))}
      />
    </div>
  );
};

export default BreadCrumbComponent;
