import { Card, Statistic } from "antd";
import CountUp from "react-countup";
interface ITotalStatictisProps {
  total_responses: number;
  new_responses_today: number;
  totalRejected: number;
  totalChecked: number;
}

const TotalStatictis: React.FC<ITotalStatictisProps> = ({
  total_responses,
  new_responses_today,
  totalRejected,
  totalChecked,
}) => {
  return (
    <div className="grid w-full grid-cols-4 gap-3">
      <Card variant="borderless" className="">
        <Statistic
          title={<p className="text-lg">Tổng hồ sơ</p>}
          value={total_responses}
          formatter={(value) => <CountUp end={value as number} />}
        />
      </Card>
      <Card variant="borderless" className="">
        <Statistic
          title={<p className="text-lg">Hôm nay</p>}
          value={new_responses_today}
          formatter={(value) => <CountUp end={value as number} />}
        />
      </Card>
      <Card variant="borderless" className="">
        <Statistic
          title={<p className="text-lg">Đã xử lý</p>}
          value={totalChecked}
          formatter={(value) => <CountUp end={value as number} />}
        />
      </Card>
      <Card variant="borderless" className="">
        <Statistic
          title={<p className="text-lg">Bị từ chối</p>}
          value={totalRejected}
          formatter={(value) => <CountUp end={value as number} />}
        />
      </Card>
    </div>
  );
};

export default TotalStatictis;
