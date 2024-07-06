import React from 'react'
import './card-grids.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { useState,useEffect } from 'react'
import { getCurrentPatientID,setCurrentPatientVisitID } from '../../hooks/currentPatientnVisit';
import { useNavigate } from 'react-router-dom';


export default function Visits(props) {
  const navigate = useNavigate();
  const current_patient_id = getCurrentPatientID()
    const [visits_data,set_visits_data] = useState([])
    const visits_api_url = props.visits_api_url;
    useEffect(() => {
        fetchData(visits_api_url);
        // eslint-disable-next-line
      }, [visits_api_url]);

      function fetchData(visits_api_url){
        axios.get(visits_api_url,{params: {patient_id: current_patient_id}, withCredentials: true}).then(response => {
          if (!response) {
            throw new Error('Network response was not ok');
          }
          return (response.data);
        }).then((data) => {
          if (typeof data != {}) {
            set_visits_data(data)
          }
        })}
      
 
  return (
<div className="card-grid2">
    {visits_data.map((visit_data,index)=>{
        let checkout = visit_data.checkout===null ? 'Present' : visit_data.checkout;
        return(
            <div className="card" key={index}>
            <h3>{visit_data.checkin+' to '+checkout}</h3>
            <button  className='primary-btn' onClick={()=>{ setCurrentPatientVisitID(visit_data.visit_id); navigate('/patients/view_patient_visit')}} >View Details <VisibilityIcon/></button>
        </div>
        )
    })}
</div>
   
  )
}
