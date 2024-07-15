import { SET_ADDDOCTOR_FIELDS, ADD_NEW_DOCTOR } from "../Types/doctor";

export const setAddDoctorFields = (field, value) => ({
  type: SET_ADDDOCTOR_FIELDS,
  field,
  value,
});

export const addNewDoctor = () => ({
  type: ADD_NEW_DOCTOR,
});
