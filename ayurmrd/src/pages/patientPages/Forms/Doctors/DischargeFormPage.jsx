import React from 'react'
import Patient from '../../../../components/patient/Patient';
import FormContainer from '../../../../components/forms/essentials/FormContainer';
import useAuth from '../../../../hooks/useAuth';
import DischargeForm from '../../../../components/forms/live/Doctors/DischargeForm';

const DischargeFormPage = () => {
    const current_user = useAuth();
  return (
    <Patient>
    <div className="card">
    <FormContainer form={<DischargeForm inert={current_user.permissions.includes('edit_doctor_form')? 'false' : 'true'}/>}/>
    </div>
    </Patient>
  )
}

export default DischargeFormPage