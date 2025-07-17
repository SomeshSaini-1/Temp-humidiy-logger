import React from 'react';
import ApexCharts from 'react-apexcharts';

const Mainchart = ({ sensorData = [] }) => {
  // X-axis labels from date
  const labels = sensorData.reverse().map((ele) =>
    // new Date(ele.date).toLocaleTimeString()
        // ele.date
        ele.date.includes('T') && ele.date.endsWith('Z')
                        ? ele.date.split('T')[0] + " / " + new Date(ele.date).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })
                        : ele.date
  );

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
    grid: {
      show: true,
    },
    tooltip: {
      enabled: true,
    },
    legend: {
      show: true,
      position: 'top',
    },
  };

  const chartSeries = [
    {
      name: 'Temperature (°C)',
      data: sensorData.reverse().map((data) => data.Temp),
    },
    {
      name: 'Humidity (%RH)',
      data: sensorData.reverse().map((data) => data.hume),
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
