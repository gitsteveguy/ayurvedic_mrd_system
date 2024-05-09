import React, { useEffect, useState,useContext } from 'react'
import { repeaterContext } from './RepeatingComponent';

export default function Radio(props) {


  const [radio, setRadio] = useState(props.options[0]);
  const radioindex = useContext(repeaterContext);
  let radio_name = props.name
  if (radio_name.includes('[')) {
    radio_name = radio_name.split('0')[0] + radioindex + radio_name.split('0')[1];
  }

  useEffect((e) => {
    if (props.defaultValue) {
      setRadio(props.defaultValue)
    }
  },[props.defaultValue])

  const rep_onChange = (e) => {
    setRadio(e.target.value);
  }
  let changefn = props.onChange;
  if (props.repeat)
   changefn = rep_onChange


  return (
    <>
      <label>Radio</label>
      {props.options.map((i, index) =>
        <React.Fragment key={index}>
          <input type="radio" name={radio_name} value={i} checked={radio === i ? true : false} onChange={changefn} />
          <label htmlFor="html">{i}</label>
        </React.Fragment>
      )}

    </>
  )
}
