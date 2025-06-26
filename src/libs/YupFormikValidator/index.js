import * as Yup from "yup";

const phoneNumberOrEmailValidate = Yup.mixed()
  .required("This field is required")
  .test(
    "is-phone-or-email",
    "Must be a valid phone number or email",
    function (value) {
      if (!value) return false; // Value is required 
      const isPhoneNumber = /^\d{10}$/.test(value);   
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      return isPhoneNumber || isEmail;
    }
  );
  

const passwordValidate = Yup.string()
  .required("This field is required")
  .min(4, "atleast 4 character")
  .max(8, "atmost 8 character");

const confirm_passwordValidation = Yup.string()
  .required("This field is required")
  .oneOf([Yup.ref("password"), null], "password must match")
  .min(4, "atleast 4 character")
  .max(8, "atmost 8 character");

const nameValidate = Yup.string()
  .required("required")
  .min(3, "atleast 3 character")
  .max(15, "atmost 15 character");

const otpValidate = Yup.string().required("required");

const status=Yup.string().required("status field is required")



const LoginForm = {
  initialVaues: {
    phoneNumberOrEmail: "",
    password: "",
  },

  validationSchema: Yup.object({
    phoneNumberOrEmail: phoneNumberOrEmailValidate,
    password: passwordValidate,
  }),
};

const signUpForm = {
  initialVaues: {
    name: "",
    phoneNumberOrEmail: "",
    password: "",
    confirm_password: "",
    otp: "",
    // otpID:"",
  },

  validationSchema: Yup.object({
    name: nameValidate,
    phoneNumberOrEmail: phoneNumberOrEmailValidate,
    password: passwordValidate,
    confirm_password: confirm_passwordValidation,
    otp: otpValidate,
    // otpID:otpIDValidate
  }),
};

//  send otp form +++++++++++++++++
const otpForm = {
  initialVaues: {
    phoneNumberOrEmail: "",
  },

  validationSchema: Yup.object({
    phoneNumberOrEmail: phoneNumberOrEmailValidate,
  }),
};

// change password form +++++++++++++++++
const changePassword={
  initialVaues:{
    phoneNumberOrEmail:"",
    password:"",
    confirm_password: "",   
    otp:""
  },

  validationSchema: Yup.object({
    phoneNumberOrEmail: phoneNumberOrEmailValidate,
    password: passwordValidate,
    confirm_password: confirm_passwordValidation,
    otp: otpValidate,
  }),
}

// //// for leads validation start from here /////

// +++++++++ create lead form +++++++++++++++++
const createLeadForm={
  initialVaues:{
    name: "",
    email: "",
    status: "",
    phoneNumber: "",
  },

  validationSchema: Yup.object({
    name: nameValidate,
    email: phoneNumberOrEmailValidate, /// we can also same for email or phonenumber because both mention same name,
    status: status,
    phoneNumber: phoneNumberOrEmailValidate,
  }),
}




export { LoginForm, signUpForm, otpForm,changePassword, createLeadForm };
