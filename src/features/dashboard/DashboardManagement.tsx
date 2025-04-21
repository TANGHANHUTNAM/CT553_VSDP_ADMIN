import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FormOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Card,
  Col,
  DatePicker,
  Input,
  Row,
  Statistic,
  Switch,
  Table,
  Tabs,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import toast from "react-hot-toast";
import LoadingComponent from "../../components/LoadingComponent";
import { IResponse } from "../../interfaces";
import { getDashboardService } from "../../services";
import { colorStatusSubmit, formatDate } from "../../utils/functionUtils";

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Search } = Input;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

// TypeScript interfaces
interface User {
  id: number;
  name: string;
  email: string;
  role: { name: string };
  active: boolean;
  created_at: string;
}

interface Form {
  id: string;
  name: string;
  scope: string;
  created_at: string;
  is_public: boolean;
}

interface FormResponse {
  id: number;
  form_id: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
  total_final_score: number | null;
  scope: string;
}

interface ResponseAssignment {
  id: number;
  form_response_id: number;
  user_id: number;
  scoring_section_id: number;
  is_completed: boolean;
  completed_at: string | null;
  scoring_section: { name: string };
}

interface ResponseScore {
  date: string;
  averageScore: number;
  section: string;
}

export interface DashboardData {
  users: User[];
  forms: Form[];
  formResponses: FormResponse[];
  responseAssignments: ResponseAssignment[];
  responseScores: ResponseScore[];
}

