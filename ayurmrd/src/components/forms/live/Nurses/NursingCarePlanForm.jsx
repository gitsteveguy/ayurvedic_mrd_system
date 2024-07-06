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
import ITxtInput from '../../essentials/form-components/ITxtInput';

const NursingCarePlanForm = (props) => {
    const current_patient_id = getCurrentPatientID();
    const current_patient_visit_id = getCurrentPatientVisitID();
    const post_api_url = 'http://localhost:5000/api/add_nursing_care_plan_records'
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
            nurse_id : currentUser.user_id,
            nurse_name : currentUser.first_name+' '+currentUser.last_name,
            nurses_sign: currentUser.signature_img

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
            <h1>Nursing Care Plan Records</h1>
            <form name='nursingcareplanrecords' id='nursingcareplanrecords' inert={inert} onSubmit={handleSubmit}>
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
                        <ITxtInput name='problem_identified[]' label='Problem Identified' />
                        </ICol>
                        <ICol>
                        <ITxtInput name='suggestions[]' label='Suggestions' />
                        </ICol>
                    </IRow>
                </RepeatingComponent>
              {props.inert==='false' && <IRow>
                    <ICol>
                    <Link to='/patients/view_patient_visit'><button type='button' className='danger-btn formbtn' tooltip='Cancel'>Cancel</button></Link> 
                        <button type='submit' form="nursingcareplanrecords" className=' primary-btn formbtn' tooltip='Submit' value="submit">Submit</button>
                    </ICol>
                </IRow>}
            </form>
        </>

    )
}

export default NursingCarePlanForm