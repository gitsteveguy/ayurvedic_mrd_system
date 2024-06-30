import React from 'react'
import { useEffect, useState } from 'react';

export default function Checkbox(props) {
  let ivalue = false;
  if(props.defaultValue==true)
    ivalue=true
  const [checkbox, setValue] = useState(ivalue)

  const toTitleCase = (str)=>{
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
let label = ''
if(!props.label)
  label = toTitleCase(props.name.split('_').join(' '))
else
  label = props.label

  const rep_onChange = (e)=>{
    if(checkbox)
    setValue(false)
  else
  setValue(true)
  }  

  const main_onChange = (e)=>{
    let nsvalue = 'false';
    if(checkbox===true){
      nsvalue='false'
      setValue(false)
    }
    else{
      nsvalue='true'
      setValue(true)
    }
    let event = {target : {name : props.name, value : nsvalue}}
  props.onChange(event)
  }

  let changefn = main_onChange;
  if (props.repeat)
   changefn = rep_onChange

    useEffect((e) => {
       let  main_checkboxes = document.querySelectorAll('.m-checkbox');
        main_checkboxes.forEach(main_checkbox => {
            main_checkbox.addEventListener('click',(e)=>{
                if(main_checkbox.checked === true)
                    { main_checkbox.previousElementSibling.checked = false; }
                     else
                     { main_checkbox.previousElementSibling.checked = true;}
            })
            
        });
        if(props.defaultValue==='true')
        setValue(true);
        else if(props.defaultValue==='false')
        setValue(false);
    },[props.defaultValue])
  return (
    <>
    <input type="checkbox" style={{display:'none'}}   name={props.name} checked={checkbox===false} value ='false' />
    <input type="checkbox" className='m-checkbox' name={props.name} checked={checkbox} value='true' onChange={changefn}/>
     <label htmlFor="checkbox">{label}</label>
     </>
  )
}