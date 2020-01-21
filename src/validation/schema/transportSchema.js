import * as yup from 'yup';

/**
 * schema validation for vehicle
 */
export const transportSchema = yup.object().shape({
  approval_status: yup
    .string()
    .required()
    .oneOf(['Pending']),
  user: yup
    .string()
    .trim()
    .required('User is mandatory'),
  vehicle_no: yup
    .string()
    .trim()
    .required('Vehilce No is mandatory'),
  drivers_name: yup
    .string()
    .trim()
    .required('Driver Name is mandatory'),
  contact_no: yup
    .number()
    .positive('Invalid Owner CID')
    .required('Contact No is mandatory')
    .typeError('Invalid Owner CID'),
  owner_cid: yup
    .number()
    .positive('Invalid Owner CID')
    .required('Driver CID is mandatory')
    .typeError('Invalid Owner CID'),
  common_pool: yup
    .number()
    .integer()
    .positive(),
});

export const driverInfoSchema = yup.object().shape({
  approval_status: yup
    .string()
    .required()
    .oneOf(['Pending']),
  user: yup
    .string()
    .trim()
    .required('User is mandatory'),
  vehicle: yup
    .string()
    .trim()
    .required('User is mandatory'),
  driver_name: yup
    .string()
    .trim()
    .required('Driver Name is mandatory'),
  driver_mobile_no: yup
    .number()
    .required('Driver Contact No is mandatory')
    .typeError('Invalid Driver Mobile'),
  remarks: yup
    .string()
    .trim()
    .nullable(),
});
