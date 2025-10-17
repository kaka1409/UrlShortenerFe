import * as yup from 'yup';

export const registerSchema = yup.object({
    // username:
    //   yup.string()
    //   .required('Username is required'),

    email:
      yup.string()
      .required()
      .email('Please enter a valid email'),

    password:
      yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])/,
        'Password must contain uppercase letters, numbers, and special characters'
      )
      .min(8, 'Password must be at least 8 characters'),

    confirmPassword:
      yup.string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),

  });
