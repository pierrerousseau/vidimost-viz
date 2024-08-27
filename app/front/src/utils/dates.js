import { format, addDays, parse, getWeek } from 'date-fns';


export function toDate(date) {
    return parse(date, 'yyyyMMdd', new Date());
}

export function readableDate(date) {
    return format(toDate(date), 'dd/MM/yyyy');
}

export function getDay(date) {
    return toDate(date).getDay() - 1;
}
