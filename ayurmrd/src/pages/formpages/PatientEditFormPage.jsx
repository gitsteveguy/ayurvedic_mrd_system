import React from 'react'
import FormContainer from '../../components/forms/essentials/FormContainer'
import PatientEditForm from '../../components/forms/live/PatientEditForm'

export default function PatientEditFormPage() {
  return (
    <div className="card">
    <FormContainer form={<PatientEditForm/>}/>
    </div>
  )
}
