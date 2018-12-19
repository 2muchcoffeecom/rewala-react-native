export const maxLengthFullName = (value: string ): string | undefined => {
  return value && value.length > 50 ? `Full name must contain maximum 50 characters` : undefined;
};

export const minLengthFullName = (value: string ): string | undefined => {
  return value && value.length < 2 ? `Full name must contain minimum 2 characters` : undefined;
};

export const maxLengthPhone = (value: string ): string | undefined => {
  return value && value.length > 13 ? `The entered phone number is too long` : undefined;
};

export const minLengthPhone = (value: string ): string | undefined => {
  return value && value.length < 4 ? `The entered phone number is too short` : undefined;
};