import React, { useState, useEffect } from 'react'
import axios from 'axios';
import IRow from '../essentials/form-components/IRow';
import ICol from '../essentials/form-components/ICol';
import SingleSelect from '../essentials/form-components/SingleSelect';
import ImageCaptureInput from '../essentials/form-components/ImageCaptureInput';
import SignatureCapture from '../essentials/form-components/SignatureCapture';
import IDate from '../essentials/form-components/IDate';
import ITxtInput from '../essentials/form-components/ITxtInput';
import { GenderSelect } from '../essentials/form-components/SingleSelect';
import { toast,Bounce } from 'react-toastify';
import { getCurrentPatientID } from '../../../hooks/currentPatientnVisit';
import { Link } from 'react-router-dom';

export default function PatientEditForm(props){
    const form_api_url = 'http://localhost:5000/api/fetchpatientdetail'
    const form_post_url = 'http://localhost:5000/api/update_patient'
    const currentPatientID = getCurrentPatientID()
    const [formData, setFormData] = useState({
      user_id:currentPatientID,
      username: '',
      email: '',
      password: '',
      first_name: "",
      last_name: "",
      date_of_birth: "",
      phone_no: "",
      profile_img: "",
      gender: "",
      address_line_1: "",
      address_line_2: "",
      state: "",
      country: "",
      pincode: "",
      signature: "",
      occupation: "",
      blood_group: ""
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const submission = new Promise((resolve,reject) =>{ 
        setTimeout(()=>{
          axios.post(form_post_url, formData, { withCredentials: true }).then(response => {
            if (response.data.status==='success') {
              console.log(response);
              resolve(response.data.message);
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
              return "Updating Patient"
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
  
    let animated_inputs_label_class = 'input_has_value'
    useEffect((e) => {
      fetchData(form_api_url,currentPatientID)
    }, []);

    useEffect((e) => {
        console.log(formData);
      }, [formData]);
  
    function fetchData(api_url,patient_id) {
        axios.get(api_url,{params: {user_id: patient_id}, withCredentials: true}).then(response => {
            if (!response) {
              throw new Error('Network response was not ok');
            }
            return (response.data);
          }).then((data) => {
        if (typeof data != {}) {
          setFormData(data.formData);
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
  
   
  
    return (
      <>
        <h1>Edit Patient</h1>
        <form name='PatientEditForm' id='PatientEditForm' onSubmit={handleSubmit} autoComplete='on'>
          <IRow>
            <ICol>
              <ITxtInput name='username' value={formData.username} onChange={onChange} labAnimClass={animated_inputs_label_class}/>
            </ICol>
            <ICol>
            <ITxtInput name='email' value={formData.email} onChange={onChange} type='email' labAnimClass={animated_inputs_label_class}/>
            </ICol>
            <ICol>
            <ITxtInput name='password' value={formData.password} onChange={onChange} labAnimClass={animated_inputs_label_class}/>
            </ICol>
          </IRow>
          <IRow>
            <ICol>
            <ITxtInput name='first_name' value={formData.first_name} onChange={onChange} labAnimClass={animated_inputs_label_class}/>
            </ICol>
            <ICol>
            <ITxtInput name='last_name' value={formData.last_name} onChange={onChange} labAnimClass={animated_inputs_label_class}/>
            </ICol>
            <ICol>
            <ITxtInput name='phone_no'type='tel' pattern="[0-9]{1,3} [0-9]{10}" value={formData.phone_no} onChange={onChange} labAnimClass={animated_inputs_label_class}/>
            </ICol>
          </IRow>
          <IRow >
          <ICol>
              <IDate name='date_of_birth' value={formData.date_of_birth} max={'today'} onChange={onChange} />
            </ICol>
            <ICol>
            <ITxtInput name='occupation' value={formData.occupation} onChange={onChange} labAnimClass={animated_inputs_label_class}/>
            </ICol>
            <ICol>
            <ITxtInput name='pincode' value={formData.pincode} onChange={onChange} labAnimClass={animated_inputs_label_class}/>
            </ICol>
          </IRow>
          <IRow>
            <ICol>
              <ITxtInput name='address_line_1' value={formData.address_line_1} onChange={onChange} labAnimClass={animated_inputs_label_class}/>
            </ICol>
            <ICol>
            <ITxtInput name='address_line_2' value={formData.address_line_2} onChange={onChange} labAnimClass={animated_inputs_label_class}/>
            </ICol>
            <ICol>
            <ITxtInput name='state' value={formData.state} onChange={onChange} labAnimClass={animated_inputs_label_class}/>
            </ICol>
          </IRow>
          <IRow>
          <ICol>
            <SingleSelect name='country' api_url='http://localhost:5000/api/select/countries' value={formData.country} onChange={onChange} />
              <label htmlFor="country">Country</label>
            </ICol>
            <ICol>
              <GenderSelect name='gender' value={formData.gender} onChange={onChange} required={true}></GenderSelect>
            </ICol>
            <ICol>
            <SingleSelect name='blood_group' api_url='http://localhost:5000/api/select/blood_group' value={formData.blood_group} onChange={onChange} />
              <label htmlFor="blood_group">Blood Group</label>
            </ICol>
          </IRow>
          <ImageCaptureInput title='Profile Image' value={formData.profile_img} name='profile_img' onChange={onChange} required />
          <IRow>
            <SignatureCapture name='signature_img' label='New Signature' value={formData.signature} onChange={onChange} required/>
          </IRow>
          <IRow>
            <ICol>
            <ICol down={true} center={true}><h3>Old Signature and profile image will be kept if new ones are not drawn or captured</h3></ICol>
            </ICol>
          </IRow>
          <IRow>
            <ICol>
            <Link to='/patients'><button type='button' className='danger-btn formbtn' tooltip='Cancel'>Cancel</button></Link>
              <button type='submit' form="PatientEditForm" className=' primary-btn formbtn' tooltip='Submit' value="submit">Submit</button>
            </ICol>
          </IRow>
        </form>
      </>
    )
  }
