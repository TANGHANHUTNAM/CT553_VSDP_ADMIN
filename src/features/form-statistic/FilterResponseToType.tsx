import { useQuery } from "@tanstack/react-query";
import {
  getBlockTypeFilterService,
  getStatsByFieldService,
} from "../../services";
import { useEffect, useState } from "react";

import { Empty, Select, Spin } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { GLOBAL_COLOR } from "../../constants/colorCustom";
interface IFilterResponseToTypeProps {
  form_id: string;
}

const FilterResponseToType: React.FC<IFilterResponseToTypeProps> = ({
  form_id,
}) => {
  const [fieldId, setFieldId] = useState<string | undefined>(undefined);
  const [chartData, setChartData] = useState<any[]>([]);
  const { data: dataFieldType } = useQuery({
    queryKey: ["getBlockTypeFilterService", form_id],
    queryFn: () => getBlockTypeFilterService(form_id),
    enabled: !!form_id,
    select: (data) => {
      return {
        data:
          data.data?.fields.map((field) => {
            return {
              label: field.label,
              value: field.field_id,
            };
          }) || [],
      };
    },
  });

  const { data: dataStats, isLoading } = useQuery({
    queryKey: ["getStatsByFieldService", form_id, fieldId],
    queryFn: () => getStatsByFieldService(form_id, fieldId as string),
    enabled: !!form_id && !!fieldId,
  });
  useEffect(() => {
    if (dataStats?.data?.stats) {
      const stats = dataStats.data.stats;
      const selectedField = stats[fieldId as string];
      if (selectedField && selectedField.options) {
        const formattedData = Object.entries(selectedField.options).map(
          ([option, value]) => ({
            name: option,
            value: value as number,
          }),
        );
        setChartData(formattedData);
      } else {
        setChartData([]);
      }
    }
  }, [dataStats, fieldId]);
  return (
    <div className="rounded-md bg-white p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex w-full items-center justify-between gap-4">
          <div className="text-lg font-medium">
            Thống kê theo các trường có lựa chọn
          </div>
          <Select
            className="w-[300px]"
            options={dataFieldType ? dataFieldType.data : []}
            placeholder={"Chọn giá trị"}
            value={fieldId}
            onChange={(value) => {
              setFieldId(value);
            }}
          />
        </div>
      </div>
      <div className="flex h-[400px] items-center justify-center">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Spin size="large" />
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={GLOBAL_COLOR} name="Số lượt chọn" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-500">
            <Empty description="Không có dữ liệu để hiển thị" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterResponseToType;
