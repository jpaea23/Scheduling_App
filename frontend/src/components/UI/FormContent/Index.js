export const timeFormat = (time) => {
  const timeOfDay = (time < 12 ) ? 'AM' : 'PM';
  const timeNow = (time > 12 ) ? time - 12 : time;
  time = `${timeNow}:00 ${timeOfDay}`;
  return time;
};

export const availableTimesArr = (arr, timeNow) => {
  if (arr.length === 0 ) {
    return arr;
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
