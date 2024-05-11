import React,{useEffect, useState} from 'react'
import AsyncSelect from 'react-select/async';


export default function SingleSelect(props) {
  const [value,setValue] = useState({})
  let url = props.api_url;

 const colorStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected })=>{
    return {...styles, color: isFocused ? 'var(--color-white)': isSelected ? 'var(--color-white)' : 'var(--color-secondary)',
    ':active':{
      ...styles[':active'],
      backgroundColor: !isDisabled
        ? isSelected
          ? 'var(--color-primary)'
          : 'var(--color-primary)'
        : undefined,
    }
    }
  }
 }

  const loadOptions = (searchValue, callback) => {
    fetch(url).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
       let options=[]
        data.forEach((datum)=>{
          options.push({label: datum, value: datum})
        })
      const filteredOptions = options.filter((option) => 
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
      callback(filteredOptions)
      setValue(filteredOptions[0])
    })
  }

  
  const rep_onChange = (e)=>{
    setValue(e)
   }

   const main_onChange = (e)=>{
   let  e_name = props.name;
   let e_value = e.value;
   let  m_event = {target : {name : e_name, value : e_value}}
    props.onChange(m_event)
   }
   let changefn = rep_onChange;
   if(props.value){
    changefn = main_onChange
   }

   


  useEffect((e)=>{
    if(props.value){
      let value ={label : props.value, value : props.value}
      setValue(value)
    }
  },[props.value])

  return (
    <AsyncSelect
      name={props.name}
      className='single-select'
      classNamePrefix="select"
      value = {value}
      loadOptions={loadOptions}
      onChange={changefn}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: 'var(--color-primary)',
          primary: 'var(--color-primary)',
        },
      })}
      styles={colorStyles}
      defaultOptions
    />
  )
}