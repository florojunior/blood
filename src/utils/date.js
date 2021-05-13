import { parse, format, parseISO } from 'date-fns';

const date = {
  // Formats a date to YYYY/MM/DD
  formatToDDMMYYYY: (value) => {
    return format(parseISO(value), 'dd/MM/yyyy');
  },
  // Formats a date from DD/MM/YYYY to YYYY/MM/DD
  formatToYYYYMMDD: (date) => {
    return format(parse(date, 'dd/MM/yyyy', new Date()), 'yyyy/MM/dd');
  },
};

export default date;
