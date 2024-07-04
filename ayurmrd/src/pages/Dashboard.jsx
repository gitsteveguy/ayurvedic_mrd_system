import React from 'react'
import Container from '../components/Container'
import useAuth from '../hooks/useAuth'
import WorldMap from '../components/maps/WorldMap'
import RecentVisits from '../components/card-grids/RecentVisits'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setCurrentPatientID } from '../hooks/currentPatientnVisit'
import axios from 'axios'


export default function Dashboard() {
  const currentUser = useAuth();
  const navigate = useNavigate()
  const map_data_url = 'http://localhost:5000/api/worldmap/patient_country'
  const recent_visit_api_url = 'http://localhost:5000/api/recentvisit'
  const [mapData,setMapData] = useState({})


  

  useEffect(() => {
    if(currentUser.permissions.includes('view_self')){
      setCurrentPatientID(currentUser.user_id)
      navigate('/patients/view_patient')
    }
  }, [currentUser.permissions]);

  useEffect(() => {
    fetchMapData(map_data_url)
  }, [map_data_url]);

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


  
  return (
    <Container page_name='Dashboard' active_menu='Dashboard' type='flex'>
      <h5></h5>
        <WorldMap height='40vh' title='Patients by Country' mapData={mapData}/>
      <h2>Recent Visits</h2>
      <RecentVisits  recent_visit_api_url={recent_visit_api_url}/>
    </Container>
  )
}
