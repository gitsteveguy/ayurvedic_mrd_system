import React from 'react'
import FormContainer from '../../components/forms/essentials/FormContainer'
import Patient from '../../components/patient/Patient'
import PrintIcon from '@mui/icons-material/Print';
import DoctorsInitialAssessmentForm from '../../components/forms/live/Doctors/DoctorsInitialAssessmentForm'
import DischargeForm from '../../components/forms/live/Doctors/DischargeForm'
import STable from '../../components/tables/STable'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { getCurrentPatientVisitID } from '../../hooks/currentPatientnVisit'

const visitID = getCurrentPatientVisitID();
const fetch_api_url = 'http://localhost:5000/api/get_visit_by_ID';



const ExportVisit = () => {
    const hBtns = [{
        onClick: () => window.print(),
        text: 'Print Visit Record',
        className: 'primary-btn',
        icon: <PrintIcon />,
        permission: ['view_self', 'view_patient']
    }]
    const [visitData, setVisitData] = useState({});

    const fetchVisit = (visit_id) => {
        axios.get(fetch_api_url, { params: { visit_id: visit_id }, withCredentials: true }).then(response => {
            if (!response) {
                throw new Error('Network response was not ok');
            }
            return (response.data);
        }).then((data) => {
            if (typeof data != {}) {
                if (data.check_in) {
                    setVisitData(data);
                }
            }
        })
    }


    useEffect(() => {
        fetchVisit(visitID)
    }, [])


    return (
        <Patient hBtns={hBtns}>
            <div className="card">
                <h1>Patient Record For The Visit<br />
                    {visitData.check_in} To {visitData.check_out ? visitData.check_out : "Present"}</h1>
            </div>
            <div className="card">
                <FormContainer form={<DoctorsInitialAssessmentForm inert='true' />} />
            </div>
            <STable title='Medication Records' api_url='http://localhost:5000/api/get_medication_records'></STable>
            <STable title='Treatment Procedure Records' api_url='http://localhost:5000/api/get_treatment_procedure_order_records'></STable>
            <STable title='Vital Chart Records' api_url='http://localhost:5000/api/get_vital_chart_records'></STable>
            <STable title='Nursing Care Plan Records' api_url='http://localhost:5000/api/get_nursing_care_plan_records'></STable>
            <STable title='Medication Administration Records' api_url='http://localhost:5000/api/get_medication_admistration_records'></STable>
            <div className="card">
                <FormContainer form={<DischargeForm inert='true' />} />
            </div>
        </Patient>
    )
}

export default ExportVisit