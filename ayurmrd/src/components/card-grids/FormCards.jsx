import React from 'react'
import './card-grids.css';
import EditIcon from '@mui/icons-material/Edit';


const FormCards = (props) => {
  return (
    <div className="card-grid">
    {props.forms.map((form,index)=>{
        return(
            <div className="card" key={index}>
            <h3>{form.name}</h3>
            <a href={form.href} className='primary-btn'>View/Edit Details <EditIcon/></a>
        </div>
        )
    })}
</div>
  )
}

export default FormCards