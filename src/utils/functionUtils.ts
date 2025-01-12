import { SortOrder, TablePaginationConfig } from "antd/es/table/interface";

export const colorMethod = (
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
) => {
  switch (method) {
    case "POST":
      return "yellow";
    case "PATCH":
      return "purple";
    case "GET":
      return "green";
    case "DELETE":
      return "red";
    case "PUT":
      return "blue";
    default:
      return "grey";
  }
};

export const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const colorFilterIcon = (filtered: boolean) => {
  return filtered ? "#155BD3" : "#fff";
};

export const colorSortUpIcon = (sortOrder: SortOrder | undefined) => {
  return sortOrder === "ascend" ? "#155BD3" : "#fff";
};

export const colorSortDownIcon = (sortOrder: SortOrder | undefined) => {
  return sortOrder === "descend" ? "#155BD3" : "#fff";
};

export const paginationOptions = (
  current: number,
  setCurrent: (value: number) => void,
  pageSize: number,
  setPageSize: (value: number) => void,
  total: number | 0,
  showTitle?: string,
) => {
  return {
    current,
    pageSize,
    total: total,
    showTotal: (total) => `Tổng ${total} ${showTitle}`,
    showSizeChanger: true,
    onShowSizeChange(current, pageSize) {
      if (pageSize !== current) {
        setCurrent(1);
      }
      setPageSize(pageSize);
    },
    pageSizeOptions: ["5", "10", "20", "50"],
  } as TablePaginationConfig | undefined;
};
