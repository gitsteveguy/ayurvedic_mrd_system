import React from 'react'
import FormContainer from '../../components/forms/essentials/FormContainer'
import StaffEditForm from '../../components/forms/live/StaffEditForm'

export default function StaffEditFormPage() {
  return (
    <div className="card">
    <FormContainer form={<StaffEditForm/>}/>
    </div>
  )
}
