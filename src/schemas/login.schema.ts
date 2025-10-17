import * as yup from 'yup';

export const loginSchema = yup.object({
  email:
    yup.string()
    .required()
    .email('Please enter a valid email'),

  password:
    yup.string()
    .required('Password is required')
    // .min(8, 'Password must be at least 8 characters'),
});
