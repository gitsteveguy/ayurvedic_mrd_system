import React from 'react'
import Container from '../components/Container'
import useAuth from '../hooks/useAuth'
import WorldMap from '../components/maps/WorldMap'
import RecentVisits from '../components/card-grids/RecentVisits'
import { useState,useEffect } from 'react'


export default function Dashboard() {
  const currentUser = useAuth();
  const map_data_url = 'http://localhost:5000/test/api/worldmap/patient_country'
  const recent_visit_api_url = 'http://localhost:5000/test/api/recentvisit'
  const [mapData,setMapData] = useState({})

  useEffect(() => {
    fetchMapData(map_data_url)
  }, [map_data_url]);

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


  
  return (
    <Container page_name='Dashboard' active_menu='Dashboard' type='flex'>
      <h5></h5>
        <WorldMap height='40vh' title='Patients by Country' mapData={mapData}/>
      <h2>Recent Visits</h2>
      <RecentVisits  recent_visit_api_url={recent_visit_api_url}/>
    </Container>
  )
}
