import React from 'react'
import RepeatingComponent from './essentials/form-components/RepeatingComponent';
import Single_Select from './essentials/form-components/Single_Select';
import MultiSelect from './essentials/form-components/MultiSelect';
import Radio from './essentials/form-components/Radio';
import Checkbox from './essentials/form-components/Checkbox';


export default function Test() {

  /*If you are using repeating field*/

 

  function handleSubmit(e){
    
  }

  return (
    <>
      <h1>Form Title</h1>
      <form onSubmit={handleSubmit} name='TestForm' id='TestForm' action="http://192.168.1.6:5000/test/post/" method="post" autoComplete='on'>
        <div className="input_row">
          <div className="inputs-container">
            <div className="input_group">
              <input className='animated_inputs' id='Text' type="text" name='text' />
              <label htmlFor="text">Text</label>
            </div>
          </div>
        </div>
        <div className="input_row">
          <div className="inputs-container">
            <div className="input_group">
              <textarea name="textarea" id="textarea" cols="30" rows="10"></textarea>
              <label htmlFor="textarea">Text Area</label>
            </div>
          </div>
        </div>
        <div className="input_row">
          <h2>Multi Column - Title</h2>
          <div className="inputs-container">
            <div className="input_group">
              <input id='date' type="date" name='date' />
              <label htmlFor="date">Date</label>
            </div>
            <div className="input_group">
              <input id='time' type="time" name='time' />
              <label htmlFor="time">Time</label>
            </div>
          </div>
        </div>
        <div className="input_row">
          <h2>Single Column - Title</h2>
          <div className="inputs-container">
            <div className="input_group">
              <input id='file' type="file" name='file' />
              <label htmlFor="file">File</label>
            </div>
          </div>
        </div>
        <div className="input_row">
          <h2>Telephone and Numbers</h2>
          <div className="inputs-container">
            <div className="input_group">
              <input className='animated_inputs' id='tel' type="tel" name='tel' />
              <label htmlFor="tel">Tel</label>
            </div>
            <div className="input_group">
              <input className='animated_inputs' id='number' type="number" name='number' />
              <label htmlFor="number">Number</label>
            </div>
          </div>
        </div>
        <div className="input_row">
          <h2>Select & Multiselect</h2>
          <div className="inputs-container">
            <div className="input_group">
              <Single_Select name='select' api_url='http://192.168.1.6:5000/test/api/select'/>
              <label htmlFor="select">Select with Dynamic Options from API</label>
            </div>
            <div className="input_group">
            <MultiSelect label='Multi Select' name='MultiSelect'  api_url='http://192.168.1.6:5000/test/api/select' repeat/>
            </div>
          </div>
        </div>
        <RepeatingComponent title='Repeating Fields' subtitle_prefix='Test'>
            <div className="input_row">
              <div className="inputs-container">
                <div className="input_group">
                  <input className='animated_inputs' id='text1' type="text" name='text1[]' />
                  <label htmlFor="text1">Text 1</label>
                </div>
                <div className="input_group">
                  <input className='animated_inputs' id='text2' type="text" name='text2[]' />
                  <label htmlFor="text2">Text 2</label>
                </div>
              </div>
            </div>
            <div className="input_row">
              <div className="inputs-container">
                <div className="input_group">
                  <textarea name="textarea2[]" id="textarea2" cols="30" rows="10"></textarea>
                  <label htmlFor="textarea2">Text Area</label>
                </div>
                <div className="input_group">
                <MultiSelect label='Multi Select' name='MultiSelect2[0][]' api_url='http://192.168.1.6:5000/test/api/select' repeat/>
                </div>
              </div>
            </div>
            <div className="input_row">
              <div className="inputs-container">
                <div className="input_group">
                  <Checkbox name='checkbox[]' repeat/>
                </div>
                <div className="input_group">
                <Radio name='Radio[0]' options={['Option 1','Option 2','Option 3','Option 4']}  repeat />
                </div>
              </div>
            </div>
       
        </RepeatingComponent>
        <div className="input_row">
          <div className="input_btn_group">
            <button type='button' className='danger-btn formbtn' tooltip='Cancel'>Cancel</button>
            <button type='submit' form="TestForm" className=' primary-btn formbtn' tooltip='Submit' value="submit">Submit</button>
          </div>
        </div>
      </form>
    </>
  )
}
