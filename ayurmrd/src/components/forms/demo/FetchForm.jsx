import React, { useState, useEffect } from 'react'
import Single_Select from '../essentials/form-components/Single_Select';
import Multi_Select from '../essentials/form-components/Multi_Select';
import Radio from '../essentials/form-components/Radio';
import Checkbox from '../essentials/form-components/Checkbox';


export default function FetchForm() {

  const [formData, setFormData] = useState({
    text : '',
    textarea : '',
    date : '',
    time: "",
    tel: "",
    number: "",
    select: "",
    multi_select: [],
    checkbox: "",
    Radio: "" 
  });

  useEffect(() => {
    let jsonData={}
   jsonData = {
      "text": "Text 4",
      "textarea": "Textarea 1",
      "date": "2024-05-15",
      "time": "01:00",
      "tel": "9876543210",
      "number": "3",
      "select": "Option 1",
      "multi_select": [
        "Option 1",
        "Option 3"
      ],
      "checkbox": "true",
      "Radio": "Option 3"
  };

  if (typeof jsonData != {}){
    setFormData(jsonData);
  }

},[]);

  function fetchData(api_url){

  }
  function onChange(e){
    console.log(e.target);
    const {name,value} = e.target;
    setFormData(()=>({
     ...formData,
     [name] : value
    }))
  }

  function handleSubmit(e){
    
  }

  return (
    <>
      <h1>Fetch Form</h1>
      <form onSubmit={handleSubmit} name='FetchForm' id='FetchForm' action="http://192.168.1.6:5000/test/post/" method="post" autoComplete='on'>
        <div className="input_row">
          <div className="inputs-container">
            <div className="input_group">
              <input className='animated_inputs' id='Text' type="text" name='text' defaultValue={formData.text}/>
              <label htmlFor="text">Text</label>
            </div>
          </div>
        </div>
        <div className="input_row">
          <div className="inputs-container">
            <div className="input_group">
              <textarea name="textarea" id="textarea" cols="30" rows="10" defaultValue={formData.textarea} />
              <label htmlFor="textarea">Text Area</label>
            </div>
          </div>
        </div>
        <div className="input_row">
          <h2>Multi Column - Title</h2>
          <div className="inputs-container">
            <div className="input_group">
              <input id='date' type="date" name='date' defaultValue={formData.date}/>
              <label htmlFor="date">Date</label>
            </div>
            <div className="input_group">
              <input id='time' type="time" name='time' defaultValue={formData.time}/>
              <label htmlFor="time">Time</label>
            </div>
          </div>
        </div>
        <div className="input_row">
          <h2>Telephone and Numbers</h2>
          <div className="inputs-container">
            <div className="input_group">
              <input className='animated_inputs' id='tel' type="tel" name='tel' defaultValue={formData.tel}/>
              <label htmlFor="tel">Tel</label>
            </div>
            <div className="input_group">
              <input className='animated_inputs' id='number' type="number" name='number' defaultValue={formData.number}/>
              <label htmlFor="number">Number</label>
            </div>
          </div>
        </div>
        <div className="input_row">
          <h2>Select & Multiselect</h2>
          <div className="inputs-container">
            <div className="input_group">
              <Single_Select name='select' api_url='http://192.168.1.6:5000/test/api/select'defaultValue={formData.select}/>
              <label htmlFor="select">Select with Dynamic Options from API</label>
            </div>
            <div className="input_group">
            <Multi_Select label='Multi Select' name='multi_select' api_url='http://192.168.1.6:5000/test/api/select' defaultValue={formData.multi_select} onChange={onChange}/>
            </div>
          </div>
        </div>
        <div className="input_row">
              <div className="inputs-container">
                <div className="input_group">
                  <Checkbox name='checkbox'  defaultValue={formData.checkbox} onChange={onChange}/>
                </div>
                <div className="input_group">
                <Radio name='Radio' options={['Option 1','Option 2','Option 3','Option 4',]} defaultValue={formData.Radio} onChange={onChange}/>
                </div>
              </div>
            </div>
        <div className="input_row">
          <div className="input_btn_group">
            <button type='button' className='danger-btn formbtn' tooltip='Cancel'>Cancel</button>
            <button type='submit' form="FetchForm" className=' primary-btn formbtn' tooltip='Submit' value="submit">Submit</button>
          </div>
        </div>
      </form>
    </>
  )
}
