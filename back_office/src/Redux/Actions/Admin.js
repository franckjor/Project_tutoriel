import {SET_ADMIN_PAGE_FIELDS, SET_ALL_DOCTOR_APPOINTMENTS, SET_ALL_USERS, SUBMIT_ADMIN_CONNECT_FORM, SUBMIT_NEW_ADMIN_APPOINTMENT, GET_ALL_DOCTOR_APPOINTMENTS} from "../Types/Admin";

export const setAdminPageFields = (field, value) => ({
    type: SET_ADMIN_PAGE_FIELDS,
    field,
    value,
  });
  
  export const submitAdminConnectForm = () => ({
    type: SUBMIT_ADMIN_CONNECT_FORM,
  });
  
  export const getAllDoctorAppointments = () => ({
    type: GET_ALL_DOCTOR_APPOINTMENTS,
  });
  
  export const setAllDoctorAppointments = (appointments) => ({
    type: SET_ALL_DOCTOR_APPOINTMENTS,
    appointments,
  });
  
  export const setAllUsers = (users) => ({
    type: SET_ALL_USERS,
    users,
  });
  
  export const submitNewAdminAppointment = () => ({
    type: SUBMIT_NEW_ADMIN_APPOINTMENT,
  });
  