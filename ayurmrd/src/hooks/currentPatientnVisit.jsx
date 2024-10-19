export const setCurrentPatientID = (id) => {
    window.localStorage.setItem('current_patient_id', id);
}
export const getCurrentPatientID = () => {
    try {
        return window.localStorage.getItem('current_patient_id');
    }
    catch (err) {
        console.log(err);
    }
}

export const setCurrentPatientVisitID = (id) => {
    window.localStorage.setItem('current_patient_visit_id', id);
}
export const getCurrentPatientVisitID = () => {
    try {
        return window.localStorage.getItem('current_patient_visit_id');
    }
    catch (err) {
        console.log(err);
    }
}