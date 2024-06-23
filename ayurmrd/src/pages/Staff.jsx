import React from 'react'
import Container from '../components/Container'
import UserCards from '../components/card-grids/UserCards'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SearchIcon from '@mui/icons-material/Search';
import { useState,useEffect } from 'react'

export default function Staff() {
    const staff_data_api_url = 'http://localhost:5000/test/api/staffdata'
    const [staff_data,set_staff_data] = useState([])
    const hBtns = [
      {
        href: '/staff/create-staff',
        text : 'Add Staff',
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
        fetchData(staff_data_api_url)
      },[staff_data_api_url])

        function fetchData(staff_data_api_url){
          fetch(staff_data_api_url).then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          }).then((data) => {
            if (typeof data != {}) {
              let user_data = []
              data.forEach((datum)=>{
                user_data.push({
                  name : datum.staff_name,
                  img : datum.staff_img,
                  role : datum.role,
                  btn_url : datum.btn_url
                })
              })
              set_staff_data(user_data)
            }
          })}

  return (
    <Container page_name='Staff' active_menu='Staff' type='flex' hBtns={hBtns} >
      <div className="search-input input_group">
        <input type="text" role='search' name='search' className='animated_inputs'/>
        <label htmlFor="search">Search by Name</label>
        <SearchIcon/>

      </div>
      <UserCards  users_data={staff_data}/>
    </Container>
  )
}
