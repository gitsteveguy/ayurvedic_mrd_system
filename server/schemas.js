import Joi from "joi";
import fs from "fs";

let country_codes = JSON.parse(
  fs.readFileSync("./Jsons/countries.json", "utf8")
);
let countries = Object.keys(country_codes);

const dateOfBirthLessThanCurrent = Joi.extend((joi) => ({
  type: "dateOfBirth",
  base: joi.date(),
  messages: {
    "dateOfBirth.less": "Date of birth must be less than or equal to today",
  },
  validate(value, helpers) {
    if (value > new Date()) {
      return { value, errors: helpers.error("dateOfBirth.less") };
    }
    return value;
  },
}));

export const patientSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().min(1).max(50).required(),
  last_name: Joi.string().min(1).max(50).required().messages({
    "any.required": "Last Name is required",
    "string.empty": "Last Name is required",
  }),
  date_of_birth: dateOfBirthLessThanCurrent.dateOfBirth().required(),
  phone_no: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  profile_img: Joi.string().required(),
  gender: Joi.string().required().messages({
    "any.required": "Gender is required",
    "string.empty": "Gender is required",
  }),
  address_line_1: Joi.string().max(100).required(),
  address_line_2: Joi.string().max(100).optional().allow(""),
  state: Joi.string().max(100).required(),
  country: Joi.string()
    .valid(...countries)
    .required()
    .messages({
      "any.required": "Country is required",
      "string.empty": "Country is required",
    }),
  pincode: Joi.string()
    .pattern(/^[0-9]{5,10}$/)
    .required(),
  signature: Joi.string().required(),
  occupation: Joi.string().max(50).optional().allow(""),
  blood_group: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required()
    .messages({
      "any.required": "Blood Group is required",
      "string.empty": "Blood Group is required",
    }),
});

export const userSchema = Joi.object({
  // user_id: Joi.number().required(),
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().min(1).max(50).required(),
  last_name: Joi.string().min(1).max(50).required().messages({
    "any.required": "Last Name is required",
    "string.empty": "Last Name is required",
  }),
  date_of_birth: dateOfBirthLessThanCurrent.dateOfBirth().required(),
  role: Joi.string().min(1).max(50).required(),
  phone_no: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  profile_img: Joi.string().required(),
  gender: Joi.string().required().messages({
    "any.required": "Gender is required",
    "string.empty": "Gender is required",
  }),
  address_line_1: Joi.string().max(100).required(),
  address_line_2: Joi.string().max(100).optional().allow(""),
  state: Joi.string().max(100).required(),
  country: Joi.string()
    .valid(...countries)
    .required()
    .messages({
      "any.required": "Country is required",
      "string.empty": "Country is required",
    }),
  pincode: Joi.string()
    .pattern(/^[0-9]{5,10}$/)
    .required(),
  signature: Joi.string().required(),
  occupation: Joi.string().max(50).optional().allow(""),
  blood_group: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required()
    .messages({
      "any.required": "Blood Group is required",
      "string.empty": "Blood Group is required",
    }),
});

export const userUpdateSchema = Joi.object({
  user_id: Joi.number().required(),
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6),
  first_name: Joi.string().min(1).max(50).required(),
  last_name: Joi.string().min(1).max(50).required().messages({
    "any.required": "Last Name is required",
    "string.empty": "Last Name is required",
  }),
  date_of_birth: dateOfBirthLessThanCurrent.dateOfBirth().required(),
  phone_no: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  profile_img: Joi.string().required(),
  gender: Joi.string().required().messages({
    "any.required": "Gender is required",
    "string.empty": "Gender is required",
  }),
  address_line_1: Joi.string().max(100).required(),
  address_line_2: Joi.string().max(100).optional().allow(""),
  state: Joi.string().max(100).required(),
  country: Joi.string()
    .valid(...countries)
    .required()
    .messages({
      "any.required": "Country is required",
      "string.empty": "Country is required",
    }),
  pincode: Joi.string()
    .pattern(/^[0-9]{5,10}$/)
    .required(),
  signature_img: Joi.string().required(),
  occupation: Joi.string().max(50).optional().allow(""),
  blood_group: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required()
    .messages({
      "any.required": "Blood Group is required",
      "string.empty": "Blood Group is required",
    }),
});
export const patientUpdateSchema = Joi.object({
  user_id: Joi.number().required(),
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6),
  first_name: Joi.string().min(1).max(50).required(),
  last_name: Joi.string().min(1).max(50).required().messages({
    "any.required": "Last Name is required",
    "string.empty": "Last Name is required",
  }),
  date_of_birth: dateOfBirthLessThanCurrent.dateOfBirth().required(),
  phone_no: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  profile_img: Joi.string().required(),
  gender: Joi.string().required().messages({
    "any.required": "Gender is required",
    "string.empty": "Gender is required",
  }),
  address_line_1: Joi.string().max(100).required(),
  address_line_2: Joi.string().max(100).optional().allow(""),
  state: Joi.string().max(100).required(),
  country: Joi.string()
    .valid(...countries)
    .required()
    .messages({
      "any.required": "Country is required",
      "string.empty": "Country is required",
    }),
  pincode: Joi.string()
    .pattern(/^[0-9]{5,10}$/)
    .required(),
  signature_img: Joi.string().required(),
  occupation: Joi.string().max(50).optional().allow(""),
  blood_group: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required()
    .messages({
      "any.required": "Blood Group is required",
      "string.empty": "Blood Group is required",
    }),
});
