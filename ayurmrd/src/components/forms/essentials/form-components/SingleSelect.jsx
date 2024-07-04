import React, { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';

const toLabel = (str) => {
  let notitlestr = str.split('_').join(' ')
  let newstr = notitlestr.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
  return newstr;
}

export function GenderSelect(props) {
  let placeholder={ label: 'Select a gender or type one', value: 'Select a gender or type one' }
  const [value, setValue] = useState(placeholder)

  const rep_onChange = (e) => {
    setValue(e)
  }

  const main_onChange = (e) => {
    let e_name = props.name;
    let e_value = e.value;
    let m_event = { target: { name: e_name, value: e_value } }
    setValue(e_value)
  
    props.onChange(m_event)
  }
  let changefn = main_onChange;
  if(props.repeat){
    changefn = rep_onChange;
   }

  const colorStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles, color: isFocused ? 'var(--color-white)' : isSelected ? 'var(--color-white)' : 'var(--color-secondary)',
        ':active': {
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
  useEffect((e) => {
    if (props.value) {
      let value = { label: props.value, value: props.value }
      setValue(value)
    }
  }, [props.value])

  return (
    <>
      <CreatableSelect
        className='single-select'
        classNamePrefix="select"
        name={props.name} 
        options={[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }]} 
        value={value} 
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
      />
      <label htmlFor={props.name}>{toLabel(props.name)}</label>
    </>)
};

export default function SingleSelect(props) {
  const [value, setValue] = useState({})
  let url = props.api_url;

  const colorStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles, color: isFocused ? 'var(--color-white)' : isSelected ? 'var(--color-white)' : 'var(--color-secondary)',
        ':active': {
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
    axios.get(url, {withCredentials: true}).then(response => {
            if (!response) {
              throw new Error('Network response was not ok');
            }
            return (response.data);
          }).then((data) => {
            console.log(data);
      let options = []
      data.forEach((datum) => {
        options.push({ label: datum, value: datum })
      })
      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
      callback(filteredOptions)
      setValue(filteredOptions[0])
    })
  }


  const rep_onChange = (e) => {
    setValue(e)
  }

  const main_onChange = (e) => {
    let e_name = props.name;
    let e_value = e.value;
    let m_event = { target: { name: e_name, value: e_value } }
    setValue(e_value)
    props.onChange(m_event)
  }
  let changefn = main_onChange;
  if(props.repeat){
    changefn = rep_onChange;
   }




  useEffect((e) => {
    if (props.value) {
      let value = { label: props.value, value: props.value }
      setValue(value)
    }
  }, [props.value])

  return (
    <AsyncSelect
      name={props.name}
      className='single-select'
      classNamePrefix="select"
      value={value}
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