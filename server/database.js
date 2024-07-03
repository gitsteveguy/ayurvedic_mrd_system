import mysql from "mysql2";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { patientSchema, userSchema } from "./schemas.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { imageToBase64, saveBase64Image,getMonthName } from "./utils.js";

dotenv.config({ path: "./.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const country_codes = JSON.parse(
  fs.readFileSync("./Jsons/countries.json", "utf8")
);
const countries = Object.keys(country_codes);

const DB = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

  export async function getPatientCountries() {
    const [resultu] = await DB.query(
      "SELECT country_code, COUNT(user_id) as user_count FROM users WHERE role = 'patient' GROUP BY country_code"
    );

    const resultDict = resultu.reduce((acc, row) => {
      acc[row.country_code] = row.user_count;
      return acc;
  }, {});
    return resultDict;
  }

  export async function getPatientVisitAnalyticsData(){
    const [resultu] = await DB.query(
      "SELECT * FROM visits WHERE YEAR(date_of_admission) = YEAR(CURDATE())"
    );
    const latestDate = new Date(Math.max(...resultu.map(visit => new Date(visit.date_of_admission))));
    const latestMonthIndex = latestDate.getMonth();
    // Initialize all months with 0 visits for 2024
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"].slice(0, latestMonthIndex + 1);

let visits = months.reduce((acc, month) => {
  acc[month] = 0;
  return acc;
}, {});

// Grouping data by month for the current year (2024)
resultu.forEach(visit => {
  const month = getMonthName(visit.date_of_admission);
  visits[month]++;
});

const formattedData = Object.keys(visits).map(month => ({
  x: month,
  y: visits[month]
}));
    const result = [
        {
          label: "Visits - 2024",
          data: formattedData,
          borderColor: "#008500",
          backgroundColor: "#008500",
        }
      ]
    
    return result;
  }

  export async function getLatestVisits(){
    const [visits] = await DB.query(
     ` SELECT v.visit_id, v.user_id, DATE_FORMAT(v.date_of_admission,'%d-%m-%Y') AS date_of_admission, u.first_name, u.last_name ,u.profile_img FROM visits v JOIN users u ON v.user_id = u.user_id ORDER BY v.date_of_admission DESC LIMIT 5`
    );

    const recentVisits = visits.map(visit => ({
      patient_name: `${visit.first_name} ${visit.last_name}`,
      patient_img: 'data:image/png;base64,'+imageToBase64(visit.profile_img),
      patient_visit: visit.date_of_admission,
      visit_id: visit.visit_id,
      user_id: visit.user_id
  }));
    return recentVisits;
  }

  export async function getStaffData(search=''){
    const [result] = await DB.query(
     `SELECT first_name,last_name,profile_img,user_id FROM users WHERE role<>'patient' AND role<>'superadmin' AND (first_name LIKE ? OR last_name LIKE ? OR user_id = ?)`,[`%${search}%`, `%${search}%`, search]
    );

    const staffs = result.map(staff => ({
      staff_name: `${staff.first_name} ${staff.last_name}`,
      staff_img: 'data:image/png;base64,'+imageToBase64(staff.profile_img),
      role: staff.role,
      user_id: staff.user_id
  }));
    return staffs;
  }

  export async function getRegularPatients(){
    const [patients] = await DB.query(
     `SELECT u.user_id, u.first_name, u.last_name, u.profile_img, COUNT(v.visit_id) AS patient_visit_count FROM users u JOIN visits v ON u.user_id = v.user_id GROUP BY u.user_id, u.first_name, u.last_name ORDER BY patient_visit_count DESC LIMIT 5;`
    );


        const topPatients = patients.map(patient => ({
            patient_name: `${patient.first_name} ${patient.last_name}`,
            patient_img: 'data:image/png;base64,'+imageToBase64(patient.profile_img),
            patient_visit_count: patient.patient_visit_count,
            patient_id: patient.user_id
        }));
    return topPatients;
  }

  export async function getVisitByID(visit_id){
    const [visit] = await DB.query(
     `SELECT visit_id,user_id, staff_editable,DATE_FORMAT(date_of_admission,'%Y-%m-%d') AS check_in FROM visits WHERE visit_id = ?;`,[visit_id]
    );
    return visit[0];
  }

  export async function getStaffRoles(){
    const sql = `SELECT name FROM roles WHERE name<>'patient' AND name<>'superadmin'`
    try{
     const [result] = await DB.query(sql);
     const roles = result.map(role => role.name);
      return roles;
    }
    catch(err){
      console.log(err);
    }
  }
  

  export async function updateVisit(formData){
    const visit_id = formData.visit_id;
    const patient_id = formData.patient_id;
    const checkout = formData.check_out;
  
      const sql = `UPDATE visits SET date_of_discharge = ? WHERE visit_id = ? AND user_id = ?`
      try{
        const[result] = await DB.query(sql,[checkout,visit_id,patient_id]);
        return['success',result.insertId,'Succesfully Checkout'];
      }
      catch(err){
        console.log(err);
        return ['failed','','Checkout was unsuccesfull'];
      }
    
  }

export async function getUserbyUsername(username) {
  const [resultu] = await DB.query(
    "Select user_id,username,email,first_name,last_name,role,date_of_birth,phone_no,profile_img,gender,address_line_1,address_line_2,state,country,country_code,pincode,signature_img,occupation,blood_group from users where username = ?",
    username
  );
  const user = resultu[0];
  const [resultp] = await DB.query(
    "Select permissions from roles where name = ?",
    user.role
  );
  user["permissions"] = JSON.parse(resultp[0].permissions);
  return user;
}


export async function getUserbyID(id,role='any') {
    if(role==='any'){
        try{
    const [resultu] = await DB.query(
      "Select user_id,username,email,first_name,last_name,role,date_of_birth,phone_no,profile_img,gender,address_line_1,address_line_2,state,country,country_code,pincode,signature_img,occupation,blood_group from users where user_id = ?",
      [id]
    );
    const user = resultu[0];
    return user
}
    catch(err){
        console.log(err);
    }
}
else{
    try{
    const [resultu] = await DB.query(
        `Select user_id,username,email,first_name,last_name,role,date_of_birth,phone_no,profile_img,gender,address_line_1,address_line_2,state,country,country_code,pincode,signature_img,occupation,blood_group from users where user_id = ? and role='${role}'`,
        [id]
      );
      const user = resultu[0];
      return user}
      catch(err){
        console.log(err);
      }
}
}
// Patients and Users
export async function createUser(user,role) {
  try {
    if(role==='patient'){
    const { error, value } = patientSchema.validate(user, {
      abortEarly: false,
    });
    if (error) {
      throw new Error(`${error.details.map((d) => d.message).join(", ")}`);
    }}
    else{
      const { error, value } = userSchema.validate(user, {
        abortEarly: false,
      });
      if (error) {
        throw new Error(`${error.details.map((d) => d.message).join(", ")}`);
      }
    }

    const password = await bcrypt.hash(user.password, 10);
    const username = user.username;
    const profile_img = user.profile_img;
    const signature = user.signature;
    const country = user.country;
    const country_code = country_codes[country];
    let profilePath = "";
    let signaturePath = "";

    const userDir = "./assets/users/"+role+"/" + username;

    // Create the directory if it doesn't exist
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    try {
      // Save profile image if provided
      if (profile_img) {
        const profile_img_name = username + "_profile.png";
        profilePath = path.join(userDir, profile_img_name); // Adjust file extension as needed
        await saveBase64Image(profile_img, profilePath);
      }

      // Save signature image if provided
      if (signature) {
        const signature_img_name = username + "_signature.png";
        signaturePath = path.join(userDir, signature_img_name); // Adjust file extension as needed
        await saveBase64Image(signature, signaturePath);
      }
    } catch (err) {
      return ["failed", "", "Invalid Image"];
    }
    try {
      const sql = `INSERT INTO users (username,email,password,first_name,last_name,role,date_of_birth,phone_no,profile_img,gender,address_line_1,address_line_2,state,country,country_code,pincode,signature_img,occupation,blood_group) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const [result] = await DB.query(sql, [
        user.username,
        user.email,
        password,
        user.first_name,
        user.last_name,
        role,
        user.date_of_birth,
        user.phone_no,
        profilePath,
        user.gender,
        user.address_line_1,
        user.address_line_2,
        user.state,
        country,
        country_code,
        user.pincode,
        signaturePath,
        user.occupation,
        user.blood_group,
      ]);
      const id = result.insertId;
      let msgrole = role.charAt(0).toUpperCase() + role.slice(1);

      return ["success", id, msgrole+" has been Created"];
    } catch (error) {
        console.log(error);
      return ["failed", "", error.sqlMessage];
    }
  } catch (error) {
    console.log(error);
    return ["failed", "", error.message];
  }
}

export async function getPwdbyUsername(username) {
  const [result] = await DB.query(
    "Select password from users where username = ?",
    username
  );
  return result[0].password;
}

export async function verifyUser(username, password) {
  try {
    const db_password = await getPwdbyUsername(username);
    const isUser = await bcrypt.compare(password, db_password);
    return isUser;
  } catch (error) {
    console.error("Error verifying user:", error);
    return false;
  }
}

export async function getPatients(search='',sort='descending'){
    let order = "DESC"
    if(sort==='ascending')
        order = 'ASC'
    let sql = `SELECT user_id,first_name,last_name,profile_img from users WHERE role = 'patient' AND (first_name LIKE ? OR last_name LIKE ? OR user_id = ?) ORDER BY user_id ${order}`;
    let [result] = await DB.query(
        sql,
        [`%${search}%`, `%${search}%`, search]
      );
      return result;
}



export async function createVisit(patient_id,check_in_date){
  const isql = "SELECT visit_id,DATE_FORMAT(date_of_admission,'%d-%m-%y') as date_of_admission FROM visits WHERE user_id=? AND date_of_discharge IS NULL"; 
  try{
  const[iresult] = await DB.query(isql,[patient_id]);
  if(iresult.length>0){
    return ["failed", '', "Checkout the visit on "+iresult[0].date_of_admission+" to create a new visit"];
  }
 
  const sql = 'INSERT INTO visits(user_id,date_of_admission) VALUES(?,?)'
  try{
   const[result] = await DB.query(sql,[patient_id,check_in_date]);
    const id = result.insertId;
    return ["success", id, "Visit has been Created"];
  }
  catch(err){
    console.log(err);
    return ["failed", '', "Visit has not been Created"];
  }
}
catch(err){
  console.log(err);
  return ["failed", '', "Visit has not been Created"];
}
}

export async function getVisitsByPatientID(patient_id){
  const sql = `SELECT DATE_FORMAT(date_of_admission,'%d-%m-%y') as checkin,  DATE_FORMAT(date_of_discharge,'%d-%m-%y') as checkout,visit_id FROM visits WHERE user_id = ? ORDER BY date_of_admission DESC`
  try{
   const [result] = await DB.query(sql,[patient_id]);
    return result;
  }
  catch(err){
    console.log(err);
    return ["failed", '', "Error Fetching Visits"];
  }
}

//forms
//doctors' initial assessment
export async function handleDoctorInitialAssessment(formData){
  console.log(formData);
  const isql = "SELECT record_id FROM doctor_initial_assessment_form WHERE user_id=? AND visit_id=?"; 
  try{
  const[iresult] = await DB.query(isql,[formData.user_id,formData.visit_id]);
  if(iresult.length===0){
    const sql = ` INSERT INTO doctor_initial_assessment_form ( user_id, visit_id, temperature, pulse, blood_pressure, height, pain_assessment, weight, bmi, present_complaints, sleep_hours, unconscious, disoriented, bedridden, others, addictions, allergies, existing_medicines, doctor_id, doctor_name, doctors_sign ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;

    const values = [ formData.user_id, formData.visit_id, formData.temperature, formData.pulse, formData.blood_pressure, formData.height, formData.pain_assessment, formData.weight, formData.bmi, formData.present_complaints, formData.sleep_hours, formData.unconscious, formData.disoriented, formData.bedridden, formData.others, formData.addictions, formData.allergies, formData.existing_medicines, formData.doctor_id, formData.doctor_name, formData.doctor_sign ];
try{
const [result] = await DB.query(sql, values);
let id = result.insertId
return ["success", id, "Record has been Inserted"]
}
    catch(err){
      console.log(err);
      return ["failed", id, "Record has not been Inserted"]
    }
  }
  else{
    const record_id = iresult[0].record_id;
    const sql = ` UPDATE doctor_initial_assessment_form SET temperature = ?, pulse = ?, blood_pressure = ?, height = ?, pain_assessment = ?, weight = ?, bmi = ?, present_complaints = ?, sleep_hours = ?, unconscious = ?, disoriented = ?, bedridden = ?, others = ?, addictions = ?,allergies = ?,existing_medicines = ?, doctor_id = ?, doctor_name = ?, doctors_sign = ? WHERE record_id = ? `;


const values = [
  formData.temperature, formData.pulse, 
  formData.blood_pressure, formData.height, formData.pain_assessment, 
  formData.weight, formData.bmi, formData.present_complaints, 
  formData.sleep_hours, formData.unconscious, formData.disoriented, 
  formData.bedridden, formData.others, formData.addictions, formData.allergies,formData.existing_medicines, 
  formData.doctor_id, formData.doctor_name, formData.doctors_sign,record_id
];
try {
  const [result] = await DB.query(sql, values);
  console.log(result);
  return ['success','','Record Updated Successfully']
} catch (err) {
  console.log(err);
  return ["failed",'', "Record has not been Updated"]
}
  }
}
  catch(err){
    console.log(err);
    return ["failed",'', "Record has not been Inserted or Updated"]
  }
}

export async function getDoctorInitialAssessment(user_id,visit_id){
  const isql = "SELECT * FROM doctor_initial_assessment_form WHERE user_id=? AND visit_id=?"; 
  try{
  const[iresult] = await DB.query(isql,[user_id,visit_id]);
  if(iresult.length>0)
  return ['success',iresult[0],true];
  else
  return ['success','',false];
}
  catch(err){
    console.log(err);
    return ['failed','',''];
  }
}

//medication_records
export async function addMedicationRecords(payload){
  const user_id = payload.user_id;
  const visit_id = payload.visit_id;
  const doctor_id = payload.doctor_id;
  const doctor_name = payload.doctor_name;
  const doctors_sign = payload.doctors_sign;

  const records = payload.formData;
    const sql = 'INSERT INTO medication_orders(visit_id,user_id,date,medicine,route_site,dose,time,anupana,remarks,doctor_id,doctor_name,doctors_sign) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)'
    for (const record of records) {
    try{
      const[result] = await DB.query(sql,[visit_id,user_id,record.date,record.medicine,record.route_site,record.dose,record.time,record.anupana,record.remarks,doctor_id,doctor_name,doctors_sign]);
    }
    catch(err){
      console.log(err);
      return ['failed',''];

    }
  }
  return['success','Inserted '+records.length+' records'];
}

export async function getMedicationRecords(user_id,visit_id){
  const sql = `SELECT med_ord_id as id,DATE_FORMAT(date,'%d-%m-%y') AS date,medicine,route_site,dose,time,anupana,remarks,doctor_name,doctors_sign FROM medication_orders WHERE user_id = ? AND visit_id = ?`
  try{
   const [results] = await DB.query(sql,[user_id,visit_id]);
   const actual_result = []
   results.forEach((result)=>{
    result['doctors_sign']= 'data:image/png;base64,'+imageToBase64(result['doctors_sign'])
    actual_result.push(result)
   })
    return ['success',actual_result,'Successfully Fetched Records'];
  }
  catch(err){
    console.log(err);
    return ["failed", '', "Error Fetching Records"];
  }
}

//treatment_procedure_records
export async function addTreatmentProcedureRecords(payload){
  const user_id = payload.user_id;
  const visit_id = payload.visit_id;
  const doctor_id = payload.doctor_id;
  const doctor_name = payload.doctor_name;
  const doctors_sign = payload.doctors_sign;

  const records = payload.formData;
    const sql = 'INSERT INTO treat_proc_ord(visit_id,user_id,date,time,treatment_procedure,medicine,site_loc,no_of_days,precautions,doctor_id,doctor_name,doctors_sign) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)'
    for (const record of records) {
    try{
      const[result] = await DB.query(sql,[visit_id,user_id,record.date,record.time,record.treatment_procedure,record.medicine,record.site_loc,record.no_of_days,record.precautions,doctor_id,doctor_name,doctors_sign]);
    }
    catch(err){
      console.log(err);
      return ['failed',''];
    }
  }
  return['success','Inserted '+records.length+' records'];
}

export async function getTreatmentProcedureRecords(user_id,visit_id){
  const sql = `SELECT treat_proc_id as id,DATE_FORMAT(date,'%d-%m-%y') AS date,time,treatment_procedure,medicine,site_loc,no_of_days,precautions,doctor_name,doctors_sign FROM treat_proc_ord WHERE user_id = ? AND visit_id = ?`
  try{
   const [results] = await DB.query(sql,[user_id,visit_id]);
   const actual_result = []
   results.forEach((result)=>{
    result['doctors_sign']= 'data:image/png;base64,'+imageToBase64(result['doctors_sign'])
    actual_result.push(result)
   })
    return ['success',actual_result,'Successfully Fetched Records'];
  }
  catch(err){
    console.log(err);
    return ["failed", '', "Error Fetching Records"];
  }
}


//vital_chart_records
export async function addVitalChartRecords(payload){
  const user_id = payload.user_id;
  const visit_id = payload.visit_id;
  const doctor_id = payload.doctor_id;
  const doctor_name = payload.doctor_name;
  const doctors_sign = payload.doctors_sign;

  const records = payload.formData;
    const sql = 'INSERT INTO vital_chart_form(visit_id,user_id,date,time,temperature,pulse,bp,weight,remarks,doctor_id,doctor_name,doctors_sign) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)'
    for (const record of records) {
    try{
      const[result] = await DB.query(sql,[visit_id,user_id,record.date,record.time,record.temperature,record.pulse,record.bp,record.weight,record.remarks,doctor_id,doctor_name,doctors_sign]);
    }
    catch(err){
      console.log(err);
      return ['failed',''];
    }
  }
  return['success','Inserted '+records.length+' records'];
}

export async function getVitalChartRecords(user_id,visit_id){
  const sql = `SELECT vital_chart_id as id,DATE_FORMAT(date,'%d-%m-%y') AS date,time,temperature,pulse,bp,weight,remarks,doctor_name,doctors_sign FROM vital_chart_form WHERE user_id = ? AND visit_id = ?`
  try{
   const [results] = await DB.query(sql,[user_id,visit_id]);
   const actual_result = []
   results.forEach((result)=>{
    result['doctors_sign']= 'data:image/png;base64,'+imageToBase64(result['doctors_sign'])
    actual_result.push(result)
   })
    return ['success',actual_result,'Successfully Fetched Records'];
  }
  catch(err){
    console.log(err);
    return ["failed", '', "Error Fetching Records"];
  }
}

//discharge_form
export async function getDischargeForm(user_id,visit_id){
  const isql = "SELECT * FROM discharge_summary WHERE user_id=? AND visit_id=?"; 
  try{
  const[iresult] = await DB.query(isql,[user_id,visit_id]);
  if(iresult.length>0)
  return ['success',iresult[0],true];
  else
  return ['success','',false];
}
  catch(err){
    console.log(err);
    return ['failed','',''];
  }
}

export async function handleDischargeForm(formData){
  console.log('trigger');
  console.log(formData);
  const isql = "SELECT discharge_id FROM discharge_summary WHERE user_id=? AND visit_id=?"; 
  try{
  const[iresult] = await DB.query(isql,[formData.user_id,formData.visit_id]);
  if(iresult.length===0){
    const sql = ` INSERT INTO discharge_summary ( user_id, visit_id, ailments, diagnosis, discharge_condition, restricted_activities, advices, discharge_meds, doctor_id, doctor_name, doctors_sign ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;

    const values = [ formData.user_id, formData.visit_id, formData.ailments, formData.diagnosis, formData.discharge_condition, formData.restricted_activities, formData.advices, formData.discharge_meds, formData.doctor_id, formData.doctor_name, formData.doctor_sign ];
try{
const [result] = await DB.query(sql, values);
let id = result.insertId
return ["success", id, "Record has been Inserted"]
}
    catch(err){
      console.log(err);
      return ["failed", id, "Record has not been Inserted"]
    }
  }
  else{
    const record_id = iresult[0].discharge_id;
    const sql = ` UPDATE discharge_summary SET ailments = ?, diagnosis = ?, discharge_condition = ?, restricted_activities = ?, advices = ?, discharge_meds = ?, doctor_id = ?, doctor_name = ?, doctors_sign = ? WHERE discharge_id = ? `;


const values = [
  formData.ailments, formData.diagnosis, 
  formData.discharge_condition, formData.restricted_activities, formData.advices, 
  formData.discharge_meds,
  formData.doctor_id, formData.doctor_name, formData.doctors_sign,record_id
];
try {
  const [result] = await DB.query(sql, values);
  console.log(result);
  return ['success','','Record Updated Successfully']
} catch (err) {
  console.log(err);
  return ["failed",'', "Record has not been Updated"]
}
  }
}
  catch(err){
    console.log(err);
    return ["failed",'', "Record has not been Inserted or Updated"]
  }
}
