import * as yup from 'yup';

export const siteSchema = yup.object().shape({
  user: yup
    .string()
    .trim()
    .required('User is mandatory'),
  site_type: yup
    .string()
    .trim()
    .required('Site Type is mandatory'),
  purpose: yup
    .string()
    .trim()
    .required('Purpose is mandatory'),
  construction_type: yup
    .string()
    .trim()
    .required('Construction Type is mandatory'),
  construction_start_date: yup.date().required('Start Date is mandatory'),
  construction_end_date: yup.date().required('End Date is mandatory'),
  number_of_floors: yup
    .number('Number of Floors should be number')
    .required('Number of Floors is mandatory')
    .integer('Number of Floors should be integer')
    .positive('Number of Floors should positive integer'),
  approval_no: yup
    .string()
    .trim()
    .required('Approval No is mandatory'),
  dzongkhag: yup
    .string()
    .trim()
    .required('Dzongkhag is mandatory'),
  gewog: yup
    .string()
    .trim()
    .required('Gewog is mandatory'),
  plot_no: yup
    .string('Plot No is mandatory')
    .trim()
    .required('Plot No is mandatory'),
  location: yup
    .string()
    .trim()
    .required('Location is mandatory'),
  remarks: yup
    .string()
    .trim()
    .nullable(),
  items: yup.array().required(),
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

  branch: yup
    .string()
    .trim()
    .required('Item Source is mandatory'),

  expected_quantity: yup
    .number('Expected Quantity should be number')
    .positive('Expected Quantity should be grater than 0'),

  transport_mode: yup
    .mixed()
    .required('Transport Mode is mandatory')
    .oneOf(['Common Pool', 'Self Owned Transport']),

  remarks: yup.string().nullable(),
});

//Object to change site status
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

export const qtyItemExtensionSchema = yup.object().shape({
  site_item_name: yup.string().required('Name is mandatory'),
  site_sub_group: yup.string().required('Item is mandatory'),
  additional_quantity: yup
    .number('Additional Qty is mandatory')
    .moreThan(0, 'Additional Qty should be more than 0'),
  remarks: yup.string().nullable(),
});
