import { RegistrationFormData } from '../../components/App/AppNavigator/AuthNavigator/RegistrationScreen';
import { ChangePasswordFormData } from '../components/ChangePasswordModal';

const regExpPassword = new RegExp([
  '^(?=.*[0-9])',
  '^(?=.*[a-z])',
  '^(?=.*[A-Z])',
  `(?=.{8,})`,
].join(''));

export const passwordLogin = (value: string): string | undefined => (
  value && !regExpPassword.test(value)
    ? 'Please enter a correct password'
    : undefined
);

export const passwordRegistration = (value: string): string | undefined => (
  value && !regExpPassword.test(value) ?
    `Password must contain at least 8 characters, including upper and lower case letters and numeric`
    : undefined
);

export const confirmPassword = (value: string, allValues: RegistrationFormData): string | undefined => (
  value && allValues.password && value !== allValues.password
    ? 'Passwords do not match'
    : undefined
);

export const confirmPasswordModal = (value: string, allValues: ChangePasswordFormData): string | undefined => (
  value && allValues.newPassword && value !== allValues.newPassword
    ? 'Passwords do not match'
    : undefined
);