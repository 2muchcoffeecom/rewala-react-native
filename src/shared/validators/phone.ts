export const phone = (value: string): string | undefined => (
  value && !/^[0-9]{4,13}$/.test(value)
    ? 'Phone must contain minimum 5 characters'
    : undefined
);