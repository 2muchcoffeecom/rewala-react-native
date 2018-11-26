export const minLengthFullName = (value: string ): string | undefined => {
  return value && value.length < 5 ? `Full name must contain minimum 5 characters` : undefined;
};