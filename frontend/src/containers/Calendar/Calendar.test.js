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
    '15': {
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

  // return type is array
  expect(arr).toEqual(expect.any(Array));
  // return match array
  expect(arr).toEqual([
    {'7': {'jobId': 4, 'clientId': 1}}, 9, 10, 11, 12, 13, 14, {'15': {'jobId': 7, 'clientId': 1}}, 17,
  ]);
  // return obj match
  expect(arr).toMatchObject([
    {'7': {'clientId': 1}}, 9, 10, 11, 12, 13, 14, {'15': {'jobId': 7}}, 17,
  ]);
  // check timeslots
  const timeNotSub1 = [7, 8, 15, 16];
  const timeNotEdge = [6, 18];
  expect(arr).toEqual(expect.arrayContaining([9, 17]));
  expect(arr).toEqual(expect.not.arrayContaining(timeNotSub1));
  expect(arr).toEqual(expect.not.arrayContaining(timeNotEdge));
});

test('EmptyTimeslotArr', () => {
  const arr = calcAvailTimeSlot(jobObjEmpty, selectDateEmpty);

  // return type is array
  expect(arr).toEqual(expect.any(Array));
  // return obj in array
  expect(arr).toEqual(
      expect.not.arrayContaining([
        expect.any(Object),
      ]),
  );
  // check timeslots
  // standard expected day timeslot
  const standEmptySubSet = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const timeNotEdge = [6, 18];
  expect(arr).toEqual(standEmptySubSet);
  expect(arr).toEqual(expect.not.arrayContaining(timeNotEdge));
});
