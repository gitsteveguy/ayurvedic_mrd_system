import React from 'react'
import FormContainer from '../components/forms/essentials/FormContainer'
import Test from '../components/forms/test'

export default function TestPage() {
  return (
    <div className="card">
    <FormContainer form={<Test/>}/>
    </div>
  )
}
