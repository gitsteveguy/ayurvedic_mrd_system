import React, { useState, useEffect } from 'react'
import IRow from '../../../../components/forms/essentials/form-components/IRow'
import ICol from '../../../../components/forms/essentials/form-components/ICol';
import SingleSelect from '../../../../components/forms/essentials/form-components/SingleSelect';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Checkbox from '../../../../components/forms/essentials/form-components/Checkbox';
import ITxtInput from '../../../../components/forms/essentials/form-components/ITxtInput';
import ITextBox from '../../essentials/form-components/ITextBox';
import { getCurrentPatientID, getCurrentPatientVisitID } from '../../../../hooks/currentPatientnVisit';
import RepeatingComponent from '../../essentials/form-components/RepeatingComponent';
import { repeatFormToObject } from '../../essentials/FormContainer';
import useAuth from '../../../../hooks/useAuth';
import { Link } from 'react-router-dom';

const MedicationRecordsForm = () => {
    const current_patient_id = getCurrentPatientID();
    const current_patient_visit_id = getCurrentPatientVisitID();
    const fetch_api_url = 'http://localhost:5000/api/get_doctor_initial_assessment'
    const post_api_url = 'http://localhost:5000/api/add_medication_records'
    const currentUser = useAuth()
    const navigate = useNavigate()
    const [medicationRecords, setMedicationRecords] = useState([])


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
                        resolve(response.data.message);
                        fetchData(fetch_api_url);
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






    useEffect(() => {
        fetchData(fetch_api_url);
    }, [fetch_api_url])

    function fetchData(fetch_api_url) {
        axios.get(fetch_api_url, { params: { user_id: current_patient_id, visit_id: current_patient_visit_id }, withCredentials: true }).then(response => {
            if (!response) {
                throw new Error('Network response was not ok');
            }
            return (response.data);
        }).then((data) => {
            if (typeof data != {}) {
                console.log(data.records);
                setMedicationRecords(data.records);
            }
        })
    }

    return (
        <>
            <h1>Doctor's Medication Records</h1>
            <form name='medication_records' id='medication_records' onSubmit={handleSubmit}>
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
                <IRow>
                    <ICol>
                    <Link to='/patients/view_patient_visit'><button type='button' className='danger-btn formbtn' tooltip='Cancel'>Cancel</button></Link> 
                        <button type='submit' form="medication_records" className=' primary-btn formbtn' tooltip='Submit' value="submit">Submit</button>
                    </ICol>
                </IRow>
            </form>
        </>

    )
}

export default MedicationRecordsForm