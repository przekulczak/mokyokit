import { FormValues } from './formSchema';
import {
  DayOfWeekOptionValue,
  HourOptionValue,
  MinuteOptionValue,
  MonthDayOptionValue,
  MonthYearOptionValue,
} from './types';

export const cronFormDefaultValues: FormValues = {
  minuteSelection: MinuteOptionValue.EVERY_MINUTE,
  hourSelection: HourOptionValue.EVERY_HOUR,
  monthDaySelection: MonthDayOptionValue.EVERY_MONTH_DAY,
  monthYearSelection: MonthYearOptionValue.EVERY_MONTH_YEAR,
  dayOfWeekSelection: DayOfWeekOptionValue.EVERY_DAY_OF_WEEK,
  minuteBetweenFrom: '',
  minuteBetweenTo: '',
  hourBetweenFrom: '',
  hourBetweenTo: '',
  everyXMinutes: '',
  everyXHours: '',
  everyCertainMinutes: [],
  everyCertainHours: [],
  certainMonthDay: '',
  certainMonthYear: '',
  certainDayOfWeek: '',
};
