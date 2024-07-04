import React, { useState, useEffect } from 'react'
import IRow from '../../../../components/forms/essentials/form-components/IRow'
import ICol from '../../../../components/forms/essentials/form-components/ICol';
import axios from 'axios';
import { toast } from 'react-toastify';
import ITxtInput from '../../../../components/forms/essentials/form-components/ITxtInput';
import ITextBox from '../../essentials/form-components/ITextBox';
import { getCurrentPatientID, getCurrentPatientVisitID } from '../../../../hooks/currentPatientnVisit';
import RepeatingComponent from '../../essentials/form-components/RepeatingComponent';
import { repeatFormToObject } from '../../essentials/FormContainer';
import useAuth from '../../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import IDate from '../../essentials/form-components/IDate';
import ITime from '../../essentials/form-components/ITime';

const TreatmentProcedureOrderForm = (props) => {
    const current_patient_id = getCurrentPatientID();
    const current_patient_visit_id = getCurrentPatientVisitID();
    const post_api_url = 'http://localhost:5000/api/add_treatment_procedure_order_records'
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

    return (
        <>
            <h1>Treatment Procedure Records</h1>
            <form name='treatment_procedure_form' id='treatment_procedure_form' inert={inert} onSubmit={handleSubmit}>
                <RepeatingComponent subtitle='Text'>
                    <IRow>
                        <ICol>
                            <IDate name='date[]' label='Date' max={'today'} />
                        </ICol>
                        <ICol>
                            <ITime name='time[]' label='Time' />
                        </ICol>
                        <ICol>
                            <ITxtInput name='treatment_procedure[]' label='Treatment Procedure' />
                        </ICol>
                        <ICol>
                            <ITxtInput name='medicine[]' label='Medicine' />
                        </ICol>
                    </IRow>
                    <IRow>
                        <ICol>
                            <ITxtInput name='site_loc[]' label='Site / Location' />
                        </ICol>
                        <ICol>
                            <ITxtInput name='no_of_days[]' type='number' label='No: of Days' />
                        </ICol>
                        <ICol>
                            <ITextBox name='precautions[]' max='200' />
                        </ICol>
                    </IRow>
                </RepeatingComponent>
                {props.inert==='false' && <IRow>
                    <ICol>
                        <Link to='/patients/view_patient_visit'><button type='button' className='danger-btn formbtn' tooltip='Cancel'>Cancel</button></Link>
                        <button type='submit' form="treatment_procedure_form" className=' primary-btn formbtn' tooltip='Submit' value="submit">Submit</button>
                    </ICol>
                </IRow>}
            </form>
        </>

    )
}

export default TreatmentProcedureOrderForm