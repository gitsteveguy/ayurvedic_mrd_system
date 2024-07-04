import React from 'react'
import './card-grids.css';
import EditIcon from '@mui/icons-material/Edit';
import useAuth from '../../hooks/useAuth';


const FormCards = (props) => {
  const current_user = useAuth();
  let btn_text= 'View Details';
  if(props.formType==='doctor_forms' && current_user.permissions.includes('edit_doctor_form'))
    btn_text='View/Edit Details'
    if(props.formType==='nurse_forms' && current_user.permissions.includes('edit_nurse_form'))
      btn_text='View/Edit Details'
  return (
    <div className="card-grid">
    {props.forms.map((form,index)=>{
        return(
            <div className="card" key={index}>
            <h3>{form.name}</h3>
            <a href={form.href} className='primary-btn'>{btn_text} <EditIcon/></a>
        </div>
        )
    })}
</div>
  )
}

export default FormCards