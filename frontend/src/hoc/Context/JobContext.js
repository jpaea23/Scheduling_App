import {createContext} from 'react';

export const JobContext = createContext({
  job: [],
  timeslot: {},
  clientList: [],
  dayTimeSlot: [],
  date: '',
  formName: '',
});
