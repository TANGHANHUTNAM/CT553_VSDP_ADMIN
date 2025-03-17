import { Card, Statistic } from "antd";
import CountUp from "react-countup";
interface ITotalStatictisProps {
  total_responses: number;
  new_responses_today: number;
}

const TotalStatictis: React.FC<ITotalStatictisProps> = ({
  total_responses,
  new_responses_today,
}) => {
  return (
    <div className="flex w-full space-x-2">
      <Card variant="borderless" className="w-1/2">
        <Statistic
          title={<p className="text-lg">Tổng phản hồi</p>}
          value={total_responses}
          formatter={(value) => <CountUp end={value as number} />}
        />
      </Card>
      <Card variant="borderless" className="w-1/2">
        <Statistic
          title={<p className="text-lg">Phản hồi hôm nay</p>}
          value={new_responses_today}
          formatter={(value) => <CountUp end={value as number} />}
        />
      </Card>
    </div>
  );
};

export default TotalStatictis;
