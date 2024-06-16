import React, { useState, useEffect } from 'react'
import IRow from '../essentials/form-components/IRow';
import ICol from '../essentials/form-components/ICol';
import SingleSelect from '../essentials/form-components/SingleSelect';
import ImageCaptureInput from '../essentials/form-components/ImageCaptureInput';
import SignatureCapture from '../essentials/form-components/SignatureCapture';
import IDate from '../essentials/form-components/IDate';
import ITxtInput from '../essentials/form-components/ITxtInput';
import { GenderSelect } from '../essentials/form-components/SingleSelect';




export default function PatientCreationForm(props) {

  const [formData, setFormData] = useState({
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
    address_line_3: "",
    country: "",
    pincode: "",
    signature: "",
    occupation: "",
    blood_group: ""
  });

  let animated_inputs_label_class = 'input_has_value'
  useEffect(() => {
    fetchData(props.api_url);
  }, [props.api_url]);

  function fetchData(api_url) {
    fetch(api_url).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      if (typeof data != {}) {
        setFormData(data);
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
      <h1>Create Patient</h1>
      <form name='PatientCreationForm' id='PatientCreationForm' action="http://localhost:5000/test/post/" method="post" autoComplete='on'>
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
            <IDate name='date_of_birth' value={formData.date} max={'today'} onChange={onChange} />
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
          <ITxtInput name='address_line_3' value={formData.address_line_3} onChange={onChange} labAnimClass={animated_inputs_label_class}/>
          </ICol>
        </IRow>
        <IRow>
          <ICol>
            <GenderSelect name='gender' value={formData.gender} onChange={onChange} required={true}></GenderSelect>
          </ICol>
          <ICol>
          <SingleSelect name='country' api_url='http://localhost:5000/api/select/countries' value={formData.country} onChange={onChange} />
            <label htmlFor="country">Country</label>
          </ICol>
          <ICol>
          <SingleSelect name='blood_group' api_url='http://localhost:5000/api/select/blood_group' value={formData.blood_group} onChange={onChange} />
          <label htmlFor="blood_group">Blood Group</label>
          </ICol>
        </IRow>
        <ImageCaptureInput title='Image Capture Input' name='imageinput' required />
        <IRow>
          <SignatureCapture name='signature' label='Signature' required/>
        </IRow>
        <IRow>
          <ICol>
            <button type='button' className='danger-btn formbtn' tooltip='Cancel'>Cancel</button>
            <button type='submit' form="PatientCreationForm" className=' primary-btn formbtn' tooltip='Submit' value="submit">Submit</button>
          </ICol>
        </IRow>
      </form>
    </>
  )
}
