import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { PASTEL_COLORS } from "../../constants";
import dotStyleCurrency from "../../utils/common";
type Props = {
  label: string;
  labels: string[];
  data: number[];
};
export function PieChart(props: Props) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const { label, labels, data } = props;
  
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
  const options: ChartOptions<"doughnut"> = {
    maintainAspectRatio: true,
    cutout: 60,
    layout: {
      padding: 0,
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        rtl: true,
        labels: {
          padding: 10,
          boxWidth: 15,
        },
      },
    },
  };

  return (
    <>
      <Doughnut
        data={dataDisplay}
        style={{
          width: "100%",
          // height: "max-content",
          // blockSize: "max-content",
        }}
        options={options}
      />
      <p className="text-lg mt-5">
        {`Total: ${dotStyleCurrency(data.reduce((acc, i) => i + acc, 0))}`}
      </p>
    </>
  );
}
