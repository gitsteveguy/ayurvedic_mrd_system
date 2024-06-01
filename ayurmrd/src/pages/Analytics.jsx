import React from 'react'
import Container from '../components/Container'
import LineChart from '../components/charts/LineChart';
import UserCards from '../components/card-grids/UserCards';
import WorldMap from '../components/maps/WorldMap';
import { useState,useEffect } from 'react'

export default function Analytics() {
    const chart_api_url = 'http://localhost:5000/test/api/charts/visits'
    const map_data_url = 'http://localhost:5000/test/api/worldmap/patient_country'
    const regular_patient_api_url = 'http://localhost:5000/test/api/regular_patients'
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
    const [regularPatients,setRegularPatients] = useState([])
    const [mapData,setMapData] = useState({})
    useEffect(() => {
      fetchVisitsData(chart_api_url);
      fetchMapData(map_data_url);
      fetchRegularPatients(regular_patient_api_url)
    }, [chart_api_url,map_data_url,regular_patient_api_url]);
  
    function fetchVisitsData(chart_api_url) {
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

    function fetchMapData(map_data_url){
        fetch(map_data_url).then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          }).then((data) => {
            if (typeof data != {}) {
                setMapData(data);
            }
          })
    }

    function fetchRegularPatients(regular_patient_api_url){
        fetch(regular_patient_api_url).then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          }).then((data) => {
            if (typeof data != {}) {
                let user_data = []
                data.forEach((datum)=>{
                    user_data.push({
                      name : datum.patient_name,
                      img : datum.patient_img,
                      visit_count : datum.patient_visit_count,
                      btn_url : datum.btn_url
                    })
                  })
                    setRegularPatients(user_data)
            }
          })
    }
    
    return (
      <Container page_name='Analytics' active_menu='Analytics' type='flex'>
        <LineChart title='Visits' chartData={visitData} height='40vh'></LineChart>
        <WorldMap height='40vh' title='Patients by Country' mapData={mapData}/>
        <h2>Regular Patients</h2>
        <UserCards  users_data={regularPatients}/>
      </Container>
    )
}
