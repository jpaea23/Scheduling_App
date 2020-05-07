import * as TimeConst from '../../config/TimeSlotConst';

export const calcAvailTimeSlot = (jobs, dateSelected) => {
  const timeslot = [];
  const duration = TimeConst.DEFAULT_DURATION;
  let start = 7;

  while (start < 18) {
    if (start in jobs[dateSelected]) {
      const jobTime = start+'';
      timeslot.push({[jobTime]: jobs[dateSelected][jobTime]});
      start += duration;
      continue;
    }
    timeslot.push(start);
    start++;
  }
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
