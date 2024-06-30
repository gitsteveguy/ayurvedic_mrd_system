import React from 'react'
import Patient from '../../../../components/patient/Patient';
import FormContainer from '../../../../components/forms/essentials/FormContainer';
import DoctorsInitialAssessmentForm from '../../../../components/forms/live/Doctors/DoctorsInitialAssessmentForm'

const DoctorsInitialAssessmentFormPage = () => {
  return (
    <Patient>
    <div className="card">
    <FormContainer form={<DoctorsInitialAssessmentForm/>}/>
    </div>
    </Patient>
  )
}

export default DoctorsInitialAssessmentFormPage