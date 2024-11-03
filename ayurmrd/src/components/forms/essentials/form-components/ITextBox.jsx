import React from 'react'

const ITextBox = (props) => {
  const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
  let label = ''
  if (!props.label)
    label = toTitleCase(props.name.split('_').join(' '))
  else
    label = props.label
  return (
    <>
      <textarea name={props.name} value={props.value} rows='10' onChange={props.onChange} minLength={props.min} maxLength={props.max} style={{ background: "transparent" }}></textarea>
      <label htmlFor={props.name}>{label}</label>
    </>
  )
}

export default ITextBox