import React from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import {CategoryScale} from 'chart.js'; 
import useAuth from '../../hooks/useAuth';
ChartJS.register(CategoryScale);
export default function LineChart(props) {
  const current_user = useAuth();
  const chart_line_color = current_user.color_theme==='light'? '#e5e5e5' : '#9d9c9c'
  const loptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          color: '#008500',
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
          color : chart_line_color,
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
