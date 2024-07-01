import React from 'react'
import Patient from '../../../../components/patient/Patient';
import FormContainer from '../../../../components/forms/essentials/FormContainer';
import DoctorsInitialAssessmentForm from '../../../../components/forms/live/Doctors/DoctorsInitialAssessmentForm'
import useAuth from '../../../../hooks/useAuth';

const DoctorsInitialAssessmentFormPage = () => {
  const current_user = useAuth();
  return (
    <Patient>
    <div className="card">
    <FormContainer form={<DoctorsInitialAssessmentForm inert={current_user.permissions.includes('edit_doctor_form')? 'false' : 'true'}/>}/>
    </div>
    </Patient>
  )
}

export default DoctorsInitialAssessmentFormPage