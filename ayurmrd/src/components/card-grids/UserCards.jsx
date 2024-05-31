import React from 'react'
import './card-grids.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState,useEffect } from 'react'

export default function UserCards(props) {
    const [users_data,set_users_data] = useState([])
    const user_data_api_url = props.user_data_api_url;
    useEffect(() => {
        fetchData(user_data_api_url);
      }, [user_data_api_url]);

      function fetchData(user_data_api_url){
        fetch(user_data_api_url).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        }).then((data) => {
          if (typeof data != {}) {
            set_users_data(data)
          }
        })}
      
 
  return (
<div className="card-grid">
    {users_data.map((user_data)=>{
        return(
            <div className="card">
            <img src={user_data.staff_img} alt={user_data.staff_name} />
            <h3>{user_data.staff_name}</h3>
            <h5>{user_data.role}</h5>
            <a href={user_data.btn_url} className='primary-btn'>View Details <VisibilityIcon/></a>
        </div>
        )
    })}
</div>
   
  )
}
