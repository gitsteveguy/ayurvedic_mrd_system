import React from 'react'
import Patient from '../../components/patient/Patient'
import EditIcon from '@mui/icons-material/Edit';
import './ViewVisit.css'
import FormCards from '../../components/card-grids/FormCards';

const ViewVisit = () => {
    const hBtns = [
        {
          href: '/patients/edit_visit',
          text : 'Edit Visit',
          className: 'primary-btn',
          icon: <EditIcon/>,
          permission : 'edit_visit'
        }
      ]
      const doctorForms = [
        {
          name: 'Initial Assessment',
          href: '/patients/view_patient_visit/initial_assessment'
        },
        {
          name: 'Medication Records',
          href: '/patients/view_patient_visit/medication_records'
        },
        {
          name: 'Treatment Procedure Order ',
          href: '/patients/view_patient_visit/treatment_procedure_order'
        },
        {
          name: 'Vital Chart',
          href: '/patients/view_patient_visit/vital_chart'
        },
        {
          name: 'Discharge Form',
          href: '/patients/view_patient_visit/discharge_form'
        }
        
      ]
      const nurseForms = [
        {
          name: 'Nursing Care Plan',
          href: '/patients/view_patient_visit/nursing_care_plan'
        },
        {
          name: 'Medication Administration Chart ',
          href: '/patients/view_patient_visit/medication_administration_chart'
        },
        
      ]
  return (
    <Patient hBtns={hBtns} title={'View Patient'}>
        <div className="forms-container">
        <h2>Doctor's Forms</h2>
        <FormCards forms={doctorForms} formType='doctor_forms'></FormCards>
        <h2>Nurse's Forms</h2>
        <FormCards forms={nurseForms} formType='nurse_forms'></FormCards>
        </div>
    </Patient>
  )
}

export default ViewVisit