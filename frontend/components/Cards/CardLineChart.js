import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function CardLineChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy the previous chart instance if it exists (prevents duplicates)
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
            {
              label: new Date().getFullYear(),
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: [65, 78, 66, 44, 56, 67, 75],
              fill: false,
            },
            {
              label: new Date().getFullYear() - 1,
              fill: false,
              backgroundColor: "#fff",
              borderColor: "#fff",
              data: [40, 68, 86, 74, 56, 60, 87],
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            labels: {
              fontColor: "white",
            },
            align: "end",
            position: "bottom",
          },
          scales: {
            x: {
              ticks: { color: "rgba(255,255,255,.7)" },
              grid: { color: "rgba(33, 37, 41, 0.3)" },
            },
            y: {
              ticks: { color: "rgba(255,255,255,.7)" },
              grid: { color: "rgba(255, 255, 255, 0.15)" },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
              Overview
            </h6>
            <h2 className="text-white text-xl font-semibold">Sales value</h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        {/* Chart */}
        <div className="relative h-350-px">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}
