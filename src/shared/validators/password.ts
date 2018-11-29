import { RegistrationFormData } from '../../components/App/AppNavigator/AuthNavigator/RegistrationScreen';

const regExpPassword = new RegExp([
  '^(?=.*[0-9])',
  '^(?=.*[a-z])',
  '^(?=.*[A-Z])',
  '(?=.*[~!@#$%^&*()=+{}|:;,.<>?_-])',
  `(?=.{8,})`,
].join(''));

export const passwordLogin = (value: string): string | undefined => (
  value && !regExpPassword.test(value)
    ? 'Please enter a correct password'
    : undefined
);

export const passwordRegistration = (value: string): string | undefined => (
  value && !regExpPassword.test(value) ?
    `Password must contain at least 8 characters, including upper and lower case letters, numeric and special characters`
    : undefined
);

export const confirmPassword = (value: string, allValues: RegistrationFormData): string | undefined => (
  value && allValues.password && value !== allValues.password
    ? 'Please enter a correct password'
    : undefined
);