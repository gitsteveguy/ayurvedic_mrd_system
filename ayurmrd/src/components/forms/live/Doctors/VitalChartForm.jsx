import React from "react";
import RepeatingComponent from "../../essentials/form-components/RepeatingComponent";
import IRow from "../../essentials/form-components/IRow";
import ICol from "../../essentials/form-components/ICol";
import { repeatFormToObject } from "../../essentials/FormContainer";
import ITextBox from "../../essentials/form-components/ITextBox";
import axios from "axios";
import { getCurrentPatientID, getCurrentPatientVisitID } from '../../../../hooks/currentPatientnVisit';
import useAuth from '../../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import IDate from "../../essentials/form-components/IDate";



export default function VitalChartForm(props){
  const current_patient_id = getCurrentPatientID();
  const current_patient_visit_id = getCurrentPatientVisitID();
  const post_api_url = 'http://localhost:5000/api/add_vital_chart_records'
  const currentUser = useAuth()


  let inert = false;
  if(props.inert==='true'){
    inert='true'
  }
  else{
    inert = false
  }

const handleSubmit = (e) => {
        e.preventDefault();
        const formData = repeatFormToObject(new FormData(e.target));
        const payload = {
            user_id: current_patient_id,
            visit_id: current_patient_visit_id,
            formData: formData,
            doctor_id: currentUser.user_id,
            doctor_name: currentUser.first_name + ' ' + currentUser.last_name,
            doctors_sign: currentUser.signature_img

        }
        const submission = new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.post(post_api_url, payload, { withCredentials: true }).then(response => {
                    console.log(response)
                    if (response.data.status === 'success') {
                        console.log(response);
                        props.update_table()
                        resolve(response.data.message);
                    }
                    else if (response.data.status === 'failed') {
                        reject(response.data.message)
                    }
                }).catch(err => {
                    console.log(err)
                    reject('Error Connecting to Server')
                })
            }, 1000)

        });

        toast.promise(
            submission,
            {
                pending: {
                    render() {
                        return "Inserting Record"
                    },
                },
                success: {
                    render({ data }) {
                        return `${data}`
                    },
                    // other options
                    icon: "🟢",
                },
                error: {
                    render({ data }) {
                        return `${data}`
                    }
                }
            }
        )
    }
    return(
        <>
        <form name='vitalchartform'id='vitalchartform' inert={inert} onSubmit={handleSubmit}>
            <RepeatingComponent subtitle='Text'>
                <IRow>
                <ICol>
           <IDate name='date[]' label='Date' max='today'/>
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
            <input className='animated_inputs' id='number' type="number" name='pulse[]' />
            <label htmlFor="pulse">Pulse</label>
          </ICol>
          <ICol>
            <input className='animated_inputs' id='number' type="number" name='bp[]' />
            <label htmlFor="BP">B.P</label>
          </ICol>
          </IRow>
          <IRow>
          <ICol>
            <input className='animated_inputs' id='number' type="number" name='weight[]' />
            <label htmlFor="weight">Weight</label>
          </ICol>
          <ICol>
          <ITextBox name='remarks[]' max='200' label='Remarks'/>
          </ICol>
          </IRow>
            </RepeatingComponent>
            {props.inert==='false' && <IRow>
          <ICol>
           <Link to='/patients/view_patient_visit'><button type='button' className='danger-btn formbtn' tooltip='Cancel'>Cancel</button></Link>
            <button type='submit' form="vitalchartform" className=' primary-btn formbtn' tooltip='Submit' value="submit">Submit</button>
          </ICol>
        </IRow>}
        </form>
        </>
    )
}
