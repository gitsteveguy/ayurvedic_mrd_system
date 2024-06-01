import React from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import {CategoryScale} from 'chart.js'; 
ChartJS.register(CategoryScale);
export default function LineChart(props) {
  const loptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          color: ['#008500','#4B271B'],
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
    responsive: true,
    maintainAspectRatio:false
  }
  return (
    <div className="card card-full" >
      <h3>{props.title}</h3>
      <div className="chart-container" style={{height: props.height}}>
      <Line data={props.chartData} options={loptions} ></Line>
      </div>
   </div>
  )
}
