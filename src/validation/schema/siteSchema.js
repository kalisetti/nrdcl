import * as yup from 'yup';

export const siteSchema = yup.object().shape({
  user: yup
    .string()
    .trim()
    .required('User is mandatory'),

  items: yup.array().required('Expected materials is mandatory'),
  remarks: yup
    .string()
    .trim()
    .nullable(),
  location: yup
    .string()
    .trim()
    .typeError('Location is mandatory')
    .required('Location is mandatory'),
  // plot_no: yup
  //   .string('Plot No is mandatory')
  //   .trim()
  //   .typeError('Plot No is mandatory')
  //   .required('Plot No is mandatory'),
  dzongkhag: yup
    .string()
    .trim()
    .required('Dzongkhag is mandatory'),
  construction_end_date: yup
    .date()
    .typeError('End Date is mandatory')
    .required('End Date is mandatory'),
  construction_start_date: yup
    .date()
    .typeError('Start Date is mandatory')
    .required('Start Date is mandatory'),
  approval_no: yup
    .string()
    .trim()
    .required('Construction Approval No is mandatory'),
  construction_type: yup
    .string()
    .trim()
    .required('Construction Type is mandatory'),
});

//Object for Site Item
export const siteItemSchema = yup.object().shape({
  item_sub_group: yup
    .string()
    .trim()
    .required('Item is mandatory'),
  uom: yup
    .string()
    .trim()
    .required('Unit of Measure is mandatory'),
  expected_quantity: yup
    .number('Expected Quantity should be number')
    .positive('Expected Quantity should be greater than 0'),
  remarks: yup.string().nullable(),
});

/**
 * Object to change site status
 */
export const siteStatusSchema = yup.object().shape({
  approval_status: yup
    .string()
    .required()
    .oneOf(['Pending']),
  user: yup.string().required('User is mandatory'),
  site: yup.string().required('Site is mandatory'),
  remarks: yup.string().nullable(),
  change_status: yup
    .string()
    .required()
    .oneOf(['Activate', 'Deactivate']),
});

/**
 * schema validation for site extension date
 */
export const siteExtensionSchema = yup.object().shape({
  approval_status: yup
    .string()
    .required()
    .oneOf(['Pending']),
  user: yup
    .string()
    .trim()
    .required('User is mandatory'),
  site: yup
    .string()
    .trim()
    .required('Site is mandatory'),
  construction_start_date: yup
    .date('Invalid Start Date')
    .required('Start Date is mandatory'),
  construction_end_date: yup
    .date('Invalid End Date')
    .required('End Date is mandatory'),
  extension_till_date: yup
    .date('Invalid Till Date')
    .required('Till Date is mandatory'),
});

export const qtyExtensionSchema = yup.object().shape({
  approval_status: yup
    .string()
    .required()
    .oneOf(['Pending']),
  user: yup
    .string()
    .trim()
    .required('User is mandatory'),
  site: yup
    .string()
    .trim()
    .required('Site is mandatory'),
  items: yup.array().required('Items is mandatory'),
});

/**
 * schema validation for qty extension for site
 */
export const qtyItemExtensionSchema = yup.object().shape({
  site_item_name: yup.string().required('Name is mandatory'),
  additional_quantity: yup
    .number('Additional Qty is mandatory')
    .moreThan(0, 'Additional Qty should be more than 0'),
  remarks: yup.string().nullable(),
});

/**
 * schema validation for vehicle
 */
export const vehilceSchema = yup.object().shape({
  approval_status: yup
    .string()
    .required()
    .oneOf(['Pending']),
  user: yup
    .string()
    .trim()
    .required('User is mandatory'),
  contact_no: yup
    .string()
    .trim()
    .required('Driver Mobile No is mandatory'),
  drivers_name: yup
    .string()
    .trim()
    .required('Driver Name is mandatory'),
  vehicle_capacity: yup
    .string()
    .trim()
    .required('Vehicle Capacity is mandatory'),
  owner: yup
    .string()
    .trim()
    .required('Vehicle Owner is mandatory'),
  vehicle_no: yup
    .string()
    .trim()
    .required('Vehilce No is mandatory'),
  self_arranged: yup
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
    .string()
    .trim()
    .required('Driver Mobile No is mandatory'),
  remarks: yup
    .string()
    .trim()
    .nullable(),
});

export const driverInfoSchemaSelf = yup.object().shape({
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
    .string()
    .trim()
    .required('Driver Mobile No is mandatory'),
  remarks: yup
    .string()
    .trim()
    .nullable(),
});

export const orderSchema = yup.object().shape({
  user: yup
    .string()
    .trim()
    .required('User is mandatory'),

  items: yup.array().required('Expected materials are mandatory'),

  remarks: yup
    .string()
    .trim()
    .nullable(),
  location: yup
    .string()
    .trim()
    .typeError('Location is mandatory')
    .required('Location is mandatory'),
  plot_no: yup
    .string('Plot No is mandatory')
    .trim()
    .typeError('Plot No is mandatory')
    .required('Plot No is mandatory'),
  dzongkhag: yup
    .string()
    .trim()
    .required('Dzongkhag is mandatory'),
  construction_end_date: yup
    .date()
    .typeError('End Date is mandatory')
    .required('End Date is mandatory'),
  construction_start_date: yup
    .date()
    .typeError('Start Date is mandatory')
    .required('Start Date is mandatory'),
  number_of_floors: yup
    .string()
    .trim()
    .required('Number of Floor is mandatory'),
  approval_no: yup
    .string()
    .trim()
    .required('Approval No is mandatory'),
  construction_type: yup
    .string()
    .trim()
    .required('Construction Type is mandatory'),
  purpose: yup
    .string()
    .trim()
    .required('Purpose is mandatory'),
});
