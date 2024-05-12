import React from 'react'
import RepeatingComponent from '../essentials/form-components/RepeatingComponent'
import IRow from '../essentials/form-components/IRow'
import ICol from '../essentials/form-components/ICol'

export default function DoctorsObsChartForm() {
  return (
   <>
   <form name='doctorobschartform' id='doctorobschartform' action="http://localhost:5000/test/post/" method='post'>
    <RepeatingComponent subtitle='Doctor Observation Entry'>
    <IRow>
       <ICol>
            <input id='date' type="date" name='date[]' />
            <label htmlFor="date">Date</label>
       </ICol>
       <ICol>
            <input id='time' type="time" name='time[]' />
            <label htmlFor="time">Time</label>
       </ICol>
    </IRow>
    <IRow>
      <ICol>
            <textarea name="doctorobs[]" id="doctorobs" cols="30" rows="10"></textarea>
            <label htmlFor="doctorobs">Doctor's Observation</label>
          </ICol>
    </IRow>
    <IRow>
          <ICol>
            <input className='animated_inputs' id='Text' type="text" name='medmod[]' />
            <label htmlFor="medmod">Medicine Modification</label>
          </ICol>
          <ICol>
            <input className='animated_inputs' id='Text' type="text" name='promod[]' />
            <label htmlFor="promod">Procedure Modification</label>
          </ICol>
        </IRow>
    </RepeatingComponent>
    <IRow>
          <ICol>
            <button type='button' className='danger-btn formbtn' tooltip='Cancel'>Cancel</button>
            <button type='submit' form="doctorobschartform" className=' primary-btn formbtn' tooltip='Submit' value="submit">Submit</button>
          </ICol>
        </IRow>
   </form>
   </>
  )
}
