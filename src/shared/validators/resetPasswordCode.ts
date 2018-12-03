export const resetPasswordCode = (value: string): string | undefined => (
  value && !/[a-zA-Z0-9]{8,}/i.test(value)
    ? 'Please enter a correct verification code'
    : undefined
);
