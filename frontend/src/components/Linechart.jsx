// LineChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const LineChart = () => {
  const data = {
    labels: ['02', '03', '04', '05', '06', '07', '08', '09', '10'],
    datasets: [
      {
        label: 'Plantation',
        data: [20, 15, 25, 30, 20, 25, 30, 35, 40], // Example data points, adjust as needed
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
      title: {
        display: true,
        text: 'Nombre d\'arbres plantés',
        font: {
          family: 'Inter',
          size: 20,
        },
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
          callback: function(value, index, values) {
            return `Day ${value}`;
          },
          color: function(context) {
            return context.active ? 'red' : 'black'; // Highlight label when hovered
          },
          font: {
            weight: function(context) {
              return context.active ? 'bold' : 'normal'; // Bold label when hovered
            },
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
        },
        grid: {
          display: true,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
