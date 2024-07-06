import React from 'react'
import Container from '../components/Container'
import UserCards from '../components/card-grids/UserCards'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SearchIcon from '@mui/icons-material/Search';
import { useState,useEffect } from 'react'
import axios from 'axios';
import { setCurrentStaffID } from '../hooks/currentStaff';

export default function Staff() {
    const staff_data_api_url = 'http://localhost:5000/api/staffdata'
    const [staff_data,set_staff_data] = useState([])
    const [search,setSearch] = useState('')
    const hBtns = [
      {
        href: '/staff/create_staff',
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
        fetchData(staff_data_api_url,search)
      },[staff_data_api_url,search])

      const onChange = (e)=>{
        setSearch(e.target.value);
      }

        function fetchData(staff_data_api_url){
          axios.get(staff_data_api_url,{params: {search: search}, withCredentials: true}).then(response => {
            if (!response) {
              throw new Error('Network response was not ok');
            }
            return (response.data);
          }).then((data) => {
            if (typeof data != {}) {
              let user_data = []
              data.forEach((datum)=>{
                user_data.push({
                  name : datum.staff_name,
                  img : datum.staff_img,
                  role : datum.role,
                  id : datum.user_id,
                  setIDFn : setCurrentStaffID,
                  link : '/staff/edit_staff'
                })
              })
              set_staff_data(user_data)
            }
          })}

  return (
    <Container page_name='Staff' active_menu='Staff' type='flex' hBtns={hBtns} >
      <div className="search-input input_group">
        <input type="text" role='search' name='search' className='animated_inputs' value={search} onChange={onChange}/>
        <label htmlFor="search">Search by Name</label>
        <SearchIcon/>

      </div>
      <UserCards  users_data={staff_data}/>
    </Container>
  )
}
