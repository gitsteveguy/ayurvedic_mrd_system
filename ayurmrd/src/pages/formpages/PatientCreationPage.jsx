import React from 'react'
import FormContainer from '../../components/forms/essentials/FormContainer'
import PatientCreationForm from '../../components/forms/live/PatientCreationForm'

export default function PatientCreationPage() {
  return (
    <div className="card">
    <FormContainer form={<PatientCreationForm/>}/>
    </div>
  )
}
