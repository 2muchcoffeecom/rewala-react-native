import { FormErrors } from 'redux-form';
import { RegistrationFormData } from '../../components/App/AppNavigator/AuthNavigator/RegistrationScreen';

export const validate = (values: RegistrationFormData) => {
  const error: FormErrors<RegistrationFormData> = {};

  if (values.password !== values.passwordConfirm) {
    error.passwordConfirm = 'Passwords do not match';
  }

  return error;
};
