import express, { response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fs from "fs";
import bcrypt from "bcrypt";
import { imageToBase64 } from "./utils.js";
import {
  getPatientCountries,
  getPatientVisitAnalyticsData,
  getLatestVisits,
  getRegularPatients,
  getVisitByID,
  updateVisit,
  updateUser,
  getStaffRoles,
  getStaffData,
  getUserbyUsername,
  updateColorTheme,
  getColorTheme,
  verifyUser,
  createUser,
  getPatients,
  getUserbyID,
  createVisit,
  getVisitsByPatientID,
  handleDoctorInitialAssessment,
  getDoctorInitialAssessment,
  addMedicationRecords,
  getMedicationRecords,
  addTreatmentProcedureRecords,
  getTreatmentProcedureRecords,
  addVitalChartRecords,
  getVitalChartRecords,
  getDischargeForm,
  handleDischargeForm,
  addNursingCarePlanRecords,
  getNursingCarePlanRecords,
  addMedicationAdministrationRecords,
  getMedicationAdministrationRecords,
} from "./database.js";
import { log } from "console";

const app = express();
let country_codes = JSON.parse(
  fs.readFileSync("./Jsons/countries.json", "utf8")
);
let countries = Object.keys(country_codes);
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://portfolio.stevesajanjacob.com"
      : "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true,
};
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

dotenv.config({ path: "./.env" });

