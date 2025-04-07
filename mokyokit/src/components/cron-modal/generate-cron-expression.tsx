import { FormValues } from './formSchema';

export function generateCronExpression(data: FormValues): string {
  const {
    minuteSelection,
    hourSelection,
    monthDaySelection,
    monthYearSelection,
    dayOfWeekSelection,
    minuteBetweenFrom,
    minuteBetweenTo,
    everyXMinutes,
    everyCertainMinutes,
    hourBetweenFrom,
    hourBetweenTo,
    everyXHours,
    everyCertainHours,
    certainMonthDay,
    certainMonthYear,
    certainDayOfWeek,
  } = data;

  let minutePart = '*';
  let hourPart = '*';
  let dayOfMonthPart = '*';
  let monthPart = '*';
  let dayOfWeekPart = '*';

  switch (minuteSelection) {
    case 'everyMinute':
      minutePart = '*';
      break;
    case 'minuteBetween':
      minutePart = `${minuteBetweenFrom}-${minuteBetweenTo}`;
      break;
    case 'everyXMinutes':
      console.log('every x minutes');
      minutePart = `*/${everyXMinutes}`;
      break;
    case 'everyCertainMinutes':
      minutePart =
        typeof everyCertainMinutes === 'string'
          ? everyCertainMinutes
          : everyCertainMinutes.join(',');
      break;
  }

  switch (hourSelection) {
    case 'everyHour':
      hourPart = '*';
      break;
    case 'hourBetween':
      hourPart = `${hourBetweenFrom}-${hourBetweenTo}`;
      break;
    case 'everyXHours':
      hourPart = `*/${everyXHours}`;
      break;
    case 'everyCertainHours':
      hourPart =
        typeof everyCertainHours === 'string' ? everyCertainHours : everyCertainHours.join(',');
      break;
  }

  switch (monthDaySelection) {
    case 'everyMonthDay':
      dayOfMonthPart = '*';
      break;
    case 'certainMonthDay':
      dayOfMonthPart = typeof certainMonthDay !== 'undefined' ? certainMonthDay : '*';
      break;
  }

  switch (monthYearSelection) {
    case 'everyMonthYear':
      monthPart = '*';
      break;
    case 'certainMonthYear':
      monthPart =
        typeof certainMonthYear === 'string' ? certainMonthYear : certainMonthYear.join(',');
      break;
  }

  switch (dayOfWeekSelection) {
    case 'everyDayOfWeek':
      dayOfWeekPart = '*';
      break;
    case 'certainDayOfWeek':
      dayOfWeekPart =
        typeof certainDayOfWeek === 'string' ? certainDayOfWeek : certainDayOfWeek.join(',');
      break;
  }

  return `${minutePart} ${hourPart} ${dayOfMonthPart} ${monthPart} ${dayOfWeekPart}`;
}
