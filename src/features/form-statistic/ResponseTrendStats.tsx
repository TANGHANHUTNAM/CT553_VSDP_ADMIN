import { IResponseTrendDay, IResponseTrendMonth } from "../../interfaces";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DatePicker, Empty, Select, Spin } from "antd";
import dayjs from "dayjs";
import "antd/dist/reset.css";
import { GLOBAL_COLOR } from "../../constants/colorCustom";
const { RangePicker } = DatePicker;
interface IResponseTrendStatsProps {
  start: string;
  setStart: (start: string) => void;
  end: string;
  setEnd: (end: string) => void;
  groupBy: string;
  setGroupBy: (groupBy: string) => void;
  response_trend: IResponseTrendDay[] | IResponseTrendMonth[];
  loading: boolean;
}

const ResponseTrendStats: React.FC<IResponseTrendStatsProps> = ({
  start,
  end,
  groupBy,
  response_trend,
  setStart,
  setEnd,
  setGroupBy,
  loading,
}) => {
  const formattedData = response_trend.map((item) => {
    if (groupBy === "month") {
      const monthItem = item as IResponseTrendMonth;
      return {
        time: `Tháng ${monthItem.month}-${monthItem.year}`,
        count: monthItem.count,
      };
    } else {
      const dayItem = item as IResponseTrendDay;
      return {
        time: `Ngày ${dayjs(dayItem.date).format("DD/MM/YYYY")}`,
        count: dayItem.count,
      };
    }
  });

  // Xử lý thay đổi khoảng thời gian
  const handleDateChange = (dates: any) => {
    if (dates) {
      setStart(dayjs(dates[0]).format("YYYY-MM-DD"));
      setEnd(dayjs(dates[1]).format("YYYY-MM-DD"));
    }
  };

  const handleGroupByChange = (value: string) => {
    setGroupBy(value);
  };

  const isDataEmpty = !response_trend || response_trend.length === 0;
  return (
    <div className="rounded-md bg-white p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <div className="mb-4 text-lg font-medium">
          Thống kê lượt hồ sơ theo thời gian
        </div>
        <div className="flex items-center gap-4">
          <RangePicker
            value={[dayjs(start), dayjs(end)]}
            onChange={handleDateChange}
            format={groupBy === "month" ? "MM/YYYY" : "DD/MM/YYYY"}
            className="w-[300px]"
            allowEmpty={[false, false]}
            picker={groupBy === "month" ? "month" : "date"}
          />
          <Select
            value={groupBy}
            options={[
              {
                value: "day",
                label: "Theo ngày",
              },
              {
                value: "month",
                label: "Theo tháng",
              },
            ]}
            onChange={handleGroupByChange}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex h-[400px] items-center justify-center">
          <Spin tip="Đang tải dữ liệu..." size="large" />
        </div>
      ) : isDataEmpty ? (
        <div className="flex h-[400px] items-center justify-center">
          <Empty
            description={
              <span>
                Không có dữ liệu để hiển thị
                <br />
                Vui lòng chọn khoảng thời gian khác hoặc kiểm tra lại dữ liệu
              </span>
            }
          />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              label={{
                position: "bottom",
                offset: 0,
              }}
            />
            <YAxis
              label={{
                value: "Số lượng hồ sơ",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { textAnchor: "middle" },
              }}
            />
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
            <Line
              type="monotone"
              dataKey="count"
              name="Số lượng hồ sơ"
              stroke={GLOBAL_COLOR}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ResponseTrendStats;
