import React, { useEffect, useState } from 'react'

export default function Radio(props) {


  const [radio, setRadio] = useState(props.options[0]);
  let radio_name = props.name
  if (radio_name.includes('[')) {
    let cmp_nums = document.querySelectorAll('.repeating-fields-component-id');
    let max_cmp = 0;
    cmp_nums.forEach((cmp_num) => {
      let cmp_number = parseInt(cmp_num.innerHTML)
      console.log(cmp_number);
      max_cmp = cmp_number > max_cmp ? cmp_number : max_cmp;
    })
    radio_name = radio_name.split('0')[0] + (max_cmp + 1) + radio_name.split('0')[1];
  }

  useEffect((e) => {
    if (props.defaultValue) {
      setRadio(props.defaultValue)
    }
  })

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
