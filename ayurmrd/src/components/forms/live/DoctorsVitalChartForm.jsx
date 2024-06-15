import React from "react";
import RepeatingComponent from "../essentials/form-components/RepeatingComponent";
import IRow from "../essentials/form-components/IRow";
import ICol from "../essentials/form-components/ICol";
import { repeatFormToObject } from "../essentials/FormContainer";
import MultiSelect from "../essentials/form-components/MultiSelect";
import axios from "axios";

const post_api_url = 'http://localhost:5000/login'
const handleSubmit = (e)=>{
  e.preventDefault();
  const formData = repeatFormToObject(new FormData(e.target));
  console.log(formData);
  axios.post(post_api_url,formData).then(response => console.log(response)).catch(err=>console.log(err))
}

export default function DoctorsVitalChartForm(){
    return(
        <>
        <form name='doctorsvitalchartform'id='doctorsvitalchartform' onSubmit={handleSubmit}>
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
