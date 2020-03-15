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
  contact_no: yup
    .number()
    .positive('Invalid Driver Mobile No')
    .required('Driver Mobile No is mandatory')
    .typeError('Invalid Driver Mobile No'),
  drivers_name: yup
    .string()
    .trim()
    .required('Driver Name is mandatory'),
  vehicle_capacity: yup
    .string()
    .trim()
    .required('Vehilce Capacity is mandatory'),
  vehicle_no: yup
    .string()
    .trim()
    .required('Vehilce No is mandatory'),
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
    .required('Driver Mobile No is mandatory')
    .typeError('Invalid Driver Mobile'),
  remarks: yup
    .string()
    .trim()
    .nullable(),
});
