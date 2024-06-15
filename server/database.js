import mysql from 'mysql2';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config({ path: './.env' });

const DB = mysql.createPool({
    host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
  }).promise()

export async function getUserbyUsername(username){
    const [result] = await DB.query('Select user_id,username,email,first_name,last_name,role,date_of_birth,phone_no,profile_img,gender,address_line_1,address_line_2,address_line_3,country,country_code,pincode,signature_img,occupation,blood_group from users where username = ?',username);
    return result[0]
}

export async function getPwdbyUsername(username){
    const [result] = await DB.query('Select password from users where username = ?',username);
    return result[0].password;
}

export async function verifyUser(username,password){
    try{
    const db_password = await getPwdbyUsername(username)
    const isUser = await bcrypt.compare(password, db_password);
    return isUser
    }
    catch (error) {
        console.error('Error verifying user:', error);
        return false;
    }
}

