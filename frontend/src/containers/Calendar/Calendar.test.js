import dayjs from 'dayjs';

function onCalChangeHandler(e){
    let newDate = dayjs().format('2020-03-18')
    switch(e){
        case 'Prev': 
            newDate = dayjs(newDate).subtract(7, 'day')
            break;
        case 'Next':
            newDate = dayjs(newDate).add(7, 'day')
            break;
        default:
    }

    return newDate.format('YYYY-MM-D');
}

test('date changer', () => {
    //Next test
    expect(onCalChangeHandler('Next')).toBe('2020-03-25');
    //Prev test
    expect(onCalChangeHandler('Prev')).toBe('2020-03-11');
});