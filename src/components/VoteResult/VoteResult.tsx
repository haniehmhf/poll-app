import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useVoteContext } from "../../context/VoteContext";
import "./VoteResult.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const VoteResult = () => {
  const { result, question } = useVoteContext();

  const totalResult = useMemo(() => {
    return Object.values(result).reduce((acc, cur) => acc + cur, 0);
  }, [result]);

  const barData = useMemo(() => {
    const resultOptions = question.options.filter((opt) => result[opt.id] > 0);

    return {
      labels: resultOptions.map((opt) => opt.value),
      datasets: [
        {
          label: "Vote Result",
          data: resultOptions.map((opt) => result[opt.id]),
          backgroundColor: "rgb(244, 132, 132)",
        },
      ],
    };
  }, [question, result]);

  return (
    <div className="vote-result">
      <p>{question.title}</p>
      <Bar options={barOptions} data={barData} />
      <p>Total Vote: {totalResult}</p>
    </div>
  );
};

export default VoteResult;
