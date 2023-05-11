import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { PASTEL_COLORS } from "../../constants";
type Props = {
  label: string;
  labels: string[];
  data: number[];
};
export function PieChart(props: Props) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const { label, labels, data } = props;
  console.log(labels, data);
  const len = labels.length;
  const dataDisplay = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: data,
        backgroundColor: PASTEL_COLORS.slice(0, len),
        borderColor: PASTEL_COLORS.slice(0, len),
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie
      data={dataDisplay}
      style={{ width: "100%", height: "max-content", blockSize: "max-content" }}
    />
  );
}
