import React from 'react'
import FormContainer from '../../components/forms/essentials/FormContainer'
import StaffCreationForm from '../../components/forms/live/StaffCreationForm'

const StaffCreationPage = () => {
  return (
    <div className="card">
    <FormContainer form={<StaffCreationForm/>}/>
    </div>
  )
}

export default StaffCreationPage