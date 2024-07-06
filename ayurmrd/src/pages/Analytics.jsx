import React from 'react'
import Container from '../components/Container'
import LineChart from '../components/charts/LineChart';
import UserCards from '../components/card-grids/UserCards';
import WorldMap from '../components/maps/WorldMap';
import axios from 'axios';
import { useState,useEffect } from 'react'
import { setCurrentPatientID } from '../hooks/currentPatientnVisit';

export default function Analytics() {
    const chart_api_url = 'http://localhost:5000/api/charts/visits'
    const map_data_url = 'http://localhost:5000/api/worldmap/patient_country'
    const regular_patient_api_url = 'http://localhost:5000/api/regular_patients'
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
      axios.get(chart_api_url,{withCredentials: true}).then(response => {
        if (!response) {
          throw new Error('Network response was not ok');
        }
        return (response.data);
      }).then((data) => {
        if (typeof data != {}) {
          setVisitData(data);
        }
      })
    }

    function fetchMapData(map_data_url){
      axios.get(map_data_url,{withCredentials: true}).then(response => {
        if (!response) {
          throw new Error('Network response was not ok');
        }
        return (response.data);
      }).then((data) => {
            if (typeof data != {}) {
                setMapData(data);
            }
          })
    }

    function fetchRegularPatients(regular_patient_api_url){
      axios.get(regular_patient_api_url,{withCredentials: true}).then(response => {
        if (!response) {
          throw new Error('Network response was not ok');
        }
        return (response.data);
      }).then((data) => {
            if (typeof data != {}) {
                let user_data = []
                data.forEach((datum)=>{
                    user_data.push({
                      name : datum.patient_name,
                      img : datum.patient_img,
                      visit_count : datum.patient_visit_count,
                      id : datum.patient_id,
                      setIDFn : setCurrentPatientID,
                      link: '/patients/view_patient'
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
