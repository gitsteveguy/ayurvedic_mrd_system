import React from 'react'
import axios from 'axios';
import Container from '../components/Container'
import UserCards from '../components/card-grids/UserCards'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SearchIcon from '@mui/icons-material/Search'
import { useState,useEffect } from 'react'
export default function Patients() {
    const patients_data_api_url = 'http://localhost:5000/api/patients';
    const [search,setSearch] = useState('')
    const [patients_data,set_patients_data] = useState([]);
    const hBtns = [
      {
        href: '/patients/create_patient',
        text : 'Add Patient',
        className: 'primary-btn',
        icon: <PersonAddAltIcon/>
      }
    ]
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
    
        fetchData(patients_data_api_url,search)
    },[patients_data_api_url,search])

    const onChange = (e)=>{
      setSearch(e.target.value);
    }

    function fetchData(patients_data_api_url,search){
      axios.get(patients_data_api_url,{params: {search: search}, withCredentials: true}).then(response => {
          if (!response) {
            throw new Error('Network response was not ok');
          }
          return (response.data);
        }).then((data) => {
          if (typeof data != {}) {
            let user_data = []
            data.forEach((datum)=>{
              user_data.push({
                name : datum.first_name+" "+datum.last_name,
                img : datum.profile_img,
                last_visit : datum.patient_visit,
                patient_id : datum.user_id
              })
            })
            set_patients_data(user_data)
          }
        })}

  return (
    <Container page_name='Patients' active_menu='Patients' type='flex' hBtns={hBtns}>
      <div className="search-input input_group">
        <input type="text" role='search' name='search' value={search} className='animated_inputs' onChange={onChange}/>
        <label htmlFor="search">Search by First Name, Last Name or User ID</label>
        <SearchIcon/>

      </div>
      <UserCards  users_data={patients_data}/>
    </Container>
  )
}
