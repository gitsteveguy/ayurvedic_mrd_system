import React from 'react'
import './card-grids.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setCurrentPatientID,setCurrentPatientVisitID } from '../../hooks/currentPatientnVisit';


export default function RecentVisits(props) {
  const navigate = useNavigate();
    const [recent_visits_data,set_recent_visits_data] = useState([])
    const recent_visit_api_url = props.recent_visit_api_url;
    useEffect(() => {
        fetchData(recent_visit_api_url);
      }, [recent_visit_api_url]);

      function fetchData(recent_visit_api_url){
        axios.get(recent_visit_api_url,{withCredentials: true}).then(response => {
          if (!response) {
            throw new Error('Network response was not ok');
          }
          return (response.data);
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
            <a onClick={()=>{setCurrentPatientID(recent_visit_data.user_id);setCurrentPatientVisitID(recent_visit_data.visit_id);navigate('/patients/view_patient_visit')}} className='primary-btn'>View Details <VisibilityIcon/></a>
        </div>
        )
    })}
</div>
   
  )
}
