import { FileAddOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TableProps, UploadProps } from "antd";
import { DatePicker, Modal, Select, Table, Upload } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CgExport } from "react-icons/cg";
import { GrPowerReset } from "react-icons/gr";
import * as xlsx from "xlsx";
import ButtonComponent from "../../components/ButtonComponent";
import { IDataUserCreateRequest } from "../../interfaces";
import { createListUsersService } from "../../services";
import { formatDate, paginationOptions } from "../../utils/functionUtils";

const { RangePicker } = DatePicker;
interface IModalImportListUserProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  dataAllRoles: { label: string; value: number }[];
}
interface DataType {
  name: string;
  email: string;
  roleId?: number;
  start_date?: string;
  end_date?: string;
}

const ModalImportListUser: React.FC<IModalImportListUserProps> = ({
  open,
  setOpen,
  dataAllRoles = [],
}) => {
  const queryClient = useQueryClient();
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [dataFile, setDataFile] = useState<DataType[]>([]);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      key: "STT",
      width: 50,
      align: "center",
      render: (_, __, index) => (
        <span className="font-semibold">
          {(current - 1) * pageSize + index + 1}
        </span>
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "roleId",
      key: "roleId",
      render: (roleId) => {
        const role = dataAllRoles.find((item) => item.value === roleId);
        return role?.label || "";
      },
    },
    {
      title: "Ngày kích hoạt",
      dataIndex: "start_date",
      key: "start_date",
      render: (start_date) => (start_date ? formatDate(start_date) : ""),
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "end_date",
      key: "end_date",
      render: (end_date) => (end_date ? formatDate(end_date) : ""),
    },
  ];

  const { Dragger } = Upload;

  const propsUpload: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    beforeUpload: () => {
      setDataFile([]);
    },
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        //
      }
      if (status === "done") {
        if (info.file) {
          const file = info.file.originFileObj;
          const reader = new FileReader();
          reader.onload = () => {
            const data = new Uint8Array(reader.result as ArrayBuffer);
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const dataSheet = xlsx.utils.sheet_to_json<DataType>(sheet, {
              header: ["name", "email"],
              range: 1,
              raw: true,
            });
            setDataFile(dataSheet);
          };

          if (file) {
            reader.readAsArrayBuffer(file);
          }
        }
        toast.success(`File ${info.file.name} được tải lên thành công!.`);
      } else if (status === "error") {
        toast.error(`File ${info.file.name} được tải lên thất bại!.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleExportFileExample = () => {
    try {
      const worksheet = xlsx.utils.json_to_sheet([
        {
          "Họ tên": "Nguyễn Văn A",
          Email: "nguyenvan@gmail.com",
        },
        {
          "Họ tên": "Nguyễn Văn B",
          Email: "nguyenvanb@gmail.com",
        },
      ]);
      xlsx.utils.sheet_add_aoa(worksheet, [["Họ tên", "Email"]], {
        origin: "A1",
      });
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "list user");

      xlsx.writeFile(workbook, "list_user_example.xlsx");
    } catch (error) {
      console.log(error);
    }
  };

  const [fileError, setFileError] = useState([]);
  const handleExportErrorFile = () => {
    try {
      const worksheet = xlsx.utils.json_to_sheet(fileError);
      xlsx.utils.sheet_add_aoa(worksheet, [["row", "email", "isDuplicate"]], {
        origin: "A1",
      });
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "error list users");

      xlsx.writeFile(workbook, "error_list_users.xlsx");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setDataFile([]);
  };

  const mutationCreateListUsers = useMutation({
    mutationFn: async (users: IDataUserCreateRequest[]) => {
      const res = await createListUsersService(users);
      return res;
    },
    onSuccess: (data) => {
      if (data && data.data) {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success(data.message as string);
        setOpen(false);
      }
      if (data && data.error) {
        setFileError(data.message as []);
        if (Array.isArray(data?.message)) {
          (data.message as unknown as { row: number; email: string }[]).forEach(
            (error) => {
              toast.error(
                `Dòng ${error.row}: Email "${error.email}" đã tồn tại.`,
              );
            },
          );
        }
      }
    },
  });

  const handleImport = async () => {
    if (dataFile.length === 0) {
      toast.error("Danh sách không được để trống");
      return;
    }

    const errors: string[] = [];
    const emailSet = new Set();

    dataFile.forEach((item, index) => {
      if (!item.name) {
        errors.push(`Hàng ${index + 1}: Họ tên không được để trống.`);
      }

      if (!item.email) {
        errors.push(`Hàng ${index + 1}: Email không được để trống.`);
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(item.email)) {
          errors.push(`Hàng ${index + 1}: Email không hợp lệ.`);
        }
      }

      if (emailSet.has(item.email)) {
        errors.push(`Hàng ${index + 1}: Email trùng lặp.`);
      }
      emailSet.add(item.email);

      if (!item.roleId) {
        errors.push(`Hàng ${index + 1}: Vai trò không được để trống.`);
      }

      if (!item.start_date) {
        errors.push(`Hàng ${index + 1}: Ngày kích hoạt không được để trống.`);
      } else if (!dayjs(item.start_date).isValid()) {
        errors.push(`Hàng ${index + 1}: Ngày kích hoạt không hợp lệ.`);
      }

      if (!item.end_date) {
        errors.push(`Hàng ${index + 1}: Ngày hết hạn không được để trống.`);
      } else if (!dayjs(item.end_date).isValid()) {
        errors.push(`Hàng ${index + 1}: Ngày hết hạn không hợp lệ.`);
      }

      if (item.start_date && item.end_date) {
        if (!dayjs(item.start_date).isBefore(dayjs(item.end_date))) {
          errors.push(
            `Hàng ${index + 1}: Ngày kích hoạt phải trước ngày hết hạn.`,
          );
        }
      }
    });

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    mutationCreateListUsers.mutate(
      dataFile.map((item) => ({
        ...item,
        roleId: item.roleId ?? 0,
        start_date: item.start_date ?? "",
        end_date: item.end_date ?? "",
      })),
    );
  };

  return (
    <>
      <Modal
        title="Thêm danh sách người dùng"
        open={open}
        onCancel={() => setOpen(false)}
        maskClosable={false}
        destroyOnClose
        okText="Thêm"
        width={1200}
        style={{ top: 40 }}
        afterClose={() => {
          setDataFile([]);
          setFileError([]);
        }}
        onOk={() => {
          handleImport();
        }}
        okButtonProps={{ loading: mutationCreateListUsers.isPending }}
      >
        <Dragger
          {...propsUpload}
          onRemove={() => setDataFile([])}
          customRequest={({ onSuccess }) => {
            setTimeout(() => {
              onSuccess?.("ok");
            }, 1000);
          }}
        >
          <p className="ant-upload-drag-icon">
            <FileAddOutlined />
          </p>
          <p className="ant-upload-text">
            Nhấp hoặc kéo tệp vào khu vực này để tải lên
          </p>
          <p className="ant-upload-hint">
            Hỗ trợ tải lên một hoặc nhiều tệp như .csv, .xlsx, .xls
          </p>
        </Dragger>
        {fileError && fileError.length > 0 && (
          <div className="mt-4 flex justify-end">
            <ButtonComponent
              text="Export file lỗi"
              textTooltip="File lỗi"
              icon={<CgExport className="" />}
              size="middle"
              type="primary"
              onclick={handleExportErrorFile}
              danger
            />
          </div>
        )}
        <Table<DataType>
          columns={columns}
          dataSource={dataFile}
          rowKey={(record) => record.email}
          className="mt-4"
          size="small"
          loading={mutationCreateListUsers.isPending}
          title={() => {
            return (
              <div className="flex justify-between">
                <div className="text-base font-semibold uppercase">
                  Danh sách {dataFile.length || 0} bản ghi từ file
                </div>
                <div className="flex items-center space-x-2">
                  <Select
                    placeholder="Chọn vai trò"
                    onChange={(value) => {
                      setDataFile((prevDataFile) =>
                        prevDataFile?.map((item) => ({
                          ...item,
                          roleId: value,
                        })),
                      );
                    }}
                    size="middle"
                    options={dataAllRoles}
                    style={{ minWidth: "200px" }}
                  />
                  <RangePicker
                    placeholder={["Ngày kích hoạt", "Ngày hết hạn"]}
                    format={"DD/MM/YYYY"}
                    size="middle"
                    onChange={(dates: [Dayjs | null, Dayjs | null] | null) => {
                      if (dates) {
                        setDataFile((prevDataFile) =>
                          prevDataFile?.map((item) => ({
                            ...item,
                            start_date: dates[0]?.format() || "",
                            end_date: dates[1]?.format() || "",
                          })),
                        );
                      }
                    }}
                  />
                  <ButtonComponent
                    text="Tải file mẫu"
                    textTooltip="File mẫu"
                    icon={<CgExport className="" />}
                    size="middle"
                    type="primary"
                    onclick={handleExportFileExample}
                  />
                  <ButtonComponent
                    text=""
                    textTooltip="Làm mới bảng"
                    icon={<GrPowerReset />}
                    type="primary"
                    size="middle"
                    onclick={handleReset}
                  />
                </div>
              </div>
            );
          }}
          bordered
          pagination={paginationOptions(
            current,
            setCurrent,
            pageSize,
            setPageSize,
            dataFile.length | 0,
            "bản ghi",
            ["10", "20", "50", "100", "200"],
          )}
        />
      </Modal>
    </>
  );
};

export default ModalImportListUser;
