import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ICol from '../../essentials/form-components/ICol';
import IRow from '../../essentials/form-components/IRow';
import ITextBox from '../../essentials/form-components/ITextBox';
import { getCurrentPatientID, getCurrentPatientVisitID } from '../../../../hooks/currentPatientnVisit';
import useAuth from '../../../../hooks/useAuth';
import { Link } from 'react-router-dom';

const DischargeForm = (props) => {

  const current_patient_id = getCurrentPatientID();
  const current_patient_visit_id = getCurrentPatientVisitID();
  const fetch_api_url ='http://localhost:5000/api/get_discharge_form'
  const post_api_url = 'http://localhost:5000/api/update_discharge_form'
  const currentUser = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    user_id : current_patient_id,
    visit_id: current_patient_visit_id,
    ailments:'',
    diagnosis: '',
    discharge_condition: "",
    restricted_activities: "",
    advices: "",
    discharge_meds: "",
    doctor_id : currentUser.user_id,
    doctor_name : currentUser.first_name+' '+currentUser.last_name,
    doctor_sign : currentUser.signature_img
  });
  let inert = false;
  if(props.inert==='true'){
    inert='true'
  }
  else{
    inert = false
  }
 
  useEffect(()=>{
    fetchData(fetch_api_url);
    // eslint-disable-next-line
  },[fetch_api_url])

  function fetchData(fetch_api_url) {
    axios.get(fetch_api_url,{params: {user_id: current_patient_id,visit_id: current_patient_visit_id}, withCredentials: true}).then(response => {
      if (!response) {
        throw new Error('Network response was not ok');
      }
      return (response.data);
    }).then((data) => {
      if (typeof data != {}) {
        if(data.patientExists)
         {
        setFormData(data.formData);}
      }
    })
  }


  function onChange(e) {
    const { name, value } = e.target;
    setFormData(() => ({
      ...formData,
      [name]: value
    }))
  }

const handleSubmit = (e)=>{
    e.preventDefault();
    const submission = new Promise((resolve,reject) =>{ 
        setTimeout(()=>{
          axios.post(post_api_url, formData, { withCredentials: true }).then(response => {
            if (response.data.status==='success') {
              console.log(response);
              resolve(response.data.message);
              navigate('/patients/view_patient_visit')
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
              return "Updating Patient Data"
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
  return (
    <>
      <h1>Discharge Form</h1>
      <form name='dischargeform' id='dischargeform' inert={inert} autoComplete='off' onSubmit={handleSubmit}>
        <IRow>
          <ICol>
          <ITextBox name='ailments' value={formData.ailments} onChange={onChange} max='350'/>
          </ICol>
          <ICol>
          <ITextBox name='diagnosis' value={formData.diagnosis} onChange={onChange} max='350'/>
          </ICol>
          <ICol>
          <ITextBox name='discharge_condition' value={formData.discharge_condition} onChange={onChange} max='350'/>
          </ICol>
        </IRow>
        <IRow>
          <ICol>
          <ITextBox name='restricted_activities' value={formData.restricted_activities} onChange={onChange} max='350'/>
          </ICol>
          <ICol>
          <ITextBox name='advices' value={formData.advices} onChange={onChange} max='350'/>
          </ICol>
          <ICol>
          <ITextBox name='discharge_meds' value={formData.discharge_meds} onChange={onChange} max='350'/>
          </ICol>
        </IRow>
       {props.inert==='false' && <IRow>
          <ICol>
          <Link to='/patients/view_patient_visit'><button type='button' className='danger-btn formbtn' tooltip='Cancel'>Cancel</button></Link>
            <button type='submit' form="dischargeform" className=' primary-btn formbtn' tooltip='Submit' value="submit">Submit</button>
          </ICol>
        </IRow>}
      </form>
    </>
  )
}

export default DischargeForm