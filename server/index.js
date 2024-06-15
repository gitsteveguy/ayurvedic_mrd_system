import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { getUserbyUsername,getPwdbyUsername,verifyUser } from './database.js';

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    method : ["GET","POST"],
    credentials : true
  };
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors(corsOptions));

  dotenv.config({ path: './.env' });

app.get('/test/api/select',(req,res)=>{
    let options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']
    res.json(options);
})



app.use(express.json())

app.use("/assets", express.static('assets'));


app.post('/login',async (req,res)=>{
  const rusername = req.body.username;
  const rpassword = req.body.password;
  const isAuthenticated = await verifyUser(rusername, rpassword);
  if(isAuthenticated)
  {
    const User =  await getUserbyUsername(rusername);
    const jwt_token = jwt.sign({ User }, process.env.JWT_SECRET, { expiresIn: '1h' });
res.json({
  msg:'logged_in',
  token: jwt_token
})
  }
  })

app.post('/test/post/', (req, res) => {
  const formData = req.body;
  res.send(`<h1>Form Data Submitted:</h1><pre>${JSON.stringify(formData, null, 2)}</pre>`);
});

app.get('/test/api/fetchform',(req,res)=>{
  let options = {
    text : 'Text 2',
    textarea : 'Textarea 1',
    date : '2024-05-15',
    time: "01:00",
    tel: "9876543210",
    number: "12",
    select: "Option 2",
    MultiSelect: [
      "Option 1",
      "Option 2"
    ],
    checkbox: "true",
    Radio: "Option 3" 
  }
  res.json(options);
})

//Dashboard
app.get('/test/api/charts/visits',(req,res)=>{
  let data = {
    
    datasets : [{
      label : 'Visits - 2024',
      data :[
      {
        "x": "Jan",
        "y": 5
    },
    {
        "x": "Feb",
        "y": 6
    },
    {
        "x": "Mar",
        "y": 2
    },
    {
        "x": "Apr",
        "y": 1
    },
    {
        "x": "May",
        "y": 20
    },
    {
        "x": "Jun",
        "y": 7
    }
    ],
    borderColor: "#008500",
    backgroundColor: "#008500"},
    {
      label : 'Visits - 2023',
      data :[
      {
        "x": "Jan",
        "y": 1
    },
    {
        "x": "Feb",
        "y": 8
    },
    {
        "x": "Mar",
        "y": 4
    },
    {
        "x": "Apr",
        "y": 5
    },
    {
        "x": "May",
        "y": 15
    },
    {
        "x": "Jun",
        "y": 2
    },
    {
      "x": "July",
      "y": 8
  },
  {
    "x": "Aug",
    "y": 5
},
{
  "x": "Sept",
  "y": 2
},
{
  "x": "Oct",
  "y": 3
},
{
  "x": "Nov",
  "y": 7
},
{
  "x": "Dec",
  "y": 10
},
    ],
    borderColor: "#4B271B",
    backgroundColor: "#4B271B"}

  ]
  }
  res.json(data);
})

app.get('/test/api/recentvisit',(req,res)=>{
  let recentvisits = [
    {
      patient_name : 'Patient 1',
      patient_img : 'http://localhost:5000/assets/dummy/patient.jpg',
      patient_visit : '20-05-2024',
      btn_url : '/visit?id=1'
    },
    {
      patient_name : 'Patient 2',
      patient_img : 'http://localhost:5000/assets/dummy/patient.jpg',
      patient_visit : '21-05-2024',
      btn_url : '/visit?id=2'
    },
    {
      patient_name : 'Patient 3',
      patient_img : 'http://localhost:5000/assets/dummy/patient.jpg',
      patient_visit : '22-05-2024',
      btn_url : '/visit?id=3'
    },
    {
      patient_name : 'Patient 4',
      patient_img : 'http://localhost:5000/assets/dummy/patient.jpg',
      patient_visit : '23-05-2024',
      btn_url : '/visit?id=4'
    },
    {
      patient_name : 'Patient 5',
      patient_img : 'http://localhost:5000/assets/dummy/patient.jpg',
      patient_visit : '24-05-2024',
      btn_url : '/visit?id=5'
    },
  ]
  res.json(recentvisits)
})

