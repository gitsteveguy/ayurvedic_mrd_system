import React from 'react'
import './card-grids.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState,useEffect } from 'react'


export default function Visits(props) {
    const [visits_data,set_visits_data] = useState([])
    const visits_api_url = props.visits_api_url;
    useEffect(() => {
        fetchData(visits_api_url);
      }, [visits_api_url]);

      function fetchData(visits_api_url){
        fetch(visits_api_url).then(response => {
          if (!response) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        }).then((data) => {
          if (typeof data != {}) {
            set_visits_data(data)
          }
        })}
      
 
  return (
<div className="card-grid">
    {visits_data.map((visit_data,index)=>{
        let checkout = visit_data.checkout==='' ? 'Present' : visit_data.checkout;
        return(
            <div className="card" key={index}>
            <h3>{visit_data.checkin+' to '+checkout}</h3>
            <a href={visit_data.btn_url} className='primary-btn'>View Details <VisibilityIcon/></a>
        </div>
        )
    })}
</div>
   
  )
}
