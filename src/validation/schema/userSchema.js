import * as yup from 'yup';

//Object for PIN reset and generation
export const pinSchema = yup.object().shape({
  full_name: yup
    .string()
    .trim()
    .min(3, 'Name should have more than three characters')
    .required('Name is mandatory'),

  login_id: yup
    .number()
    .required('CID/Liscence number is mandatory')
    .typeError('Invalid CID'),

  mobile_no: yup
    .string()
    .trim()
    .required('Phone number is mandatory')
    .length(8, 'Phone should have eight digits')
    .matches(/^\d{8}$/, 'Phone should have eight digits'),

  request_type: yup.string().default('signup'),
});

//Object for PIN reset and generation
export const pinResetSchema = yup.object().shape({
  login_id: yup
    .number()
    .required('CID/Liscence number is mandatory')
    .typeError('Invalid CID'),

  mobile_no: yup
    .string()
    .trim()
    .required('Phone number is mandatory')
    .length(8, 'Phone should have eight digits')
    .matches(/^\d{8}$/, 'Phone should have eight digits'),
});

//User registration
export const userRegistrationSchema = yup.object().shape({
  full_name: yup
    .string()
    .trim()
    .min(3, 'Full Name should have more than three characters')
    .required('Name is mandatory'),

  login_id: yup
    .string()
    .trim()
    .required('CID/Liscence number is mandatory'),

  mobile_no: yup
    .string()
    .trim()
    .required('Mobile number is mandatory')
    .length(8, 'Mobile number should have eight digits')
    .matches(/^\d{8}$/, 'Mobile number should have eight digits'),

  email: yup.string().email('Invalid Email Format'),

  pin: yup
    .string()
    .trim()
    .required('PIN is Mandatory')
    .length(4, 'PIN should have four digits')
    .matches(/^\d{4}$/, 'PIN should have four digits'),
});

export const loginSchema = yup.object().shape({
  login_id: yup
    .string()
    .trim()
    .required('CID/Liscence number is mandatory'),

  pin: yup
    .string()
    .trim()
    .required('PIN is mandatory')
    .length(4, 'PIN should have four digits')
    .matches(/^\d{4}$/, 'PIN should have four digits'),
});

export const userProfileSchema = yup.object().shape({
  approval_status: yup
    .string()
    .required()
    .trim()
    .oneOf(['Pending']),
  user: yup.string().required(),
  request_type: yup.string().oneOf(['Registration']),
  request_category: yup.string().oneOf(['CID Details']),
  new_cid: yup.string().required(),
  new_date_of_issue: yup.date().required(),
  new_date_of_expiry: yup.date().required(),
});

export const pin_schema = yup
  .string()
  .trim()
  .required('PIN is mandatory')
  .length(4, 'PIN should have four digits')
  .matches(/^\d{4}$/, 'PIN should have four digits');

export const phone_schema = yup
  .string()
  .trim()
  .required('Phone number is mandatory')
  .length(8, 'Phone should have eight digits')
  .matches(/^\d{8}$/, 'Phone should have eight digits');

export const email_schema = yup
  .string()
  .required('Email is mandatory')
  .email('Invalid Email Format');
