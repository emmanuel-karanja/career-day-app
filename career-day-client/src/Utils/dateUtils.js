import { parse, isDate } from "date-fns";
import moment from 'moment';

export const parseDateString=(value, originalValue)=> {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}

export const isSameOrBefore = (startTime, endTime) => {
  return moment(startTime, 'HH:mm').isSameOrBefore(moment(endTime, 'HH:mm'));
}