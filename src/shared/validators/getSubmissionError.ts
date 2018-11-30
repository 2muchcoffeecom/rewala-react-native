import { RequestError, FieldsError } from '../../redux/request/states';

export const getSubmissionError = (error: RequestError, field: keyof FieldsError): string | undefined => {
  return error.fields && error.fields[field] ?
    error.fields[field][Object.keys(error.fields[field])[0]] : undefined;
};