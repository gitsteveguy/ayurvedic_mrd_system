import React from 'react';
import Patient from '../../../../components/patient/Patient';
import FormContainer from '../../../../components/forms/essentials/FormContainer';
import VitalChartForm from '../../../../components/forms/live/Doctors/VitalChartForm';
import STable from '../../../../components/tables/STable';
import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';

const VitalChartFormPage = () => {
  const current_user = useAuth();
    const table_api = 'http://localhost:5000/api/get_vital_chart_records'
const [update,setUpdate] = useState(0);
const updater = ()=>{
  setUpdate(update => update + 1);
}
  return (
    <Patient>
  <div className="card">
  <FormContainer form={<VitalChartForm update_table={updater} inert={current_user.permissions.includes('edit_doctor_form')? 'false' : 'true'}/>}/>
  </div>
  <STable title='Vital Chart Records' update={update} api_url={table_api}></STable>
  </Patient>
  )
}

export default VitalChartFormPage