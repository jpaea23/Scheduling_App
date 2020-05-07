import {calcAvailTimeSlot} from './Index';

const selectDateEmpty = '2020-05-03';
const selectDateFill = '2020-04-28';
const jobObjEmpty = {
  '2020-05-03': {},
  '2020-05-04': {},
  '2020-05-05': {},
  '2020-05-06': {},
  '2020-05-07': {},
  '2020-05-08': {},
  '2020-05-09': {},
};

const jobObjFound = {
  '2020-04-26': {},
  '2020-04-27': {},
  '2020-04-28': {
    '7': {
      'jobId': 4,
      'clientId': 1,
    },
    '9': {
      'jobId': 4,
      'clientId': 1,
    },
    '14': {
      'jobId': 7,
      'clientId': 1,
    },
    '16': {
      'jobId': 7,
      'clientId': 1,
    },
  },
  '2020-04-29': {},
  '2020-04-30': {},
  '2020-05-01': {},
  '2020-05-02': {},
};


test('GenerateTimeslotArr', () => {
  const arr = calcAvailTimeSlot(jobObjFound, selectDateFill);

  // return match array
  expect(arr).toEqual([
    {'7': {'jobId': 4, 'clientId': 1}},
    {'9': {'jobId': 4, 'clientId': 1}},
    11, 12, 13,
    {'14': {'jobId': 7, 'clientId': 1}},
    {'16': {'jobId': 7, 'clientId': 1}},
  ]);

  expect(arr).toEqual(expect.arrayContaining([11, 12, 13]));
  expect(arr).toEqual(expect.not.arrayContaining([7, 8, 14, 15, 16, 15]));
  expect(arr).toEqual(expect.not.arrayContaining([6, 18]));
});

test('EmptyTimeslotArr', () => {
  const arr = calcAvailTimeSlot(jobObjEmpty, selectDateEmpty);

  // check timeslots
  // standard expected day timeslot
  expect(arr).toEqual([7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
  expect(arr).toEqual(expect.not.arrayContaining([6, 18]));
});
