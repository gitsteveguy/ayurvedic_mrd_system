import React from 'react'
import IRow from '../essentials/form-components/IRow';
import ICol from '../essentials/form-components/ICol';
import RepeatingComponent from '../essentials/form-components/RepeatingComponent';
import SingleSelect from '../essentials/form-components/SingleSelect';
import MultiSelect from '../essentials/form-components/MultiSelect';
import Radio from '../essentials/form-components/Radio';
import Checkbox from '../essentials/form-components/Checkbox';


export default function RepeatingForm() {
  return (
    <>
      <h1>Form Title</h1>
      <form name='TestForm' id='TestForm' action="http://localhost:5000/test/post/" method="post" autoComplete='on'>
        <IRow>
          <ICol>
            <input className='animated_inputs' id='Text' type="text" name='text' />
            <label htmlFor="text">Text</label>
          </ICol>
        </IRow>
        <IRow>
          <ICol>
            <textarea name="textarea" id="textarea" cols="30" rows="10"></textarea>
            <label htmlFor="textarea">Text Area</label>
          </ICol>
        </IRow>
        <IRow title='Multi Column - Title'>
          <ICol>
            <input id='date' type="date" name='date' />
            <label htmlFor="date">Date</label>
          </ICol>
          <ICol>
            <input id='time' type="time" name='time' />
            <label htmlFor="time">Time</label>
          </ICol>
        </IRow>
        <IRow title='Single Column - Title'>
          <ICol>
            <input id='file' type="file" name='file' />
            <label htmlFor="file">File</label>
          </ICol>
        </IRow>
        <IRow title='Telephone and Numbers'>
          <ICol>
            <input className='animated_inputs' id='tel' type="tel" name='tel' />
            <label htmlFor="tel">Tel</label>
          </ICol>
          <ICol>
            <input className='animated_inputs' id='number' type="number" name='number' />
            <label htmlFor="number">Number</label>
          </ICol>
        </IRow>
        <IRow title='Select & Multiselect'>
          <ICol>
            <SingleSelect name='select' api_url='http://localhost:5000/test/api/select' />
            <label htmlFor="select">Select with Dynamic Options from API</label>
          </ICol>
          <ICol>
            <MultiSelect label='Multi Select' name='MultiSelect' api_url='http://localhost:5000/test/api/select' repeat />
          </ICol>
        </IRow>
        <RepeatingComponent title='Repeating Fields' subtitle='Test'>
          <IRow>
            <ICol>
              <input className='animated_inputs' id='text1' type="text" name='text1[]' />
              <label htmlFor="text1">Text 1</label>
            </ICol>
            <ICol>
            <SingleSelect name='rep_select[]' api_url='http://localhost:5000/test/api/select' />
            <label htmlFor="select">Select with Dynamic Options from API</label>
          </ICol>
          </IRow>
          <IRow>
            <ICol>
              <textarea name="textarea2[]" id="textarea2" cols="30" rows="10"></textarea>
              <label htmlFor="textarea2">Text Area</label>
            </ICol>
            <ICol>
              <MultiSelect label='Multi Select' name='MultiSelect2[0][]' api_url='http://localhost:5000/test/api/select' repeat />
            </ICol>
          </IRow>
          <IRow>
            <ICol>
              <Checkbox name='checkbox[]' repeat />
            </ICol>
            <ICol>
              <Radio name='Radio[0]' options={['Option 1', 'Option 2', 'Option 3', 'Option 4']} repeat />
            </ICol>
          </IRow>
        </RepeatingComponent>
        <IRow>
          <ICol>
            <button type='button' className='danger-btn formbtn' tooltip='Cancel'>Cancel</button>
            <button type='submit' form="TestForm" className=' primary-btn formbtn' tooltip='Submit' value="submit">Submit</button>
          </ICol>
        </IRow>
      </form>
    </>
  )
}
