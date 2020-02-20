import * as yup from 'yup';

export const paymentOTPSchema = yup.object().shape({
  customer_order: yup.string().required('Customer Order is mandatory'),
  otp: yup
    .number()
    .required('OTP is mandatory')
    .typeError('OTP is invalid'),
});
