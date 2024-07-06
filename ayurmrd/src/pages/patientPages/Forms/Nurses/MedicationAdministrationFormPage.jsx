import React from 'react';
import Patient from '../../../../components/patient/Patient';
import FormContainer from '../../../../components/forms/essentials/FormContainer';
import MedicationAdministrationForm from '../../../../components/forms/live/Nurses/MedicationAdministrationForm';
import STable from '../../../../components/tables/STable';
import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';

const MedicationAdministrationFormPage = () => {
  const current_user = useAuth();
    const table_api = 'http://localhost:5000/api/get_medication_admistration_records'
const [update,setUpdate] = useState(0);
const updater = ()=>{
  setUpdate(update => update + 1);
}
  return (
    <Patient>
  <div className="card">
  <FormContainer form={<MedicationAdministrationForm update_table={updater} inert={current_user.permissions.includes('edit_nurse_form')? 'false' : 'true'}/>}/>
  </div>
  <STable title='Medication Administration Records' update={update} api_url={table_api}></STable>
  </Patient>
  )
}

export default MedicationAdministrationFormPage