import { format, addDays, parse, getWeek } from 'date-fns';

export const daysNames = ["lundi", 
                          "mardi", 
                          "mercredi", 
                          "jeudi", 
                          "vendredi", 
                          "samedi", 
                          "dimanche"];

export const monthsNames = ["janvier", "février", "mars", "avril", "mai", "juin",
                            "juillet", "août", "septembre", "octobre",
                            "novembre", "décembre"]


export function toDate(date) {
    return parse(date, 'yyyyMMdd', new Date());
}

export function readableDate(date) {
    return format(toDate(date), 'dd/MM/yyyy');
}

export function getDay(date) {
    return toDate(date).getDay() - 1;
}

export function getWeekNo(date) {
    return getWeek(toDate(date), {weekStartsOn: 1});
}

export function getMonth(date) {
    return toDate(date).getMonth() + 1;
}

export function getYear(date) {
    return toDate(date).getFullYear();
}
