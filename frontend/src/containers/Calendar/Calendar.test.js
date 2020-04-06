import dayjs from 'dayjs';

function onCalChangeHandler(e){
    let newDate = dayjs().format('2020-03-18')
    if(e === 'Prev'){
        new_date = dayjs(new_date).subtract(7, 'day');
        day_select = new_date.endOf('week').format('YYYY-MM-DD');
    }else{
        new_date = dayjs(new_date).add(7, 'day');
        day_select = new_date.startOf('week').format('YYYY-MM-DD');
    }
    
    return newDate.format('YYYY-MM-D');
}

test('date changer', () => {
    //Next test
    expect(onCalChangeHandler('Next')).toBe('2020-03-25');
    //Prev test
    expect(onCalChangeHandler('Prev')).toBe('2020-03-11');
});