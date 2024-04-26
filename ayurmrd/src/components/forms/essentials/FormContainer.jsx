import React from 'react'
import { useEffect } from 'react';
import './Forms.css'

export default function FormContainer(props) {
  useEffect((e) => {
    let inputs = document.querySelectorAll('input[type="text"],input[type="email"],input[type="number"],input[type="date"],input[type="time"],input[type="tel"],input[type="file"],input[type="password"]');
    console.log(inputs);
    inputs.forEach((input)=>{
      input.addEventListener('focusin',(e)=>{
        e.target.nextElementSibling.classList.add('input_has_value')
        console.log({element : e.target, type : 'focusin'});
      })
      input.addEventListener('focusout',(e)=>{
        if(e.target.value==='')
        {
          e.target.nextElementSibling.classList.remove('input_has_value')
        }
        console.log({element : e.target, type : 'focusout'});
      })
    })
    let password_fields = document.querySelectorAll('input[type=password]');
    console.log(password_fields);
  }
);
  return (
    <>
    {props.form}
    </>
  )
}