const DashboardManagement: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [showActiveUsers, setShowActiveUsers] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          toast.error("Vui lòng đăng nhập để truy cập bảng điều khiển");
          return;
        }

        const params = new URLSearchParams({
          page: "1",
          limit: "10",

          ...(dateRange && { startDate: dateRange[0], endDate: dateRange[1] }),
          ...(showActiveUsers && { active: "true" }),
        }).toString();

        const response: IResponse<DashboardData> =
          await getDashboardService(params);

        if (response.statusCode !== 200) {
          throw new Error(
            typeof response.message === "string"
              ? response.message
              : "Không thể tải dữ liệu bảng điều khiển",
          );
        }

        if (!response.data) {
          throw new Error("Dữ liệu không hợp lệ");
        }

        setData(response.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        } else {
          toast.error(error.message || "Không thể tải dữ liệu bảng điều khiển");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dateRange, showActiveUsers]);

  if (loading || !data) {
    return <LoadingComponent />;
  }

  const statusCounts = data.formResponses.reduce(
    (acc, response) => {
      acc[response.status] = (acc[response.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const statusChartData = Object.keys(statusCounts).map((status) => ({
    status:
      {
        SUBMITTED: "Đã nộp",
        CHECKED: "Đã kiểm tra",
        REJECTED: "Bị từ chối",
        PASSED: "Đã đậu",
        FAILED: "Đã rớt",
        INTERVIEWING: "Đang phỏng vấn",
      }[status] || status,
    count: statusCounts[status],
  }));

  const userRoleCounts = data.users.reduce(
    (acc, user) => {
      acc[user.role.name] = (acc[user.role.name] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const roleChartData = Object.keys(userRoleCounts).map((role) => ({
    name: role,
    value: userRoleCounts[role],
  }));

  const scopeStatusChartData = data.formResponses.reduce(
    (acc, response) => {
      const key = `${response.scope}_${response.status}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const stackedBarData = [
    {
      scope: "Học bổng",
      SUBMITTED: scopeStatusChartData["SCHOLARSHIP_SUBMITTED"] || 0,
      CHECKED: scopeStatusChartData["SCHOLARSHIP_CHECKED"] || 0,
      REJECTED: scopeStatusChartData["SCHOLARSHIP_REJECTED"] || 0,
    },
    {
      scope: "Khảo sát",
      SUBMITTED: scopeStatusChartData["SURVEY_SUBMITTED"] || 0,
      INTERVIEWING: scopeStatusChartData["SURVEY_INTERVIEWING"] || 0,
    },
  ];

  const filteredResponses = dateRange
    ? data.formResponses.filter(
        (response) =>
          new Date(response.created_at) >= new Date(dateRange[0]) &&
          new Date(response.created_at) <= new Date(dateRange[1]),
      )
    : data.formResponses;

  const filteredUsers = data.users.filter((user) =>
    showActiveUsers ? user.active : true,
  );

  const filteredFormResponses = filteredResponses.filter((response) =>
    `${response.name} ${response.email}`.toLowerCase(),
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Bảng Điều Khiển
        </h1>
        {/* <div className="flex items-center space-x-4">
          <RangePicker
            onChange={(dates) =>
              setDateRange(
                dates
                  ? [
                      dates[0]!.format("YYYY-MM-DD"),
                      dates[1]!.format("YYYY-MM-DD"),
                    ]
                  : null,
              )
            }
            format="YYYY-MM-DD"
            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
            className="w-64"
          />

          <Button type="primary" icon={<FilterOutlined />}>
            Áp dụng bộ lọc
          </Button>
        </div> */}
      </div>

      <Tabs defaultActiveKey="tong-quan">
        {/* Tab Tổng quan */}
        <TabPane tab="Tổng quan" key="tong-quan">
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Tổng người dùng"
                  value={filteredUsers.length}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Tổng biểu mẫu"
                  value={data.forms.length}
                  prefix={<FormOutlined />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Tổng hồ sơ"
                  value={
                    filteredFormResponses.filter(
                      (r) => r.status === "SUBMITTED",
                    ).length
                  }
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: "#faad14" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Hồ sơ bị từ chối"
                  value={
                    filteredFormResponses.filter((r) => r.status === "REJECTED")
                      .length
                  }
                  prefix={<CloseCircleOutlined />}
                  valueStyle={{ color: "#cf1322" }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} md={24}>
              <Card title="Phân bố trạng thái hồ sơ">
                <BarChart
                  width={800}
                  height={400}
                  data={statusChartData}
                  className="mx-auto"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#1890ff" name="Số lượng" />
                </BarChart>
              </Card>
            </Col>
            {/* <Col xs={24} md={12}>
              <Card title="Xu hướng điểm trung bình">
                <LineChart
                  width={500}
                  height={300}
                  data={data.responseScores}
                  className="mx-auto"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="averageScore"
                    stroke="#3f8600"
                    name="Điểm trung bình"
                  />
                </LineChart>
              </Card>
            </Col> */}
          </Row>
        </TabPane>

        {/* Tab Người dùng */}
        <TabPane tab="Người dùng" key="nguoi-dung">
          <div className="mb-4 flex items-center">
            <span className="mr-2">Chỉ hiển thị người dùng hoạt động:</span>
            <Switch checked={showActiveUsers} onChange={setShowActiveUsers} />
          </div>
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} md={12}>
              <Card title="Phân bố vai trò người dùng">
                <PieChart width={400} height={300} className="mx-auto">
                  <Pie
                    data={roleChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roleChartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Danh sách người dùng">
                <Table
                  dataSource={filteredUsers}
                  columns={[
                    { title: "Tên", dataIndex: "name", key: "name" },
                    { title: "Email", dataIndex: "email", key: "email" },
                    {
                      title: "Vai trò",
                      dataIndex: ["role", "name"],
                      key: "role",
                    },
                    {
                      title: "Hoạt động",
                      dataIndex: "active",
                      key: "active",
                      render: (active) => (active ? "Có" : "Không"),
                    },
                  ]}
                  pagination={{ pageSize: 5 }}
                  rowKey="id"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Biểu mẫu" key="bieu-mau">
          <Row gutter={[16, 16]} className="mb-6">
            {/* <Col xs={24} md={12}>
              <Card title="Hồ sơ theo phạm vi và trạng thái">
                <BarChart
                  width={500}
                  height={300}
                  data={stackedBarData}
                  className="mx-auto"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="scope" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="SUBMITTED"
                    stackId="a"
                    fill="#0088FE"
                    name="Đã nộp"
                  />
                  <Bar
                    dataKey="CHECKED"
                    stackId="a"
                    fill="#00C49F"
                    name="Đã kiểm tra"
                  />
                  <Bar
                    dataKey="REJECTED"
                    stackId="a"
                    fill="#FFBB28"
                    name="Bị từ chối"
                  />
                </BarChart>
              </Card>
            </Col> */}
            <Col xs={24} md={24}>
              <Card title="Danh sách biểu mẫu">
                <Table
                  dataSource={data.forms}
                  columns={[
                    { title: "Tên", dataIndex: "name", key: "name" },

                    {
                      title: "Phạm vi",
                      dataIndex: "scope",
                      key: "scope",
                      render: (scope) =>
                        scope === "SCHOLARSHIP" ? "Học bổng" : "Khảo sát",
                    },
                    {
                      title: "Công khai",
                      dataIndex: "is_public",
                      key: "is_public",
                      render: (pub) => (pub ? "Có" : "Không"),
                    },
                    {
                      title: "Ngày tạo",
                      dataIndex: "created_at",
                      key: "created_at",
                      render: (date) =>
                        new Date(date).toLocaleDateString("vi-VN"),
                    },
                  ]}
                  pagination={{ pageSize: 5 }}
                  rowKey="id"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* Tab Hồ sơ */}
        <TabPane tab="Hồ sơ" key="phan-hoi">
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} md={12}>
              <Card title="Xu hướng nộp hồ sơ">
                <AreaChart
                  width={500}
                  height={300}
                  data={data.formResponses.map((r) => ({
                    date: formatDate(r.created_at),
                    submissions: 1,
                  }))}
                  className="mx-auto"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="submissions"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="Số hồ sơ"
                  />
                </AreaChart>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Danh sách hồ sơ gần đây">
                <Table
                  dataSource={filteredFormResponses}
                  columns={[
                    { title: "Tên người nộp", dataIndex: "name", key: "name" },

                    {
                      title: "Trạng thái",
                      dataIndex: "status",
                      key: "status",
                      render: (status) => (
                        <Tag color={colorStatusSubmit(status)}>{status}</Tag>
                      ),
                    },
                    {
                      title: "Điểm",
                      dataIndex: "total_final_score",
                      key: "total_final_score",
                      render: (score) => score || "Chưa có",
                    },
                    {
                      title: "Ngày nộp",
                      dataIndex: "created_at",
                      key: "created_at",
                      render: (date) =>
                        new Date(date).toLocaleDateString("vi-VN"),
                    },
                  ]}
                  pagination={{ pageSize: 5 }}
                  rowKey="id"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* Tab Chấm điểm */}
        <TabPane tab="Chấm điểm" key="cham-diem">
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} md={12}>
              <Card title="Tiến độ chấm điểm">
                <PieChart width={400} height={300} className="mx-auto">
                  <Pie
                    data={[
                      {
                        name: "Hoàn thành",
                        value: data.responseAssignments.filter(
                          (a) => a.is_completed,
                        ).length,
                      },
                      {
                        name: "Chưa hoàn thành",
                        value: data.responseAssignments.filter(
                          (a) => !a.is_completed,
                        ).length,
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#00C49F" />
                    <Cell fill="#FFBB28" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Danh sách phân công chấm điểm">
                <Table
                  dataSource={data.responseAssignments}
                  columns={[
                    { title: "ID", dataIndex: "id", key: "id" },
                    {
                      title: "Hồ sơ",
                      dataIndex: "form_response_id",
                      key: "form_response_id",
                      render: (id) => {
                        const response = data.formResponses.find(
                          (r) => r.id === id,
                        );
                        return response
                          ? `${response.name} (${response.email})`
                          : "N/A";
                      },
                    },
                    {
                      title: "Phần chấm điểm",
                      dataIndex: ["scoring_section", "name"],
                      key: "scoring_section",
                    },
                    {
                      title: "Trạng thái",
                      dataIndex: "is_completed",
                      key: "is_completed",
                      render: (completed) =>
                        completed ? "Hoàn thành" : "Chưa hoàn thành",
                    },
                    {
                      title: "Ngày hoàn thành",
                      dataIndex: "completed_at",
                      key: "completed_at",
                      render: (date) =>
                        date
                          ? new Date(date).toLocaleDateString("vi-VN")
                          : "N/A",
                    },
                  ]}
                  pagination={{ pageSize: 5 }}
                  rowKey="id"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DashboardManagement;
