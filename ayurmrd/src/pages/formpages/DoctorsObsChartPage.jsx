import React from 'react'
import FormContainer from '../../components/forms/essentials/FormContainer'
import DoctorsObsChartForm from '../../components/forms/live/DoctorsObsChartForm'
import Patient from '../../components/patient/Patient'

export default function DoctorsObsChartPage() {
  return (
    <Patient>
    <div className="card">
    <FormContainer form={<DoctorsObsChartForm/>}/>
    </div>
    </Patient>
  )
}
