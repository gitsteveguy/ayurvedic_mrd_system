import React from 'react';
import Patient from '../../../../components/patient/Patient';
import FormContainer from '../../../../components/forms/essentials/FormContainer';
import MedicationRecordsForm from '../../../../components/forms/live/Doctors/MedicationRecordsForm';
import STable from '../../../../components/tables/STable';
import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';

const MedicationRecordsPage = () => {
  const current_user = useAuth();
  const [update,setUpdate] = useState(0);
  const updater = ()=>{
    setUpdate(update => update + 1);
  }
  return (
    <Patient>
    {current_user.permissions.includes('edit_doctor_form') && <div className="card">
    <FormContainer form={<MedicationRecordsForm update_table={updater} inert={current_user.permissions.includes('edit_doctor_form')? 'false' : 'true'}/>}/>
    </div>}
    <STable title='Medication Records' update={update} api_url='http://localhost:5000/api/get_medication_records'></STable>
    </Patient>
  )
}

export default MedicationRecordsPage