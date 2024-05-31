import React from 'react'
import Container from '../components/Container'
import LineChart from '../components/charts/LineChart'
import RecentVisits from '../components/card-grids/RecentVisits'
import { useState,useEffect } from 'react'


export default function Dashboard() {
  const chart_api_url = 'http://localhost:5000/test/api/charts/visits'
  const recent_visit_api_url = 'http://localhost:5000/test/api/recentvisit'
  const [visitData,setVisitData] = useState({
    datasets : [{
      label : 'Visits',
      data :[
      {
        "x": "Jan",
        "y": 0
    },
    {
        "x": "Feb",
        "y": 0
    },
    {
        "x": "Mar",
        "y": 0
    },
    {
        "x": "Apr",
        "y": 0
    },
    {
        "x": "May",
        "y": 0
    },
    {
        "x": "Jun",
        "y": 0
    }
    ],
    borderColor: "#008500",
    backgroundColor: "#008500"}]
  })

  useEffect(() => {
    fetchData(chart_api_url);
  }, [chart_api_url]);

  function fetchData(chart_api_url) {
    fetch(chart_api_url).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      if (typeof data != {}) {
        setVisitData(data);
      }
    })
  }
  
  return (
    <Container page_name='Dashboard' active_menu='Dashboard' type='flex'>
      <LineChart chartData={visitData} height='40vh'></LineChart>
      <h2>Recent Visits</h2>
      <RecentVisits  recent_visit_api_url={recent_visit_api_url}/>
    </Container>
  )
}
