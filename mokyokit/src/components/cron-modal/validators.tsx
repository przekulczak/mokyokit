import { z } from 'zod';
import { FormValues } from './formSchema';
import {
  MinuteOptionValue,
  HourOptionValue,
  MonthDayOptionValue,
  DayOfWeekOptionValue,
  MonthYearOptionValue,
} from './types';

export const validateMinuteSelection = (data: FormValues, ctx: z.RefinementCtx) => {
  const {
    minuteSelection,
    minuteBetweenFrom,
    minuteBetweenTo,
    everyXMinutes,
    everyCertainMinutes,
  } = data;
  if (minuteSelection === MinuteOptionValue.MINUTE_BETWEEN && minuteBetweenTo === '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Musisz wybrać obie wartości',
      path: ['minuteBetweenTo'],
    });
  }
  if (minuteSelection === MinuteOptionValue.MINUTE_BETWEEN && minuteBetweenFrom === '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Musisz wybrać obie wartości',
      path: ['minuteBetweenFrom'],
    });
  }

  if (
    minuteSelection === MinuteOptionValue.MINUTE_BETWEEN &&
    minuteBetweenFrom !== '' &&
    minuteBetweenTo !== ''
  ) {
    const from = parseInt(minuteBetweenFrom || '0');
    const to = parseInt(minuteBetweenTo || '0');

    if (from >= to) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Wartość 'Od' musi być mniejsza niż 'Do' dla minut",
        path: ['minuteBetweenTo'],
      });
    }
  }

  if (minuteSelection === MinuteOptionValue.EVERY_X_MINUTES && everyXMinutes === '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Musisz wprowadzić wartość',
      path: [MinuteOptionValue.EVERY_X_MINUTES],
    });
  }

  if (
    minuteSelection === MinuteOptionValue.EVERY_CERTAIN_MINUTES &&
    everyCertainMinutes.length === 0
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Musisz wprowadzić wartość',
      path: [MinuteOptionValue.EVERY_CERTAIN_MINUTES],
    });
  }
};

export const validateHourSelection = (data: FormValues, ctx: z.RefinementCtx) => {
  const { hourSelection, hourBetweenFrom, hourBetweenTo, everyXHours, everyCertainHours } = data;
  if (hourSelection === HourOptionValue.HOUR_BETWEEN && hourBetweenFrom === '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Musisz wybrać obie wartości',
      path: ['hourBetweenFrom'],
    });
  }
  if (hourSelection === HourOptionValue.HOUR_BETWEEN && hourBetweenTo === '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Musisz wybrać obie wartości',
      path: ['hourBetweenTo'],
    });
  }
  if (
    hourSelection === HourOptionValue.HOUR_BETWEEN &&
    hourBetweenFrom !== '' &&
    hourBetweenTo !== ''
  ) {
    const from = parseInt(data.hourBetweenFrom || '0');
    const to = parseInt(data.hourBetweenTo || '0');

    if (from >= to) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Wartość 'Od' musi być mniejsza niż 'Do' dla godzin",
        path: ['hourBetweenTo'],
      });
    }
  }

  if (hourSelection === HourOptionValue.EVERY_X_HOURS && everyXHours === '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Musisz wprowadzić wartość',
      path: [HourOptionValue.EVERY_X_HOURS],
    });
  }

  if (hourSelection === HourOptionValue.EVERY_CERTAIN_HOURS && everyCertainHours.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Musisz wprowadzić wartość',
      path: [HourOptionValue.EVERY_CERTAIN_HOURS],
    });
  }
};

export const validateMonthSelection = (data: FormValues, ctx: z.RefinementCtx) => {
  const { monthDaySelection, certainMonthDay } = data;

  if (monthDaySelection === MonthDayOptionValue.CERTAIN_MONTH_DAY && certainMonthDay === '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Musisz wybrać miesiąc',
      path: ['certainMonthDay'],
    });
  }
};

export const validateDayOfWeekSelection = (data: FormValues, ctx: z.RefinementCtx) => {
  const { dayOfWeekSelection, certainDayOfWeek } = data;

  if (dayOfWeekSelection === DayOfWeekOptionValue.CERTAIN_DAY_OF_WEEK && certainDayOfWeek === '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Musisz wybrać dzień tygodnia',
      path: ['certainDayOfWeek'],
    });
  }
};

export const validateMonthYearSelection = (data: FormValues, ctx: z.RefinementCtx) => {
  const { monthYearSelection, certainMonthYear } = data;

  if (monthYearSelection === MonthYearOptionValue.CERTAIN_MONTH_YEAR && certainMonthYear === '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Musisz wybrać miesiąc',
      path: ['certainMonthYear'],
    });
  }
};
