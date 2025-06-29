import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getFormStatisticService } from "../../services";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import ResponseTrendStats from "./ResponseTrendStats";
import TotalStatictis from "./TotalStatictis";
import FilterResponseToType from "./FilterResponseToType";
import UniversityStatsResponse from "./UniversityStatsResponse";
import { IUniversityStats } from "../../interfaces";
import PassFailedStatictis from "./PassFailedStatictis";

interface IFormStatisticManagementProps {
  created_at: string;
  name: string;
  scope: string;
}

const FormStatisticManagement: React.FC<IFormStatisticManagementProps> = ({
  created_at,
  name,
  scope,
}) => {
  const [groupBy, setGroupBy] = useState<string>("day");
  const [start, setStart] = useState<string>(
    dayjs(created_at).format("YYYY-MM-DD"),
  );
  const [end, setEnd] = useState<string>(
    dayjs(new Date()).format("YYYY-MM-DD"),
  );
  const [totalResponses, setTotalResponses] = useState<number>(0);
  const [totalResponseToday, setTotalResponseToday] = useState<number>(0);
  const [totalFailed, setTotalFailed] = useState<number>(0);
  const [totalPassed, setTotalPassed] = useState<number>(0);
  const [totalRejected, setTotalRejected] = useState<number>(0);
  const [totalChecked, setTotalChecked] = useState<number>(0);
  const [university, setUniversity] = useState<IUniversityStats[]>([]);
  const { form_id } = useParams<{ form_id: string }>();
  const { data: dataStats, isLoading } = useQuery({
    queryKey: ["form-stats", form_id, groupBy, start, end],
    queryFn: () =>
      getFormStatisticService({
        form_id: form_id as string,
        group_by: groupBy,
        start,
        end,
      }),
    enabled: !!form_id && !!created_at,
  });

  useEffect(() => {
    if (dataStats?.data) {
      setTotalResponses(dataStats.data.total_responses as number);
      setTotalResponseToday(dataStats.data.new_responses_today as number);
      setTotalFailed(dataStats.data.status_distribution.FAILED as number);
      setTotalPassed(dataStats.data.status_distribution.PASSED as number);
      setTotalRejected(dataStats.data.status_distribution.REJECTED as number);
      setTotalChecked(dataStats.data.status_distribution.CHECKED as number);
      setUniversity(dataStats.data.university_distribution || []);
    }
  }, [dataStats]);
  return (
    <div className="mx-auto flex min-h-[calc(100vh-90px)] w-full max-w-screen-xl flex-col space-y-3 overflow-auto rounded-md bg-[#f4f0f0] px-4 py-2 scrollbar-thin">
      <div className="flex w-full items-center justify-between rounded-md bg-primary px-4 py-2 text-2xl font-semibold text-white">
        <div>Thống kê biểu mẫu: {name}</div>
      </div>
      <TotalStatictis
        total_responses={totalResponses}
        new_responses_today={totalResponseToday}
        totalRejected={totalRejected}
        totalChecked={totalChecked}
      />
      <PassFailedStatictis
        totalPassed={totalPassed}
        totalFailed={totalFailed}
      />
      <ResponseTrendStats
        start={start}
        end={end}
        groupBy={groupBy}
        setEnd={setEnd}
        setStart={setStart}
        response_trend={dataStats?.data?.response_trend || []}
        setGroupBy={setGroupBy}
        loading={isLoading}
      />
      {university.length > 0 && (
        <UniversityStatsResponse university={university} />
      )}

      <FilterResponseToType form_id={form_id as string} />
    </div>
  );
};

export default FormStatisticManagement;
