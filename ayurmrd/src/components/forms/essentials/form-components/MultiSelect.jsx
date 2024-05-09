import React from 'react'
import AsyncSelect from 'react-select/async';
import { useState,useEffect,useContext } from 'react';
import makeAnimated from 'react-select/animated';
import { repeaterContext } from './RepeatingComponent';

const animatedComponents = makeAnimated();
export default function MultiSelect(props) {

  const [values,setValues] = useState([])
  const multiselectindex = useContext(repeaterContext);
  
  useEffect((e)=>{

    if(props.value)
      {
        let newoptions=[]
        props.value.forEach((datum)=>{
          newoptions.push({label: datum, value: datum})
          })
          setValues(newoptions);
      }
  },[props.value])

 const rep_onChange = (e)=>{
  setValues(e)
 }

 const main_onChange = (e)=>{
  let opt_array=[];
  e.forEach((option)=>{
    opt_array.push(option.label)
  })
  let event = {target : {name : new_name, value : opt_array}}
  props.onChange(event)
 }


let changefn = main_onChange;
 if(props.repeat){
  changefn = rep_onChange;
 }

  let url = props.api_url;
  let sel_id = props.name.split('[', 1)[0]
  let new_name = props.name;
if(new_name.includes('[')){
new_name = props.name.split('0')[0]+(multiselectindex)+props.name.split('0')[1];}
 const colorStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected })=>{
    return {...styles, color: isFocused ? 'var(--color-white)': isSelected ? 'var(--color-white)' : 'var(--color-secondary)'}
  },
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: 'var(--color-primary)'
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: 'var(--color-white)',
  }),
  multiValueRemove: (styles,) => ({
    ...styles,
    color: 'var(--color-white)',
    ':hover': {
      backgroundColor: 'var(--color-complementary)'
    },
  })
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
  return (
    <>
    <AsyncSelect
     id={sel_id}
      name={new_name}
      value={values}
      onChange={changefn}
      className='multi-select'
      classNamePrefix="select"
      components={animatedComponents}
      isMulti
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
     <label htmlFor={new_name}>{props.label}</label>
    </>
  )
}

