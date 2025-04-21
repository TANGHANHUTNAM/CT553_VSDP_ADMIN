import { SortOrder, TablePaginationConfig } from "antd/es/table/interface";
import { v4 as uuidv4 } from "uuid";
import { FormBlockInstance } from "../interfaces/form-block";
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

export const formatTime = (time: string) => {
  return time
    ? new Date(time).toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "-";
};

export const formatDateTime = (date: string) => {
  return date
    ? new Date(date).toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "-";
};

export const formatDate = (date: string) => {
  return date
    ? new Date(date).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "-";
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
  pageSizeOptions?: string[],
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
    pageSizeOptions: pageSizeOptions || ["5", "10", "20", "50"],
  } as TablePaginationConfig | undefined;
};

export const formatGender = (value: string | undefined) => {
  switch (value) {
    case "MALE":
      return "Nam";
    case "FEMALE":
      return "Nữ";
    case "OTHER":
      return "Khác";
    default:
      return "Chưa cập nhật";
  }
};

export const generateUniqueId = () => {
  return uuidv4().replace(/-/g, "").substring(0, 25);
};

export const updateUniqueId = (blocks: FormBlockInstance[]) => {
  blocks.forEach((block) => {
    block.id = generateUniqueId();
    block?.childBlock?.forEach((childBlock) => {
      childBlock.id = generateUniqueId();
    });
  });
  return blocks;
};

export const colorStatusSubmit = (
  status:
    | "SUBMITTED"
    | "CHECKED"
    | "REJECTED"
    | "INTERVIEWING"
    | "FAILED"
    | "PASSED",
) => {
  switch (status) {
    case "SUBMITTED":
      return "purple";
    case "CHECKED":
      return "orange";
    case "REJECTED":
      return "red";
    case "INTERVIEWING":
      return "cyan";
    case "FAILED":
      return "blue";
    default:
      return "green";
  }
};
