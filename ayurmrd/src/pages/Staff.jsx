import React from 'react'
import Container from '../components/Container'
import UserCards from '../components/card-grids/UserCards'
import SearchIcon from '@mui/icons-material/Search';
import { useState,useEffect } from 'react'

export default function Staff() {
    const staff_data_api_url = 'http://localhost:5000/test/api/staffdata'
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
        })})
  return (
    <Container page_name='Staff' active_menu='Staff' type='flex'>
      <div className="search-input input_group">
        <input type="text" role='search' name='search' className='animated_inputs'/>
        <label htmlFor="search">Search by Name</label>
        <SearchIcon/>

      </div>
      <UserCards  user_data_api_url={staff_data_api_url}/>
    </Container>
  )
}
