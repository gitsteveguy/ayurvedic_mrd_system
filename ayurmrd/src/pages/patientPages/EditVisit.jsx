import React from 'react'
import Patient from '../../components/patient/Patient'
import FormContainer from '../../components/forms/essentials/FormContainer'
import IRow from '../../components/forms/essentials/form-components/IRow'
import ICol from '../../components/forms/essentials/form-components/ICol'
import IDate from '../../components/forms/essentials/form-components/IDate'
import { useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { getCurrentPatientID,getCurrentPatientVisitID } from '../../hooks/currentPatientnVisit'
import { useNavigate } from 'react-router-dom'

const EditVisit = () => {
    const [check_in,setCheckIn] = useState('');
    const fetch_api_url ='http://localhost:5000/api/get_visit_by_ID';
    const post_api_url = 'http://localhost:5000/api/update_visit'
    const navigate = useNavigate()
    const patient_id = getCurrentPatientID();
    const visit_id = getCurrentPatientVisitID();
    const [formData,setFormData] = useState({
        check_out: '',
        patient_id : patient_id,
        visit_id : visit_id
    })

    const fetchVisit = (visit_id)=>{
        axios.get(fetch_api_url,{params: {visit_id: visit_id}, withCredentials: true}).then(response => {
            if (!response) {
              throw new Error('Network response was not ok');
            }
            return (response.data);
          }).then((data) => {
            if (typeof data != {}) {
              if(data.check_in)
               {
                console.log(data.check_in);
              setCheckIn(data.check_in);}
            }
          })
    }

    useEffect(()=>{
        fetchVisit(visit_id)
    },[fetch_api_url])

    const handleSubmit = (e)=>{
        e.preventDefault();
        const submission = new Promise((resolve,reject) =>{ 
            setTimeout(()=>{
              axios.post(post_api_url, formData, { withCredentials: true }).then(response => {
                if (response.data.status==='success') {
                  console.log(response);
                  resolve(response.data.message);
                  navigate('/patients/view_patient')
                }
                else if(response.data.status==='failed'){
                  reject(response.data.message)
                }
              }).catch(err => {console.log(err)
                reject('Error Connecting to Server')
              })
            },1000)
            
          });

          toast.promise(
            submission,
            {
              pending: {
                render(){
                  return "Updating Visit"
                },
              },
              success: {
                render({data}){
                  return `${data}`
                },
                // other options
                icon: "🟢",
              },
              error: {
                render({data}){
                  return `${data}`
                }
              }
            }
        )
    }

    function onChange(e) {
        const { name, value } = e.target;
        setFormData(() => ({
            ...formData,
            [name]: value
        }))
        }
  return (
     <Patient title={'Checkout Visit'}>
    <div className="card">
    <FormContainer>
        <form name='checkout_visit' id='checkout_visit' onSubmit={handleSubmit} style={{gap: '0.5rem',padding:'1rem'}}>
            <IRow>
            <ICol>
                <IDate value={check_in} label='Check In' max={'today'} inert='true' required={true} />
                </ICol>
                <ICol>
                <IDate name='check_out' min={check_in} value={formData.check_out} max={'today'} onChange={onChange} required={true} />
                </ICol>
            </IRow>
            <IRow>
            <ICol>
            <button type='button' className='danger-btn formbtn' tooltip='Cancel'>Cancel</button>
            <button type='submit' form='checkout_visit' className='primary-btn formbtn' tooltip='Check Out' value="submit">Check Out</button>
          </ICol>
            </IRow>
        </form>
        </FormContainer>
    </div>
    </Patient>
  )
}

export default EditVisit