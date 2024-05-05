import React,{useEffect, useState} from 'react'
import AsyncSelect from 'react-select/async';


export default function Single_Select(props) {
  const [value,setValue] = useState({})
  let url = props.api_url;

 const colorStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected })=>{
    return {...styles, color: isFocused ? 'var(--color-white)': isSelected ? 'var(--color-white)' : 'var(--color-secondary)'}
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
    })
  }

  useEffect((e)=>{
    if(props.defaultValue){
      let value ={label : props.defaultValue, value : props.defaultValue}
      setValue(value)
    }
  },[props.defaultValue])

  return (
    <AsyncSelect
      name={props.name}
      className='single-select'
      classNamePrefix="select"
      value = {value}
      loadOptions={loadOptions}
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

