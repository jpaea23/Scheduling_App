import dayjs from 'dayjs';

function getSundayDate(year, month, day) {
    const date = dayjs(new Date(year,month,day));
    console.log(date);
    const sumDay = dayjs().day();
    const sun = dayjs(date).subtract(sumDay, 'day').format();
    return sun;
}

function onCalChangeHandler(e){
    let sun = new Date();
    let newDate = getSundayDate(sun.getFullYear(), sun.getMonth(), sun.getDate());
    switch(e){
        case 'Prev': 
            newDate = dayjs(newDate).subtract(7, 'day')
            break;
        case 'Next':
            newDate = dayjs(newDate).add(7, 'day')
            break;
        default:
    }
    newDate = dayjs(newDate).format();
    return newDate;
}

test('get Sunday Date', () => {
    expect(onCalChangeHandler('Next')).toBe();
});