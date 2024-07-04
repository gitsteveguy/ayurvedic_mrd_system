import React from 'react';
import Patient from '../../../../components/patient/Patient';
import FormContainer from '../../../../components/forms/essentials/FormContainer';
import TreatmentProcedureOrderForm from '../../../../components/forms/live/Doctors/TreatmentProcedureOrderForm';
import STable from '../../../../components/tables/STable';
import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';


const TreatmentProcedureFormPage = () => {
  const current_user = useAuth();
const [update,setUpdate] = useState(0);
const updater = ()=>{
  setUpdate(update => update + 1);
}
return (
  <Patient>
  <div className="card">
  <FormContainer form={<TreatmentProcedureOrderForm update_table={updater} inert={current_user.permissions.includes('edit_doctor_form')? 'false' : 'true'}/>}/>
  </div>
  <STable title='Treatment Procedure Records' update={update} api_url='http://localhost:5000/api/get_treatment_procedure_order_records'></STable>
  </Patient>
)
}

export default TreatmentProcedureFormPage