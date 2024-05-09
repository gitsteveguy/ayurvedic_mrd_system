import React from 'react'
import FormContainer from '../../components/forms/essentials/FormContainer'
import FetchForm from '../../components/forms/demo/FetchForm'

export default function FetchFormPage() {
  return (
    <div className="card">
    <FormContainer form={<FetchForm api_url='http://localhost:5000/test/api/fetchform'/>}/>
    </div>
  )
}
