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
import useAuth from '../../../../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function DoctorsInitialAssessmentForm() {
  const current_patient_id = getCurrentPatientID();
  const current_patient_visit_id = getCurrentPatientVisitID();
  const fetch_api_url ='http://localhost:5000/api/get_doctor_initial_assessment'
  const post_api_url = 'http://localhost:5000/api/update_doctor_initial_assessment'
  const currentUser = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    user_id : current_patient_id,
    visit_id: current_patient_visit_id,
    temperature:'',
    pulse: '',
    blood_pressure: "",
    height: "",
    pain_assessment: "",
    weight: "",
    bmi:"",
    present_complaints: "",
    allergies:"",
    existing_medicines:"",
    sleep_hours: "",
    unconscious:"false",
    disoriented:"false",
    bedridden:"false",
    addictions:"",
    others:"",
    doctor_id : currentUser.user_id,
    doctor_name : currentUser.first_name+' '+currentUser.last_name,
    doctor_sign : currentUser.signature_img
  });

  let animated_inputs_label_class = 'input_has_value'
 
  useEffect(()=>{
    fetchData(fetch_api_url);
  },[fetch_api_url])

  useEffect(() => {
    setFormData(() => ({
      ...formData,
      ['bmi']: parseInt(formData.weight/((formData.height/100)**2))
    }))
  
  }, [formData.weight,formData.height]);



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
          console.log(data.formData);
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
 

  return (
    <>
      <h1>Doctors Initial Assesment</h1>
      <form name='initialassessment' id='initialassessment'  autoComplete='off' onSubmit={handleSubmit}>
        <IRow title='Vital Signs'>
          <ICol>
          <ITxtInput name='temperature' value={formData.temperature} onChange={onChange} type='number' labAnimClass={animated_inputs_label_class}/>
          </ICol>
          <ICol>
          <ITxtInput name='pulse' value={formData.pulse} onChange={onChange} type='number' labAnimClass={animated_inputs_label_class}/>
          </ICol>
          <ICol>
          <ITxtInput name='blood_pressure' value={formData.blood_pressure} onChange={onChange} type='number' labAnimClass={animated_inputs_label_class}/>
          </ICol>
        </IRow>
        <IRow>
        <ICol>
          <ITxtInput label='Height in cms' name='height' value={formData.height} onChange={onChange} type='number' labAnimClass={animated_inputs_label_class}/>
        </ICol>
        <ICol>
          <ITxtInput name='weight' value={formData.weight} onChange={onChange} type='number' labAnimClass={animated_inputs_label_class}/>
        </ICol>
        <ICol>
        <SingleSelect name='pain_assessment' api_url='http://localhost:5000/api/select/pain_assessment' value={formData.pain_assessment} onChange={onChange} />
        <label htmlFor="select">Pain Assessment - Select the Correct Value</label>
        </ICol>
        </IRow>
        <IRow title='General Examination'>
        <ICol>
            <ITxtInput label='Body Mass Index' name='bmi' value={formData.bmi} onChange={onChange} type='number' labAnimClass={animated_inputs_label_class}/>
            </ICol>
            <ICol>
            <ITxtInput name='sleep_hours' value={formData.sleep_hours} onChange={onChange} type='number' labAnimClass={animated_inputs_label_class}/>
            </ICol>
            <ICol>
            <Checkbox name='unconscious' defaultValue={formData.unconscious} onChange={onChange} />
          </ICol>
          <ICol>
            <Checkbox name='disoriented' defaultValue={formData.disoriented} onChange={onChange} />
          </ICol>
          <ICol>
            <Checkbox name='bedridden' defaultValue={formData.bedridden} onChange={onChange} />
          </ICol>
        </IRow>
        <IRow title='History'>
        <ICol>
            <ITextBox name='present_complaints' value={formData.present_complaints} onChange={onChange} max='500'/>
        </ICol>
        <ICol>
            <ITextBox name='existing_medicines' value={formData.existing_medicines} onChange={onChange} max='500'/>
        </ICol>
        </IRow>
        <IRow>
        <ICol>
            <ITextBox name='allergies' value={formData.allergies} onChange={onChange} max='500'/>
        </ICol>
        <ICol>
            <ITextBox name='addictions' value={formData.addictions} onChange={onChange} max='500'/>
        </ICol>
        </IRow>
        <IRow>
        <ICol>
            <ITextBox name='others' value={formData.others} onChange={onChange} max='1000'/>
        </ICol>
        </IRow>
        <IRow>
          <ICol>
          <Link to='/patients/view_patient_visit'><button type='button' className='danger-btn formbtn' tooltip='Cancel'>Cancel</button></Link>
            <button type='submit' form="initialassessment" className=' primary-btn formbtn' tooltip='Submit' value="submit">Submit</button>
          </ICol>
        </IRow>
      </form>
    </>
  )
}
