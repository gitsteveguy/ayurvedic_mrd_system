import React from 'react'
import { useState, useEffect } from 'react';
import Container from '../Container'
import './patient.css'
import axios from 'axios';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import { getCurrentPatientID } from '../../hooks/currentPatientnVisit';
import useAuth from '../../hooks/useAuth';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';


const Patient = (props) => {
  const patient_id = getCurrentPatientID();
  const current_user = useAuth();
  const navigate = useNavigate()
  const [patientData, setPatientData] = useState({
    address_line_1: "",
    address_line_2: "",
    blood_group: "",
    country: "",
    country_code: "",
    date_of_birth: "",
    email: "",
    first_name: "",
    gender: "",
    last_name: "",
    occupation: "",
    phone_no: "",
    pincode: "",
    profile_img: "",
    role: "",
    signature_img: "",
    state: "",
    user_id: "",
    username: ""
  })
  function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const now = new Date();

    let age = now.getFullYear() - dob.getFullYear();

    // Adjust age if birthday hasn't occurred yet this year
    if (now.getMonth() < dob.getMonth() || (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  }

  function extractDateOfBirth(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    return dob.toDateString(); // Example: "Tue Jun 10 2003"
  }

  const patient_data_api_url = 'http://localhost:5000/api/get_patients_by_id';

  useEffect(() => {
    axios.get(patient_data_api_url, { params: { id: patient_id }, withCredentials: true }).then(response => {
      if (!response) {
        throw new Error('Network response was not ok');
      }
      return (response.data);
    }).then((data) => {
      setPatientData(data);
    })
  }, [patient_data_api_url]);


  return (
    <Container page_name={props.title} active_menu='Patients' type='flex'>
      <div className="card">
        <div id="detailContainer">
          <img src={patientData.profile_img} alt="" />
          <div className="patient-details">
            <h3>Name : {patientData.first_name + ' ' + patientData.last_name}</h3>
            <h3><EmailIcon fontSize='small' />  <a href={"mailto:" + patientData.email}>{patientData.email}</a></h3>
            <h3><CallIcon fontSize='small' />  <a href={'tel:' + patientData.phone_no}>{patientData.phone_no}</a></h3>
            <h3>Nationality : {patientData.country}</h3>
          </div>
          <div className="patient-details">
            <h3>Gender : {patientData.gender}</h3>
            <h3>< BloodtypeIcon fontSize='small' style={{ color: 'red' }} /> {patientData.blood_group}</h3>
            <h3>Date of Birth : {extractDateOfBirth(patientData.date_of_birth)}</h3>
            <h3>Age : {calculateAge(patientData.date_of_birth)}</h3>
          </div>
        </div>
        <div className="container-top-btn-grp" style={{ margin: '0.5rem' }}>
          < a className='primary-btn' onClick={() => navigate(-1)} style={{ borderRadius: '24px', cursor: 'pointer' }}><ArrowBackIosNewIcon />Go Back</a>
          {props.hBtns && props.hBtns.map((btn, index) => {
            let borderRadius = '24px';
            if (!btn.text)
              borderRadius = '50%'
            if (!Array.isArray(btn.permission)) {
              btn.permission = [btn.permission];
            }
            if (btn.permission.some(each_permission => current_user.permissions.includes(each_permission)))
              return (
                <a key={index} href={btn.href} onClick={btn.onClick} className={btn.className} style={{ borderRadius: borderRadius }} tooltip={btn.tooltip}>{btn.icon}{btn.text}</a>)
          })
          }

        </div>
      </div>
      {props.children}



    </Container >
  )
}

export default Patient