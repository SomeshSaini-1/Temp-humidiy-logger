import React,{useState,useEffect} from 'react';
import ApexCharts from 'react-apexcharts';

const Chart = ({ sensorData = [],timestamp = [] }) => {
  // // Generate time labels for x-axis (current time minus n seconds)

  
  // const labels = sensorData.map((_, i) => {
  //   const d = new Date(Date.now() - (sensorData.length - i - 1) * 1000);
  //   return d.toLocaleTimeString();
  // });


// // Use t for labels
const labels = timestamp.map(time => time);


  const chartOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false }, 
      zoom: { enabled: false },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: ['#00ff00'],
    markers: {
      size: 5,
      colors: ['#fff'],
      strokeColors: '#00ff00',
      strokeWidth: 3,
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
      show: false, // removes background grid lines
    },
    tooltip: {
      enabled: true,
    },
  };

  const chartSeries = [
    {
      name: 'Sensor',
      data: sensorData,
    },
  ];

  return (
    <div className="w-full">
      <ApexCharts options={chartOptions} series={chartSeries} type="line" height={150} />
    </div>
  );
};

export default Chart;
