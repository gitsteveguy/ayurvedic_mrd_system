import React from 'react'

const ITxtInput = (props) => {
    let type =props.type ? props.type: 'text';

    const toTitleCase = (str)=>{
        return str.replace(
          /\w\S*/g,
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
      }
    let label = toTitleCase(props.name.split('_').join(' '))
  return (
    <>
    <input className='animated_inputs' id={props.name} type={type} name={props.name} value={props.value} onChange={props.onChange} minLength={props.min} maxLength={props.max}/>
    <label className={props.value === '' ? '' : props.labAnimClass} htmlFor={props.name}>{label}</label>
    </>
  )
}

export default ITxtInput