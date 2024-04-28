import React from 'react'

export default function Test() {
  return (
    <>
      <h1>Form Title</h1>
      <form name='TestForm' id='TestForm' action="/dashboard" method="get">
        <div className="input_row">
          <div className="inputs-container">
            <div className="input_group">
              <input id='input' type="text" name='text' />
              <label htmlFor="text">Input</label>
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
          <h2>Multi Column - Title</h2>
          <div className="inputs-container">
            <div className="input_group">
              <input id='tel' type="tel" name='tel' />
              <label htmlFor="tel">Tel</label>
            </div>
            <div className="input_group">
              <input id='number' type="number" name='number' />
              <label htmlFor="number">Number</label>
            </div>
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
