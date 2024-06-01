import React from 'react'
import Container from '../components/Container'
import UserCards from '../components/card-grids/UserCards'
import SearchIcon from '@mui/icons-material/Search'
import { useState,useEffect } from 'react'
export default function Patients() {
    const patients_data_api_url = 'http://localhost:5000/test/api/patients'
    const [patients_data,set_patients_data] = useState([])
    useEffect((e) => {
        let inputs = document.querySelectorAll('.animated_inputs');
        inputs.forEach((input)=>{
          input.addEventListener('focusin',(e)=>{
            e.target.nextElementSibling.classList.add('input_has_value')
          })
          input.addEventListener('focusout',(e)=>{
            if(e.target.value==='')
            {
              e.target.nextElementSibling.classList.remove('input_has_value')
            }
          })
        })
    
        fetchData(patients_data_api_url)
    },[patients_data_api_url])

    function fetchData(patients_data_api_url){
        fetch(patients_data_api_url).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        }).then((data) => {
          if (typeof data != {}) {
            let user_data = []
            data.forEach((datum)=>{
              user_data.push({
                name : datum.patient_name,
                img : datum.patient_img,
                last_visit : datum.patient_visit,
                btn_url : datum.btn_url
              })
            })
            set_patients_data(user_data)
          }
        })}

  return (
    <Container page_name='Patients' active_menu='Patients' type='flex'>
      <div className="search-input input_group">
        <input type="text" role='search' name='search' className='animated_inputs'/>
        <label htmlFor="search">Search by Name</label>
        <SearchIcon/>

      </div>
      <UserCards  users_data={patients_data}/>
    </Container>
  )
}
