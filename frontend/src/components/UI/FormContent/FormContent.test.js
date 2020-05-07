import {timeFormat, availableTimesArr} from './Index.js';

const timeStr = '10';
const timeNum = 15;
const regex = /^([0-9]|1[0-9]|2[0-3]):[0]{2} [AP][M]$/;
const midNight = 0;
const midDay = 12;

const timeNowStr = '9';
const timeNowNum = 9;

test('timeReFormat', () => {
  // time = string
  expect(timeFormat(timeStr)).toBe('10:00 AM');
  // time = number
  expect(timeFormat(timeNum)).toBe('3:00 PM');
});

test('timeReFormatReturnCheck', () => {
  // time = string
  expect(timeFormat(timeStr)).toMatch(regex);
  // time = number
  expect(timeFormat(timeNum)).toMatch(regex);
});

test('timeReFormatParamError', () => {
  // time = '',null,undefined
  // default to 12:00 AM
  const timeEmpty = '';
  expect(timeFormat(timeEmpty)).toBe('12:00 AM');
  const timeNull = null;
  expect(timeFormat(timeNull)).toBe('12:00 AM');
  expect(timeFormat(undefined)).toBe('12:00 AM');
});

test('timeEdgeCase', () => {
  // time = string
  expect(timeFormat(midNight)).toBe('12:00 AM');
  // time = string
  expect(timeFormat(midDay)).toBe('12:00 PM');
});

test('timeSlotArrayCorrectParam', () => {
	const timeSlotArray = [7, 8, {'9': 'test'}, 10, 11, 12, {'13': 'test2'}, 14, 15, 16, 17];
  expect(availableTimesArr(timeSlotArray,timeNowStr)).toContain(9);
  expect(timeSlotArray).toHaveLength(8)
});

test('timeSlotArrayParamError', () => {
	//default to 0
	//return false to prevent any selections of timeslots - Prevent overlapping
	const timeSlotArray = [7, 8, {'9': 'test'}, 10, 11, 12, {'13': 'test2'}, 14, 15, 16, 17];
	expect(availableTimesArr(timeSlotArray,timeNowNum)).toEqual(0);
})
