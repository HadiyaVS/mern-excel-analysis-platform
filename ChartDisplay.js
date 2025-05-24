import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import html2canvas from 'html2canvas';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartDisplay = ({ data, xAxis, yAxis }) => {
  const chartRef = useRef(null);

  const labels = data.map((item) => item[xAxis]);
  const values = data.map((item) => parseFloat(item[yAxis]));
  const chartData = {
    labels,
    datasets: [
      {
        label: `${yAxis} by ${xAxis}`,
        data: values,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const saveAnalysis = async () => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/analysis', {
      xAxis,
      yAxis,
      chartData: values,
    }, {
      headers: { Authorization: token }
    });
  };

  const downloadChart = async () => {
    const canvas = chartRef.current?.canvas;
    if (canvas) {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'chart.png';
      link.click();
    }
  };

  return (
    <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
      <Bar data={chartData} ref={chartRef} />
      <div className="flex gap-2 mt-4">
        <button onClick={saveAnalysis} className="bg-green-500 text-white px-4 py-2 rounded">Save Analysis</button>
        <button onClick={downloadChart} className="bg-gray-700 text-white px-4 py-2 rounded">Download PNG</button>
      </div>
    </div>
  );
};

export default ChartDisplay;
