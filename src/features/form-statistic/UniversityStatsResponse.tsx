import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { IUniversityStats } from "../../interfaces";
import { GLOBAL_COLOR } from "../../constants/colorCustom";

// Hàm tạo màu HEX ngẫu nhiên
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

interface IUniversityStatsResponseProps {
  university: IUniversityStats[];
}

const UniversityStatsResponse: React.FC<IUniversityStatsResponseProps> = ({
  university,
}) => {
  const data = university;
  const colors = data.map(() => getRandomColor());

  return (
    <div className="rounded-md bg-white p-4 shadow">
      <div className="mb-4 text-lg font-medium">
        Thống kê lượt hồ sơ theo trường đại học
      </div>
      <div className="h-[400px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="university"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} lượt`, "Trường"]} />
              <Legend />
              <Bar dataKey="count" name="Số lượt hồ sơ" fill={GLOBAL_COLOR}>
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-500">
            Không có dữ liệu để hiển thị
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityStatsResponse;
