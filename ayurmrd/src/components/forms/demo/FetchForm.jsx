import React, { useState, useEffect } from 'react'
import IRow from '../essentials/form-components/IRow';
import ICol from '../essentials/form-components/ICol';
import SingleSelect from '../essentials/form-components/SingleSelect';
import MultiSelect from '../essentials/form-components/MultiSelect';
import Radio from '../essentials/form-components/Radio';
import Checkbox from '../essentials/form-components/Checkbox';


export default function FetchForm(props) {

  const [formData, setFormData] = useState({
    text: '',
    textarea: '',
    date: '',
    time: "",
    tel: "",
    number: "",
    select: "",
    MultiSelect: [],
    checkbox: "true",
    Radio: "Option 2"
  });

  let animated_inputs_label_class = 'input_has_value'
  useEffect(() => {
    //fetchData(props.api_url);
    console.log(formData);
  }, [formData]);

  function fetchData(api_url) {
    fetch(api_url).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      if (typeof data != {}) {
        setFormData(data);
      }
    })
  }


  function onChange(e) {
    const { name, value } = e.target;
    setFormData(() => ({
      ...formData,
      [name]: value
    }))
  }

 

  return (
    <>
      <h1>Fetch Form</h1>
      <form name='FetchForm' id='FetchForm' action="http://localhost:5000/test/post/" method="post" autoComplete='on'>
        <IRow>
          <ICol>
            <input className='animated_inputs' id='Text' type="text" name='text' value={formData.text} onChange={onChange} />
            <label className={formData.text === '' ? '' : animated_inputs_label_class} htmlFor="text">Text</label>
          </ICol>
        </IRow>
        <IRow>
          <ICol>
            <textarea name="textarea" id="textarea" cols="30" rows="10" value={formData.textarea} onChange={onChange} />
            <label htmlFor="textarea">Text Area</label>
          </ICol>
        </IRow>
        <IRow title='Multi Column - Title'>
          <ICol>
            <input id='date' type="date" name='date' value={formData.date} onChange={onChange} />
            <label htmlFor="date">Date</label>
          </ICol>
          <ICol>
            <input id='time' type="time" name='time' value={formData.time} onChange={onChange} />
            <label htmlFor="time">Time</label>
          </ICol>
        </IRow>
        <IRow title='Telephone and Numbers'>
          <ICol>
            <input className='animated_inputs' id='tel' type="tel" name='tel' value={formData.tel} onChange={onChange} />
            <label className={formData.tel === '' ? '' : animated_inputs_label_class} htmlFor="tel">Tel</label>
          </ICol>
          <ICol>
            <input className='animated_inputs' id='number' type="number" name='number' value={formData.number} onChange={onChange} />
            <label className={formData.number === '' ? '' : animated_inputs_label_class} htmlFor="number">Number</label>
          </ICol>
        </IRow>
        <IRow>
          <ICol>
            <SingleSelect name='select' api_url='http://localhost:5000/test/api/select' value={formData.select} onChange={onChange} />
            <label htmlFor="select">Select with Dynamic Options from API</label>
          </ICol>
          <ICol>
            <MultiSelect label='Multi Select' name='MultiSelect' api_url='http://localhost:5000/test/api/select' value={formData.MultiSelect} onChange={onChange} />
          </ICol>
        </IRow>
        <IRow>
          <ICol>
            <Checkbox name='checkbox' defaultValue={formData.checkbox} onChange={onChange} />
          </ICol>
          <ICol>
            <Radio name='Radio' options={['Option 1', 'Option 2', 'Option 3', 'Option 4',]} defaultValue={formData.Radio} onChange={onChange} />
          </ICol>
        </IRow>
        <IRow>
          <ICol>
            <button type='button' className='danger-btn formbtn' tooltip='Cancel'>Cancel</button>
            <button type='submit' form="FetchForm" className=' primary-btn formbtn' tooltip='Submit' value="submit">Submit</button>
          </ICol>
        </IRow>
      </form>
    </>
  )
}
