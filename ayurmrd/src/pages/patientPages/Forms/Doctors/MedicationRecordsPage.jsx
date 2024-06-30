import React from 'react';
import Patient from '../../../../components/patient/Patient';
import FormContainer from '../../../../components/forms/essentials/FormContainer';
import MedicationRecordsForm from '../../../../components/forms/live/Doctors/MedicationRecordsForm';

const MedicationRecordsPage = () => {
  return (
    <Patient>
    <div className="card">
    <FormContainer form={<MedicationRecordsForm/>}/>
    </div>
    </Patient>
  )
}

export default MedicationRecordsPage