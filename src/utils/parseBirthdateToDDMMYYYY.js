import { format, parse, isMatch } from 'date-fns';

const parseDateToDDMMYYYY = (date) => {
  if (isMatch(date, 'yyyy/MM/dd')) {
    return format(parse(date, 'yyyy/MM/dd', new Date()), 'dd/MM/yyyy');
  } else if (isMatch(date, 'yyyy-MM-dd')) {
    return format(parse(date, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy');
  } else {
    throw new Error('Invalid date format!');
  }
};

export default parseDateToDDMMYYYY;
