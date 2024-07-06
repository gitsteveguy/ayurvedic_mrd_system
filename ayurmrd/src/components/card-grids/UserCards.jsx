import React from 'react'
import './card-grids.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

export default function UserCards(props) {

  const navigate = useNavigate()
  
  return (
<div className="card-grid">
    {props.users_data.map((user_data,index)=>{
      let subheading='';
      if(user_data.last_visit){
        subheading = 'Last Visited : '+user_data.last_visit
      }
      else if(user_data.role)
        {
          subheading = user_data.role
        }
        else if(user_data.visit_count)
          {
            subheading = 'Visits : '+user_data.visit_count
          }
        return(
            <div className="card" key={index}>
            <img src={user_data.img} alt={user_data.name} />
            <h3>{user_data.name}</h3>
            {subheading!=='' && <h5>{subheading}</h5>}
            {/*eslint-disable-next-line*/}
            <a onClick={()=>{ user_data.setIDFn(user_data.id); navigate(user_data.link)}} className='primary-btn'>View Details <VisibilityIcon/></a>
        </div>
        )
    })}
</div>
   
  )
}
