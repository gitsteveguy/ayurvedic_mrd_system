import React from 'react';
import Patient from '../../../../components/patient/Patient';
import FormContainer from '../../../../components/forms/essentials/FormContainer';
import NursingCarePlanForm from '../../../../components/forms/live/Nurses/NursingCarePlanForm';
import STable from '../../../../components/tables/STable';
import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';

const NursingCarePlanFormPage = () => {
  const current_user = useAuth();
    const table_api = 'http://localhost:5000/api/get_nursing_care_plan_records'
const [update,setUpdate] = useState(0);
const updater = ()=>{
  setUpdate(update => update + 1);
}
  return (
    <Patient>
  <div className="card">
  <FormContainer form={<NursingCarePlanForm update_table={updater} inert={current_user.permissions.includes('edit_nurse_form')? 'false' : 'true'}/>}/>
  </div>
  <STable title='Nursing Care Plan Records' update={update} api_url={table_api}></STable>
  </Patient>
  )
}

export default NursingCarePlanFormPage