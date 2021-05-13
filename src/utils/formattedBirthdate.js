import { format, parse } from 'date-fns';

const formattedBirthdate = (birthdate) => {
  return format(parse(birthdate, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd');
};

export default formattedBirthdate;
