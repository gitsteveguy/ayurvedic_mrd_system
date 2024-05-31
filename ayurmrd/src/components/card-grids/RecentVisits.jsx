import React from 'react'
import './card-grids.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState,useEffect } from 'react'


export default function RecentVisits(props) {
    const [recent_visits_data,set_recent_visits_data] = useState([])
    const recent_visit_api_url = props.recent_visit_api_url;
    useEffect(() => {
        fetchData(recent_visit_api_url);
      }, [recent_visit_api_url]);

      function fetchData(recent_visit_api_url){
        fetch(recent_visit_api_url).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        }).then((data) => {
          if (typeof data != {}) {
            set_recent_visits_data(data)
          }
        })}
      
 
  return (
<div className="card-grid">
    {recent_visits_data.map((recent_visit_data)=>{
        return(
            <div className="card">
            <img src={recent_visit_data.patient_img} alt={recent_visit_data.patient_name} />
            <h3>{recent_visit_data.patient_name}</h3>
            <h5>Visited on <br/>{recent_visit_data.patient_visit}</h5>
            <a href={recent_visit_data.btn_url} className='primary-btn'>View Details <VisibilityIcon/></a>
        </div>
        )
    })}
</div>
   
  )
}
