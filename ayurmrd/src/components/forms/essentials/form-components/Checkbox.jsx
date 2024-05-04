import React from 'react'
import { useEffect, useState } from 'react';

export default function Checkbox(props) {
  const [checkbox, setValue] = useState(false)

  const rep_onChange = (e)=>{
    if(checkbox)
    setValue(false)
  else
  setValue(true)
  }  



  let changefn = props.onChange;
  if (props.repeat)
   changefn = rep_onChange

    useEffect((e) => {
       let  main_checkboxes = document.querySelectorAll('.m-checkbox');
        main_checkboxes.forEach(main_checkbox => {
            main_checkbox.addEventListener('click',(e)=>{
                if(main_checkbox.checked == true)
                    { main_checkbox.previousElementSibling.checked = false; }
                     else
                     { main_checkbox.previousElementSibling.checked = true;}
            })
            
        });
        if(props.defaultValue=='true')
          setValue(true)
        else
        setValue(false)
    })
  return (
    <>
    <input type="checkbox" style={{display:'none'}}   name={props.name} checked={checkbox==false} value ='false' />
    <input type="checkbox" className='m-checkbox' name={props.name} checked={checkbox} value='true' onChange={changefn}/>
     <label htmlFor="checkbox"> Checkbox</label>
     </>
  )
}
