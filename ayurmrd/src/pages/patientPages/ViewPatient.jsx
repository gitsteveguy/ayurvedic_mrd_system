import React from 'react'
import Patient from '../../components/patient/Patient'
import Visits from '../../components/card-grids/Visits'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import './viewPatient.css'

const ViewPatient = () => {
  const visit_api_url = 'http://localhost:5000/api/get_visits_by_patient_ID'
  const hBtns = [
    {
      href: '/patients/add_visit',
      text: 'Add Visit',
      className: 'primary-btn',
      icon: <AddIcon />,
      permission: 'edit_visit'
    },
    {
      href: '/patients/edit_patient',
      text: 'Edit Patient',
      className: 'primary-btn',
      icon: <EditIcon />,
      permission: 'edit_patient'
    }
  ]
  return (
    <Patient hBtns={hBtns} title={'View Patient'}>
      <div className="visits-container">
        <h2>Visits</h2>
        <Visits visits_api_url={visit_api_url} />
      </div>
    </Patient>
  )
}

export default ViewPatient