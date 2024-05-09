import React from 'react'
import FormContainer from '../../components/forms/essentials/FormContainer'
import RepeatingForm from '../../components/forms/demo/RepeatingForm'

export default function RepeatingFormPage() {
  return (
    <div className="card">
    <FormContainer form={<RepeatingForm/>}/>
    </div>
  )
}
