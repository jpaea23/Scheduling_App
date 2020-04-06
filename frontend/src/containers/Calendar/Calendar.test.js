import dayjs from 'dayjs';

function onCalChangeHandler(e) {
  const newDate = dayjs().format('2020-03-18');
  if (e === 'Prev') {
    newDate = dayjs(newDate).subtract(7, 'day');
  } else {
    newDate = dayjs(newDate).add(7, 'day');
  }
  return newDate.format('YYYY-MM-D');
}

test('date changer', () => {
  // Next test
  expect(onCalChangeHandler('Next')).toBe('2020-03-25');
  // Prev test
  expect(onCalChangeHandler('Prev')).toBe('2020-03-11');
});
