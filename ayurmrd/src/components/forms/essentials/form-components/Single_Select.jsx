import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

export default function Single_Select(props) {
  return (
    <Select
                    name={props.name}
                    className='single-select'
                    classNamePrefix="select"
                    defaultValue={{option: 'Option 1' }}
                    options={[
                      { option: 'Option 1' , v:'option 1'},
                      { option: 'Option 2' },
                      { value: 'Option 3'}
                    ]} 
                    labelField='option'
                    valueField='v'
                    />
  )
}
