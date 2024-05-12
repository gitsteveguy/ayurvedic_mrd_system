import React from 'react'
import FormContainer from '../../components/forms/essentials/FormContainer'
import DoctorsObsChartForm from '../../components/forms/live/DoctorsObsChartForm'

export default function DoctorsObsChartPage() {
  return (
    <div className="card">
    <FormContainer form={<DoctorsObsChartForm/>}/>
    </div>
  )
}