// Select API's
app.get("/api/select/countries", (req, res) => {
  let countries = Object.keys(country_codes);
  let select_countries = countries;
  select_countries.unshift("Select a Country");
  res.json(select_countries);
});
app.get("/api/select/staff_roles", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("edit_staff")) {
      let roles = [];
      if (decode.User.permissions.includes("superadmin"))
        roles = await getStaffRoles(true);
      else roles = await getStaffRoles();
      res.json(roles);
    }
  } catch (error) {
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.get("/api/select/blood_group", (req, res) => {
  const blood_group = [
    "Select a Blood Group",
    "A+",
    "A-",
    "AB+",
    "AB-",
    "B+",
    "B-",
    "O+",
    "O-",
  ];
  res.json(blood_group);
});
app.get("/api/select/pain_assessment", (req, res) => {
  const pain_assessment = ["None", "Low", "Medium", "High", "Unbearable"];
  res.json(pain_assessment);
});

app.use(express.json());

app.use("/assets", express.static("assets"));

app.post("/login", async (req, res) => {
  const rusername = req.body.username;
  const rpassword = req.body.password;
  if (rpassword && rusername) {
    const isAuthenticated = await verifyUser(rusername, rpassword).catch(
      (err) => res.send({ error: err })
    );
    if (isAuthenticated) {
      const User = await getUserbyUsername(rusername);
      const jwt_token = jwt.sign({ User }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({
        isLoggedIn: true,
        token: jwt_token,
        user_id: User.user_id,
      });
    } else
      res.json({
        isLoggedIn: false,
        message: "Invalid Credentials",
      });
  } else
    res.json({
      isLoggedIn: false,
      message: "Enter Credentials",
    });
});

//Color Theme Update
app.post("/api/update_color_theme/", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    let request = req.body;
    try {
      const [rstatus, user_id, msg] = await updateColorTheme(
        request.colorTheme,
        decode.User.user_id
      );
      const response = {
        status: rstatus,
        id: user_id,
        message: msg,
      };
      console.log(response);
      res.json(response);
    } catch (e) {
      console.log(e);
      const response = {
        status: "failed",
        id: "",
        message: "Unknown Reason",
      };
      res.json(response);
    }
  } catch (error) {
    const response = {
      status: "failed",
      id: "",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.get("/api/get_color_theme", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    let formData = req.body;
    const theme = await getColorTheme(decode.User.user_id);
    res.json({ colorTheme: theme });
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

//Create Staff
app.post("/api/create_staff/", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("edit_staff")) {
      let formData = req.body;
      try {
        const [rstatus, user_id, msg] = await createUser(
          formData,
          formData.role
        );
        const response = {
          status: rstatus,
          id: user_id,
          message: msg,
        };
        console.log(response);
        res.json(response);
      } catch (e) {
        console.log(e);
        const response = {
          status: "failed",
          id: "",
          message: "Unknown Reason",
        };
        res.json(response);
      }
    } else {
      const response = {
        status: "failed",
        id: "",
        message:
          "You do not have sufficient permissions to perform this action.",
      };
      res.json(response);
    }
  } catch (error) {
    const response = {
      status: "failed",
      id: "",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

//patient
app.post("/api/create_patient/", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("edit_patient")) {
      let formData = req.body;
      try {
        const [rstatus, user_id, msg] = await createUser(formData, "patient");
        const response = {
          status: rstatus,
          id: user_id,
          message: msg,
        };
        console.log(response);
        res.json(response);
      } catch (e) {
        console.log(e);
        const response = {
          status: "failed",
          id: "",
          message: "Unknown Reason",
        };
        res.json(response);
      }
    } else {
      const response = {
        status: "failed",
        id: "",
        message:
          "You do not have sufficient permissions to perform this action.",
      };
      res.json(response);
    }
  } catch (error) {
    const response = {
      status: "failed",
      id: "",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.get("/api/patients", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("view_patient")) {
      let formData = req.body;
      const patients = await getPatients(req.query.search);
      patients.forEach((patient) => {
        let imageurl = patient["profile_img"];
        let base64img = imageToBase64("./" + imageurl);
        patient["profile_img"] = "data:image/png;base64," + base64img;
      });
      res.json(patients);
    } else {
      const response = {
        status: "failed",
        id: "",
        message:
          "You do not have sufficient permissions to perform this action.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.get("/api/get_patients_by_id", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("view_patient")) {
      let id = req.query.id;
      const patient = await getUserbyID(id, "patient");
      let imageurl = patient["profile_img"];
      let base64img = imageToBase64("./" + imageurl);
      patient["profile_img"] = "data:image/png;base64," + base64img;
      res.json(patient);
    } else if (decode.User.permissions.includes("view_self")) {
      const user_id = decode.User.user_id;
      const patient = await getUserbyID(user_id, "patient");
      let imageurl = patient["profile_img"];
      let base64img = imageToBase64("./" + imageurl);
      patient["profile_img"] = "data:image/png;base64," + base64img;
      res.json(patient);
    } else {
      const response = {
        status: "failed",
        id: "",
        message:
          "You do not have sufficient permissions to perform this action.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.get("/api/get_visits_by_patient_ID", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (
      decode.User.permissions.includes("edit_visit") ||
      decode.User.permissions.includes("view_visit")
    ) {
      const visits = await getVisitsByPatientID(req.query.patient_id);
      res.json(visits);
    } else if (decode.User.permissions.includes("view_self")) {
      const user_id = decode.User.user_id;
      const visits = await getVisitsByPatientID(user_id);
      res.json(visits);
    } else {
      const response = {
        status: "failed",
        id: "",
        message:
          "You do not have sufficient permissions to perform this action.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.post("/api/create_visit", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("edit_visit")) {
      const visit_data = req.body;
      const [status, id, message] = await createVisit(
        visit_data.patient_id,
        visit_data.check_in
      );
      res.json({
        status: status,
        id: id,
        message: message,
      });
    } else {
      const response = {
        status: "failed",
        id: "",
        message:
          "You do not have sufficient permissions to perform this action.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

//forms
//doctor_initial_assessment
app.post("/api/update_doctor_initial_assessment", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("edit_doctor_form")) {
      const formData = req.body;
      const [status, id, message] = await handleDoctorInitialAssessment(
        formData
      );
      res.json({
        status: status,
        id: id,
        message: message,
      });
    } else {
      const response = {
        status: "failed",
        id: "",
        message:
          "You do not have sufficient permissions to perform this action.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.get("/api/get_doctor_initial_assessment", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (
      decode.User.permissions.includes("edit_doctor_form") ||
      decode.User.permissions.includes("view_patient")
    ) {
      const [status, formData, patientExists] =
        await getDoctorInitialAssessment(req.query.user_id, req.query.visit_id);
      res.json({
        status: status,
        formData: formData,
        patientExists: patientExists,
      });
    } else if (decode.User.permissions.includes("view_self")) {
      const user_id = decode.User.user_id;
      const [status, formData, patientExists] =
        await getDoctorInitialAssessment(user_id, req.query.visit_id);
      res.json({
        status: status,
        formData: formData,
        patientExists: patientExists,
      });
    } else {
      const response = {
        status: "failed",
        message: "You do not have sufficient permissions to view this.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

//medication_records
app.post("/api/add_medication_records", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("edit_doctor_form")) {
      const payload = req.body;
      const [status, message] = await addMedicationRecords(payload);
      const response = {
        status: status,
        message: message,
      };
      res.json(response);
    } else {
      const response = {
        status: "failed",
        message: "You do not have sufficient permissions to view this.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.get("/api/get_medication_records", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("view_doctor_form")) {
      const [status, records, patientExists] = await getMedicationRecords(
        req.query.user_id,
        req.query.visit_id
      );
      res.json({
        status: status,
        records: records,
        patientExists: patientExists,
      });
    } else if (decode.User.permissions.includes("view_self")) {
      const user_id = decode.User.user_id;
      const [status, records, patientExists] = await getMedicationRecords(
        user_id,
        req.query.visit_id
      );
      res.json({
        status: status,
        records: records,
        patientExists: patientExists,
      });
    } else {
      const response = {
        status: "failed",
        message: "You do not have sufficient permissions to view this.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

//treatment_procedure
app.post("/api/add_treatment_procedure_order_records", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("edit_doctor_form")) {
      const payload = req.body;
      const [status, message] = await addTreatmentProcedureRecords(payload);
      const response = {
        status: status,
        message: message,
      };
      res.json(response);
    } else {
      const response = {
        status: "failed",
        message: "You do not have sufficient permissions to view this.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.get("/api/get_treatment_procedure_order_records", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("view_doctor_form")) {
      const [status, records, patientExists] =
        await getTreatmentProcedureRecords(
          req.query.user_id,
          req.query.visit_id
        );
      res.json({
        status: status,
        records: records,
        patientExists: patientExists,
      });
    } else if (decode.User.permissions.includes("view_self")) {
      const user_id = decode.User.user_id;
      const [status, records, patientExists] =
        await getTreatmentProcedureRecords(user_id, req.query.visit_id);
      res.json({
        status: status,
        records: records,
        patientExists: patientExists,
      });
    } else {
      const response = {
        status: "failed",
        message: "You do not have sufficient permissions to view this.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

//vital_charts
app.post("/api/add_vital_chart_records", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("edit_doctor_form")) {
      const payload = req.body;
      const [status, message] = await addVitalChartRecords(payload);
      const response = {
        status: status,
        message: message,
      };
      res.json(response);
    } else {
      const response = {
        status: "failed",
        message: "You do not have sufficient permissions to view this.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.get("/api/get_vital_chart_records", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("view_doctor_form")) {
      const [status, records, patientExists] = await getVitalChartRecords(
        req.query.user_id,
        req.query.visit_id
      );
      res.json({
        status: status,
        records: records,
        patientExists: patientExists,
      });
    } else if (decode.User.permissions.includes("view_self")) {
      const user_id = decode.User.user_id;
      const [status, records, patientExists] = await getVitalChartRecords(
        user_id,
        req.query.visit_id
      );
      res.json({
        status: status,
        records: records,
        patientExists: patientExists,
      });
    } else {
      const response = {
        status: "failed",
        message: "You do not have sufficient permissions to view this.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

//discharge_form
app.get("/api/get_discharge_form", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (
      decode.User.permissions.includes("edit_doctor_form") ||
      decode.User.permissions.includes("view_patient")
    ) {
      const [status, formData, patientExists] = await getDischargeForm(
        req.query.user_id,
        req.query.visit_id
      );
      res.json({
        status: status,
        formData: formData,
        patientExists: patientExists,
      });
    } else if (decode.User.permissions.includes("view_self")) {
      const user_id = decode.User.user_id;
      const [status, formData, patientExists] = await getDischargeForm(
        user_id,
        req.query.visit_id
      );
      res.json({
        status: status,
        formData: formData,
        patientExists: patientExists,
      });
    } else {
      const response = {
        status: "failed",
        message: "You do not have sufficient permissions to view this.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.post("/api/update_discharge_form", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("edit_doctor_form")) {
      const formData = req.body;
      const [status, id, message] = await handleDischargeForm(formData);
      res.json({
        status: status,
        id: id,
        message: message,
      });
    } else {
      const response = {
        status: "failed",
        id: "",
        message:
          "You do not have sufficient permissions to perform this action.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

//nurses forms
//nursing care plan
app.post("/api/add_nursing_care_plan_records", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("edit_nurse_form")) {
      const payload = req.body;
      const [status, message] = await addNursingCarePlanRecords(payload);
      const response = {
        status: status,
        message: message,
      };
      res.json(response);
    } else {
      const response = {
        status: "failed",
        message: "You do not have sufficient permissions to view this.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.get("/api/get_nursing_care_plan_records", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("view_nurse_form")) {
      const [status, records, patientExists] = await getNursingCarePlanRecords(
        req.query.user_id,
        req.query.visit_id
      );
      res.json({
        status: status,
        records: records,
        patientExists: patientExists,
      });
    } else if (decode.User.permissions.includes("view_self")) {
      const user_id = decode.User.user_id;
      const [status, records, patientExists] = await getVitalChartRecords(
        user_id,
        req.query.visit_id
      );
      res.json({
        status: status,
        records: records,
        patientExists: patientExists,
      });
    } else {
      const response = {
        status: "failed",
        message: "You do not have sufficient permissions to view this.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

//medication_admistration_records
app.post("/api/add_medication_admistration_records", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("edit_nurse_form")) {
      const payload = req.body;
      const [status, message] = await addMedicationAdministrationRecords(
        payload
      );
      const response = {
        status: status,
        message: message,
      };
      res.json(response);
    } else {
      const response = {
        status: "failed",
        message: "You do not have sufficient permissions to view this.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.get("/api/get_medication_admistration_records", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("view_nurse_form")) {
      const [status, records, patientExists] =
        await getMedicationAdministrationRecords(
          req.query.user_id,
          req.query.visit_id
        );
      res.json({
        status: status,
        records: records,
        patientExists: patientExists,
      });
    } else if (decode.User.permissions.includes("view_self")) {
      const user_id = decode.User.user_id;
      const [status, records, patientExists] = await getVitalChartRecords(
        user_id,
        req.query.visit_id
      );
      res.json({
        status: status,
        records: records,
        patientExists: patientExists,
      });
    } else {
      const response = {
        status: "failed",
        message: "You do not have sufficient permissions to view this.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

//Analytics
app.get("/api/worldmap/patient_country", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("view_patient")) {
      const patient_country = await getPatientCountries();
      res.json(patient_country);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

//Dashboard
app.get("/api/charts/visits", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("view_patient")) {
      const datasets = await getPatientVisitAnalyticsData();
      let data = {
        datasets: datasets,
      };
      res.json(data);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.get("/api/recentvisit", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("view_patient")) {
      const recentvisits = await getLatestVisits();
      res.json(recentvisits);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.get("/api/regular_patients", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("view_patient")) {
      const regular_patients = await getRegularPatients();
      res.json(regular_patients);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.get("/api/get_visit_by_ID", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);

    if (decode.User.permissions.includes("view_patient")) {
      const visit = await getVisitByID(req.query.visit_id);
      res.json(visit);
    } else if (decode.User.permissions.includes("view_self")) {
      const visit = await getVisitByID(req.query.visit_id);
      if (decode.User.user_id === visit.user_id) {
        res.json(visit);
      } else {
        const response = {
          status: "failed",
          message: "Access Denied",
        };
        res.json(response);
      }
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.post("/api/update_visit", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("edit_patient")) {
      const formData = req.body;
      const [status, id, message] = await updateVisit(formData);
      res.json({
        status: status,
        id: id,
        message: message,
      });
    } else {
      const response = {
        status: "failed",
        id: "",
        message:
          "You do not have sufficient permissions to perform this action.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.get("/api/staffdata", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("edit_staff")) {
      const staff = await getStaffData(req.query.search);
      res.json(staff);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

//Patient Edit
app.get("/api/fetchpatientdetail", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("edit_patient")) {
      let formData = await getUserbyID(req.query.user_id, "patient");
      formData["profile_img"] = imageToBase64(formData.profile_img).replace(
        /^data:image\/?[A-z]*;base64,/,
        ""
      );
      formData["signature_img"] = imageToBase64(formData.signature_img).replace(
        /^data:image\/?[A-z]*;base64,/,
        ""
      );
      res.json({
        status: "success",
        formData: formData,
      });
    } else {
      const response = {
        status: "failed",
        message: "You do not have sufficient permissions to view this.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.post("/api/update_patient", async (req, res) => {
  let jwt_token = req.cookies._auth;

  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("edit_patient")) {
      const formData = req.body;
      const [status, id, message] = await updateUser(formData, "patient");
      res.json({
        status: status,
        id: id,
        message: message,
      });
    } else {
      const response = {
        status: "failed",
        id: "",
        message:
          "You do not have sufficient permissions to perform this action.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

//Staff Edit
app.get("/api/fetchstaffdetail", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("edit_staff")) {
      let formData = await getUserbyID(req.query.user_id);
      formData["profile_img"] = imageToBase64(formData.profile_img).replace(
        /^data:image\/?[A-z]*;base64,/,
        ""
      );
      formData["signature_img"] = imageToBase64(formData.signature_img).replace(
        /^data:image\/?[A-z]*;base64,/,
        ""
      );
      res.json({
        status: "success",
        formData: formData,
      });
    } else {
      const response = {
        status: "failed",
        message: "You do not have sufficient permissions to view this.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});

app.post("/api/update_staff", async (req, res) => {
  let jwt_token = req.cookies._auth;
  try {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (decode.User.permissions.includes("edit_staff")) {
      const formData = req.body;
      const [status, id, message] = await updateUser(formData);
      res.json({
        status: status,
        id: id,
        message: message,
      });
    } else {
      const response = {
        status: "failed",
        id: "",
        message:
          "You do not have sufficient permissions to perform this action.",
      };
      res.json(response);
    }
  } catch (err) {
    console.log(err);
    const response = {
      status: "failed",
      message: "Authentication failed",
    };
    res.json(response);
  }
});
//Test APIS

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
