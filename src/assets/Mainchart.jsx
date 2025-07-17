import React from 'react';
import ApexCharts from 'react-apexcharts';

const Mainchart = ({ sensorData = [] }) => {
  // ✅ Handle empty or invalid data early
  if (!Array.isArray(sensorData) || sensorData.length === 0) {
    return <div className="text-center text-gray-500 py-8"></div>;
  }

  // ✅ Safely reverse without mutating original
  const reversedData = [...sensorData].reverse();

  // ✅ Create x-axis labels
  const labels = reversedData.map((ele) => {
    const date = ele?.date || '';
    if (date.includes('T') && date.endsWith('Z')) {
      const time = new Date(date).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
      return `${date.split('T')[0]} / ${time}`;
    }
    return date;
  });

  // ✅ Format data safely
  const temperatureData = reversedData.map((item) =>
    typeof item?.Temp === 'number' ? item.Temp : parseFloat(item?.Temp) || 0
  );

  const humidityData = reversedData.map((item) =>
    typeof item?.hume === 'number' ? item.hume : parseFloat(item?.hume) || 0
  );

  // ✅ Chart options
  const chartOptions = {
    chart: {
      type: 'line',
      toolbar: { show: true },
      zoom: { enabled: true },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: ['#FF6384', '#36A2EB'],
    markers: {
      size: 4,
      colors: ['#fff'],
      strokeColors: ['#FF6384', '#36A2EB'],
      strokeWidth: 2,
    },
    xaxis: {
      categories: labels,
      labels: { style: { colors: '#888' } },
      axisBorder: { show: true },
      axisTicks: { show: true },
    },
    yaxis: {
      labels: { show: true },
      axisBorder: { show: true },
      axisTicks: { show: true },
    },
    grid: { show: true },
    tooltip: { enabled: true },
    legend: { show: true, position: 'top' },
  };

  const chartSeries = [
    {
      name: 'Temperature (°C)',
      data: temperatureData,
    },
    {
      name: 'Humidity (%RH)',
      data: humidityData,
    },
  ];

  return (
    <div className="w-full">
      <ApexCharts
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={600}
      />
    </div>
  );
};

export default Mainchart;
