import React from 'react'
import Patient from '../../components/patient/Patient'
import FormContainer from '../../components/forms/essentials/FormContainer'
import IRow from '../../components/forms/essentials/form-components/IRow'
import ICol from '../../components/forms/essentials/form-components/ICol'
import IDate from '../../components/forms/essentials/form-components/IDate'
import { useState} from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { getCurrentPatientID } from '../../hooks/currentPatientnVisit'
import { useNavigate } from 'react-router-dom'

const AddVisit = () => {
  const navigate = useNavigate()
    const patient_id = getCurrentPatientID();
    const [formData,setFormData] = useState({
        check_in: '',
        patient_id : patient_id
    })
    const handleSubmit = (e)=>{
        e.preventDefault();
        const post_api_url = 'http://localhost:5000/api/create_visit'
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
                  return "Creating Visit"
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
    <Patient title={'Add Visit'}>
    <div className="card">
    <FormContainer>
        <form name='add_visit' id='add_visit' onSubmit={handleSubmit} style={{gap: '0.5rem',padding:'1rem'}}>
            <IRow>
                <ICol>
                <IDate name='check_in' value={formData.check_in} max={'today'} onChange={onChange} required={true} />
                </ICol>
            </IRow>
            <IRow>
            <ICol>
            <button type='button' className='danger-btn formbtn' tooltip='Cancel'>Cancel</button>
            <button type='submit' form='add_visit' className='primary-btn formbtn' tooltip='Create Visit' value="submit">Create Visit</button>
          </ICol>
            </IRow>
        </form>
        </FormContainer>
    </div>
    </Patient>
  )
}

export default AddVisit