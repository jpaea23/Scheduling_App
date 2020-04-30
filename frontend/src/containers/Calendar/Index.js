import * as TimeConst from '../../config/TimeSlotConst';

export const calcAvailTimeSlot = (jobs, dateSelected) => {
  const timeslot = [...Array(17+1).keys()].slice(7);
  for (const job in jobs[dateSelected]) {
    const duration = TimeConst.DEFAULT_DURATION;
    const index = timeslot.indexOf(parseInt(job));
    // replace element at index i with job Object
    timeslot[index] = {[job]: jobs[dateSelected][job]};
    if (duration > 1) {
      timeslot.splice(index + 1, duration - 1);
    }
  };
  return timeslot;
};

export const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
