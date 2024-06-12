import React from "react";
import RepeatingComponent from "../essentials/form-components/RepeatingComponent";
import IRow from "../essentials/form-components/IRow";
import ICol from "../essentials/form-components/ICol";
export default function DoctorsVitalChartForm(){
    return(
        <>
        <form name='doctorsvitalchartform'id='doctorsvitalchartform'action="http://localhost:5000/test/post/"method="post">
            <RepeatingComponent subtitle='Text'>
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
            <input className='animated_inputs' id='number' type="number" name='temperature[]' />
            <label htmlFor="temperature">Temperature(in Celsius)</label>
          </ICol>

          <ICol>
            <input className='animated_inputs' id='number' type="number" name='BP[]' />
            <label htmlFor="BP">B.P</label>
          </ICol>
          </IRow>
          <IRow>
          <ICol>
            <input className='animated_inputs' id='number' type="number" name='weight[]' />
            <label htmlFor="weight">Weight</label>
          </ICol>
          <ICol>
            <input className='animated_inputs' id='Text' type="text" name='remarks[]' />
            <label htmlFor="remarks">Remarks</label>
          </ICol>
          </IRow>
          <IRow>
        </IRow>
<IRow>
                </IRow>
            </RepeatingComponent>
            <IRow>
          <ICol>
            <button type='button' className='danger-btn formbtn' tooltip='Cancel'>Cancel</button>
            <button type='submit' form="doctorsvitalchartform" className=' primary-btn formbtn' tooltip='Submit' value="submit">Submit</button>
          </ICol>
        </IRow>
        </form>
        </>
    )
}