//Staff
app.get('/test/api/staffdata',(req,res)=>{
  let staff = [
    {
      staff_name : 'Doctor 1',
      staff_img : 'http://localhost:5000/assets/dummy/doctor.jpg',
      role : 'Doctor',
      btn_url : '/staff_details?id=1'
    },
    {
      staff_name : 'Nurse 1',
      staff_img : 'http://localhost:5000/assets/dummy/nurse.jpg',
      role : 'Nurse',
      btn_url : '/staff_details?id=2'
    },
    {
      staff_name : 'Doctor 2',
      staff_img : 'http://localhost:5000/assets/dummy/doctor.jpg',
      role : 'Doctor',
      btn_url : '/staff_details?id=3'
    },
    {
      staff_name : 'Nurse 2',
      staff_img : 'http://localhost:5000/assets/dummy/nurse.jpg',
      role : 'Nurse',
      btn_url : '/staff_details?id=4'
    },
    {
      staff_name : 'Nurse 3',
      staff_img : 'http://localhost:5000/assets/dummy/nurse.jpg',
      role : 'Nurse',
      btn_url : '/staff_details?id=5'
    },
  ]
  res.json(staff)
})

//Patients
app.get('/test/api/patients',(req,res)=>{
  let patients = [
    {
        patient_name: "Patient 1",
        patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
        patient_visit: "20-05-2024",
        btn_url: "/patient?id=1"
    },
    {
        patient_name: "Patient 2",
        patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
        patient_visit: "21-05-2024",
        btn_url: "/patient?id=2"
    },
    {
        patient_name: "Patient 3",
        patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
        patient_visit: "22-05-2024",
        btn_url: "/patient?id=3"
    },
    {
        patient_name: "Patient 4",
        patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
        patient_visit: "23-05-2024",
        btn_url: "/patient?id=4"
    },
    {
        patient_name: "Patient 5",
        patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
        patient_visit: "24-05-2024",
        btn_url: "/patient?id=5"
    },
    {
        patient_name: "Patient 6",
        patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
        patient_visit: "25-05-2024",
        btn_url: "/patient?id=6"
    },
    {
        patient_name: "Patient 7",
        patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
        patient_visit: "26-05-2024",
        btn_url: "/patient?id=7"
    },
    {
        patient_name: "Patient 8",
        patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
        patient_visit: "27-05-2024",
        btn_url: "/patient?id=8"
    },
    {
        patient_name: "Patient 9",
        patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
        patient_visit: "28-05-2024",
        btn_url: "/patient?id=9"
    },
    {
        patient_name: "Patient 10",
        patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
        patient_visit: "29-05-2024",
        btn_url: "/patient?id=10"
    },
    {
        patient_name: "Patient 11",
        patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
        patient_visit: "30-05-2024",
        btn_url: "/patient?id=11"
    },
    {
        patient_name: "Patient 12",
        patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
        patient_visit: "31-05-2024",
        btn_url: "/patient?id=12"
    },
    {
        patient_name: "Patient 13",
        patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
        patient_visit: "01-06-2024",
        btn_url: "/patient?id=13"
    },
    {
        patient_name: "Patient 14",
        patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
        patient_visit: "02-06-2024",
        btn_url: "/patient?id=14"
    },
    {
        patient_name: "Patient 15",
        patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
        patient_visit: "03-06-2024",
        btn_url: "/patient?id=15"
    }
]
  res.json(patients)
})

//Analytics
app.get('/test/api/worldmap/patient_country',(req,res)=>{
  let patient_country = { US: 500, IN: 100 , GB: 2,RU:10, AU:5}
  res.json(patient_country);
})
app.get('/test/api/regular_patients',(req,res)=>{
  let patient_country = [
    {
      patient_name: "Top Patient 1",
      patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
      patient_visit_count: "20",
      btn_url: "/patient?id=1"
    },
    {
      patient_name: "Top Patient 2",
      patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
      patient_visit_count: "18",
      btn_url: "/patient?id=2"
    },
    {
      patient_name: "Top Patient 3",
      patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
      patient_visit_count: "17",
      btn_url: "/patient?id=3"
    },
    {
      patient_name: "Top Patient 4",
      patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
      patient_visit_count: "17",
      btn_url: "/patient?id=4"
    },
    {
      patient_name: "Top Patient 5",
      patient_img: "http://localhost:5000/assets/dummy/patient.jpg",
      patient_visit_count: "15",
      btn_url: "/patient?id=5"
    },
  ]
  res.json(patient_country);
})




app.listen(5000,()=>{
  console.log('Server Started on Port:5000');
});