import React, { useState, useEffect } from 'react'
import IRow from '../../../../components/forms/essentials/form-components/IRow'
import ICol from '../../../../components/forms/essentials/form-components/ICol';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getCurrentPatientID, getCurrentPatientVisitID } from '../../../../hooks/currentPatientnVisit';
import RepeatingComponent from '../../essentials/form-components/RepeatingComponent';
import { repeatFormToObject } from '../../essentials/FormContainer';
import useAuth from '../../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import IDate from '../../essentials/form-components/IDate';

const MedicationRecordsForm = (props) => {
    const current_patient_id = getCurrentPatientID();
    const current_patient_visit_id = getCurrentPatientVisitID();
    const post_api_url = 'http://localhost:5000/api/add_medication_records'
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
            user_id : current_patient_id,
            visit_id : current_patient_visit_id,
            formData : formData,
            doctor_id : currentUser.user_id,
            doctor_name : currentUser.first_name+' '+currentUser.last_name,
            doctors_sign: currentUser.signature_img

        }
        const submission = new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.post(post_api_url, payload,{ withCredentials: true }).then(response => {
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



    return (
        <>
            <h1>Doctor's Medication Records</h1>
            <form name='medication_records' id='medication_records' inert={inert} onSubmit={handleSubmit}>
                <RepeatingComponent subtitle='Text'>
                    <IRow>
                        <ICol>
                        <IDate name='date[]' label='Date' max={'today'} />
                        </ICol>
                        <ICol>
                            <input id='time' type="time" name='time[]' />
                            <label htmlFor="time">Time</label>
                        </ICol>
                        <ICol>
                            <input className='animated_inputs' id='medicine' type="text" name='medicine[]' />
                            <label htmlFor="time">medicine</label>
                        </ICol>
                        <ICol>
                            <input className='animated_inputs' id='route_site' type="text" name='route_site[]' />
                            <label htmlFor="time">Route / Site</label>
                        </ICol>
                    </IRow>
                    <IRow>
                        <ICol>
                            <textarea name="dose[]" id="dose" cols="30" rows="10"></textarea>
                            <label htmlFor="dose">Dose</label>
                        </ICol>
                        <ICol>
                            <textarea name="anupana[]" id="anupana" cols="30" rows="10"></textarea>
                            <label htmlFor="anupana">Anupana</label>
                        </ICol>
                    </IRow>
                    <IRow>
                    <ICol>
                            <textarea name="remarks[]" id="remarks" cols="30" rows="10"></textarea>
                            <label htmlFor="remarks">Remarks</label>
                        </ICol>
                    </IRow>
                </RepeatingComponent>
              {props.inert==='false' && <IRow>
                    <ICol>
                    <Link to='/patients/view_patient_visit'><button type='button' className='danger-btn formbtn' tooltip='Cancel'>Cancel</button></Link> 
                        <button type='submit' form="medication_records" className=' primary-btn formbtn' tooltip='Submit' value="submit">Submit</button>
                    </ICol>
                </IRow>}
            </form>
        </>

    )
}

export default MedicationRecordsForm