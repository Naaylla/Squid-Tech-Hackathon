import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const LineChart = () => {
  const data = {
    labels: ['0','01','02', '03', '04', '05', '06', '07', '08', '09', '10','11','12'],
    datasets: [
      {
        label: 'Plantation',
        data: [4000, 3500, 2500, 5000, 2000, 2500, 3000,5000,9000,10000,12000],
        fill: false,
        borderColor: 'rgba(144, 238, 144, 1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
    },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(tooltipItem) {
            return `Plantation: ${tooltipItem.raw}`;
          },
        },
        position: 'nearest',
      },
    },
    hover: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
        },
        grid: {
          display: true,
          drawOnChartArea: false,
          drawTicks: false,
        },
        ticks: {
          callback: function(value) {
            return `${value}`;
          },
          color: 'black',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
