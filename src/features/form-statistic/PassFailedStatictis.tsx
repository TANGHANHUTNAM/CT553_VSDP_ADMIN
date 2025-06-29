import { Card, Statistic } from "antd";
import CountUp from "react-countup";
interface IPassFailedStatictisProps {
  totalPassed: number;
  totalFailed: number;
}

const PassFailedStatictis: React.FC<IPassFailedStatictisProps> = ({
  totalPassed,
  totalFailed,
}) => {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      <Card variant="borderless" className="">
        <Statistic
          title={<p className="text-lg">Hồ sơ đậu</p>}
          value={totalPassed}
          formatter={(value) => <CountUp end={value as number} />}
        />
      </Card>
      <Card variant="borderless" className="">
        <Statistic
          title={<p className="text-lg">Hồ sơ rớt</p>}
          value={totalFailed}
          formatter={(value) => <CountUp end={value as number} />}
        />
      </Card>
    </div>
  );
};

export default PassFailedStatictis;
