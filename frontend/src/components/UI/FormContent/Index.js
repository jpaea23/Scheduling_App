export const timeFormat = (time) => {
  let result =  `12:00 AM`;
  if (time > 0) {
    const timeOfDay = (time < 12 ) ? 'AM' : 'PM';
    const timeNow = (time > 12 ) ? time - 12 : time;
    result = `${timeNow}:00 ${timeOfDay}`;
  }
  return result;
};

export const availableTimesArr = (arr, timeNow) => {
  //return given array if params not satisfied.
  if (arr.length === 0 || typeof timeNow !== 'string') {
    return 0;
  }
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'object' || arr[i] === 11 ||
        arr[i] === 17) {
      if ((Object.keys(arr[i]) + '') === timeNow) {
        arr[i] = parseInt(timeNow);
      } else {
        arr.splice(i, 1);
      }
    }
  }
  return arr;
};

export const capitlize = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};
