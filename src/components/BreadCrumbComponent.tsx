import { Breadcrumb } from "antd";

import { CustomRouteObject } from "../router";
import { Link, matchPath, useLocation } from "react-router-dom";
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
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const matchedRoute = findRoute(routes, currentPath);
    if (matchedRoute) {
      breadcrumbItems.push({
        title: matchedRoute.breadcrumb || "",
        href: index !== segments.length - 1 ? currentPath : undefined,
      });
    }
  });

  return breadcrumbItems;
};

const findRoute = (
  routes: CustomRouteObject[],
  pathname: string,
): CustomRouteObject | null => {
  let matched: CustomRouteObject | null = null;

  for (const route of routes) {
    if (route.children) {
      const childMatch = findRoute(route.children, pathname);
      if (childMatch) return childMatch;
    }

    if (route.path === "*" || !route.path) continue;

    if (matchPath({ path: route.path, end: true }, pathname)) {
      matched = route;
    }
  }

  return matched;
};

const findTitlePage = (
  routes: CustomRouteObject[],
  pathname: string,
): CustomRouteObject | undefined => {
  return findRoute(routes, pathname) ?? undefined;
};

const BreadCrumbComponent: React.FC<IBreadCrumbComponentProps> = ({
  routes,
}) => {
  const location = useLocation();
  const breadcrumbItems = generateBreadcrumbItems(routes, location.pathname);

  const titlePage = findTitlePage(routes, location.pathname);

  return (
    <div className="mb-3 flex items-center justify-between rounded-md border border-solid border-gray-200 bg-white p-4 text-xl font-semibold dark:rounded-none dark:border-dark-600 dark:bg-dark-800">
      <span className="text-dark-700 dark:text-text_primary">
        {titlePage?.breadcrumb}
      </span>
      <Breadcrumb
        style={{}}
        className="text-dark-50 dark:text-text_primary"
        separator=">"
        items={breadcrumbItems.map((item) => ({
          title: item.href ? (
            <Link to={item.href}>{item.title}</Link>
          ) : (
            <span className="text-dark-700 dark:text-text_primary">
              {item.title}
            </span>
          ),
        }))}
      />
    </div>
  );
};

export default BreadCrumbComponent;
