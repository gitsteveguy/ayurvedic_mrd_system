import mysql from "mysql2";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { userSchema } from "./schemas.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { saveBase64Image } from "./utils.js";

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
    const { error, value } = userSchema.validate(user, {
      abortEarly: false,
    });
    if (error) {
      throw new Error(`${error.details.map((d) => d.message).join(", ")}`);
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
  const sql = `SELECT DATE_FORMAT(date_of_admission,'%d-%m-%y') as checkin,  DATE_FORMAT(date_of_discharge,'%d-%m-%y') as checkout,visit_id FROM visits WHERE user_id = ?`
  try{
   const [result] = await DB.query(sql,[patient_id]);
    return result;
  }
  catch(err){
    console.log(err);
    return ["failed", '', "Visit has not been Created"];
  }
}