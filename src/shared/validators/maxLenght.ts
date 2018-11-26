export const maxLengthFullName = (value: string ): string | undefined => {
  return value && value.length > 50 ? `Full name must contain maximum 50 characters` : undefined;
};