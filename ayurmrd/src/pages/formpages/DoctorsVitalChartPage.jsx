import React from "react";
import FormContainer from "../../components/forms/essentials/FormContainer";
import DoctorsVitalChartForm from "../../components/forms/live/DoctorsVitalChartForm";

export default function DoctorsVitalChartPage(){
    return(
        <div className="card">
    <FormContainer form={<DoctorsVitalChartForm />}/>
    </div>
    )

}