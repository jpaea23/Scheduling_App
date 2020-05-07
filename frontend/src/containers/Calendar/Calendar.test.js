import {calcAvailTimeSlot} from './Index';

const selectDateEmpty = '2020-04-25';
const selectDateContigFill = '2020-04-28';
const selectDateNotContigFill = '2020-04-27';

const jobObjFound = {
  '2020-04-26': {},
  '2020-04-27': {
    '13': {
      'jobId': 7,
      'clientId': 1,
    },
  },
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


test('ContiguousJobArr', () => {
  const arr = calcAvailTimeSlot(jobObjFound, selectDateContigFill);

  expect(arr).toEqual([
    {'7': {'jobId': 4, 'clientId': 1}},
    {'9': {'jobId': 4, 'clientId': 1}},
    11, 12, 13,
    {'14': {'jobId': 7, 'clientId': 1}},
    {'16': {'jobId': 7, 'clientId': 1}},
  ]);
});

test('SingleJobArr', () => {
  const arr = calcAvailTimeSlot(jobObjFound, selectDateNotContigFill);

  expect(arr).toEqual([
    7, 8, 9, 10, 11, 12,
    {'13': {'jobId': 7, 'clientId': 1}},
    15, 16, 17,
  ]);
});

test('EmptyTimeslotArr', () => {
  const arr = calcAvailTimeSlot(jobObjFound, selectDateEmpty);

  expect(arr).toEqual([7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
});
