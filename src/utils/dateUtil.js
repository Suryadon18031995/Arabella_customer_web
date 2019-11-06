import moment from 'moment';
import _get from 'lodash/get';

const isValidDate = date => date && moment(date).isValid();

export const getDateFromDateTime = date => isValidDate(date) && moment(date).format('YYYY-MM-DD')

export default getDateFromDateTime;
export const defaultTimeZone = 'America/New_York';
export const defaultTimeFormat = 'DD-MMM-YYYY';

export const reduceDeliveryDates = (datesArray) => {
    const datesArr = {};
    datesArray.map((eachDay) => {
            datesArr[_get(eachDay, 'delivery_date')] = _get(eachDay, 'total_price_format');
    });
    return datesArr;
};

// export const sortDeliveryDates = (a, b) => new Date(b.delivery_date) - new Date(a.delivery_date);

export const sortDeliveryDates = (a, b) => {
    function flipDate(d) {
        return moment(d).format('YYYY/MM/DD');
      }
      const d1 = flipDate(a.delivery_date_format);
      const d2 = flipDate(b.delivery_date_format);
      return d1 > d2 ? 1 : d2 > d1 ? -1 : 0; 
};

const sorter = {
    // "sunday": 0, // << if sunday is first day of week
    "monday": 1,
    "tuesday": 2,
    "wednesday": 3,
    "thursday": 4,
    "friday": 5,
    "saturday": 6,
    "sunday": 7
  };

export const sortWeekDays = (a, b) => {
    const day1 = moment(a).format('dddd').toLowerCase();
    const day2 = moment(b).format('dddd').toLowerCase();
    return sorter[day1] - sorter[day2];
};

export const sortWeekDaysObject = (a, b) => {
    const day1 = moment(a.delivery_date_format).format('dddd').toLowerCase();
    const day2 = moment(b.delivery_date_format).format('dddd').toLowerCase();
    return sorter[day1] - sorter[day2];
};
