import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import Single_Select from './essentials/form-components/Single_Select';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function Test() {
  return (
    <>
      <h1>Form Title</h1>
      <form name='TestForm' id='TestForm' action="/dashboard" method="get">
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
              <Single_Select />
              <label htmlFor="select">Select</label>
            </div>
            <div className="input_group">
              <Select
                className="multi-select"
                classNamePrefix="select"
                components={makeAnimated()}
                isMulti
                options={[
                  { value: 'option 1', label: 'Option 1' },
                  { value: 'option 2', label: 'Option 2' },
                  { value: 'option 3', label: 'Option 3' }
                ]} />
              <label htmlFor="multi-select">Multi Select</label>
            </div>
          </div>
        </div>
        <div className="repeating-component">
          <h2>Repeating Fields - Title</h2>
          <div className="repeating-fields">
            <h3>Test</h3>
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
                  <Select
                    name='multi-select2[]'
                    className="multi-select"
                    classNamePrefix="select"
                    isMulti
                    defaultValue={{ value: 'option 1', label: 'Option 1' }}
                    options={[
                      { value: 'option 1', label: 'Option 1' },
                      { value: 'option 2', label: 'Option 2' },
                      { value: 'option 3', label: 'Option 3' }
                    ]} />
                  <label htmlFor="select">Select</label>
                </div>
              </div>
            </div>

            <div className="input_row">
              <div className="inputs-container">
                <div className="input_group">
                  <input type="checkbox" id="checkbox" name="checkbox[]" value="checkbox" />
                  <label htmlFor="checkbox"> Checkbox</label>
                </div>
                <div className="input_group">
                  <label>Radio</label>
                  <input type="radio" name="radio[]" value="option 1" />
                  <label htmlFor="html">Option 1</label>
                  <input type="radio" name="radio[]" value="option 2" />
                  <label htmlFor="css">Option 2</label>
                  <input type="radio" name="radio[]" value="option 1" />
                  <label htmlFor="javascript">Option 3</label>
                </div>
              </div>
            </div>
            <a className='danger-btn  repeating-btn remove_field' tooltip='Delete Field'><span className="material-symbols-rounded">
              remove
            </span></a>
          </div>
          <div className="repeating-btn-group">

            <a className='secondary-btn repeating-btn add_field' tooltip='Add Field'><span className="material-symbols-rounded">
              add
            </span></a>
          </div>
        </div>
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
