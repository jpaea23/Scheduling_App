import dayjs from 'dayjs';
import {calcAvailTimeSlot} from './Index';

const selectDateEmpty = "2020-05-03";
const selectDateFill = "2020-04-28";
const jobObjEmpty = {
    "2020-05-03": {},
    "2020-05-04": {},
    "2020-05-05": {},
    "2020-05-06": {},
    "2020-05-07": {},
    "2020-05-08": {},
    "2020-05-09": {}
  }

const jobObjFound = {
    "2020-04-26": {},
    "2020-04-27": {},
    "2020-04-28": {
      "7": {
        "jobId": 4,
        "clientId": 1
      },
      "15": {
        "jobId": 7,
        "clientId": 1
      }
    },
    "2020-04-29": {},
    "2020-04-30": {},
    "2020-05-01": {},
    "2020-05-02": {}
  }


test('GenerateTimeslotArr', () => {
  let arr = calcAvailTimeSlot(jobObjFound,selectDateFill);

  const expected = [1, 2, 3, 4, 5, 6];
  expect([4, 1, 6, 7, 3, 5, 7, 5, 4, 6]).not.toEqual(
    expect.arrayContaining(expected),
  );

  //return type is array 
  expect(arr).toEqual(expect.any(Array))
  //return obj in array
  expect(arr).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        "7": {
          "jobId": 4,
          "clientId": 1
        }
      })
    ])
  );
  //check timeslots
  const timeNotSub1 = [7,8,15,16];
  const timeNotEdge = [6,18];
  expect(arr).toEqual(expect.arrayContaining([9,17]));
  expect(arr).toEqual(expect.not.arrayContaining(timeNotSub1));
  expect(arr).toEqual(expect.not.arrayContaining(timeNotEdge));
});

test('EmptyTimeslotArr', () => {
  const arr = calcAvailTimeSlot(jobObjEmpty,selectDateEmpty);

  //return type is array 
  expect(arr).toEqual(expect.any(Array));
  //return obj in array
  expect(arr).toEqual(
    expect.not.arrayContaining([
      expect.any(Object)
    ])
  );
  //check timeslots
  //standard expected day timeslot
  const standEmptySubSet = [7,8,9,10,11,12,13,14,15,16,17];
  const timeNotEdge = [6,18]
  expect(arr).toEqual(standEmptySubSet);
  expect(arr).toEqual(expect.not.arrayContaining(timeNotEdge));
});
