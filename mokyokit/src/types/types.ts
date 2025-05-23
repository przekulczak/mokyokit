import { FormValues } from '../modals/cron-modal/form-schema';

export enum InputType {
  SELECT = 'select',
  MULTIVALUE = 'multivalue',
}

export type SelectValueType = {
  label: string;
  value: string;
};

export interface ConfigField<I> {
  label: string;
  name: keyof FormValues;
  values: OptionType<I>[];
}

export interface OptionType<T> {
  value: T;
  label: string;
  inputs?: { name: string; type: InputType; values?: SelectValueType[] }[];
}

export enum MinuteOptionValue {
  EVERY_MINUTE = 'everyMinute',
  MINUTE_BETWEEN = 'minuteBetween',
  EVERY_X_MINUTES = 'everyXMinutes',
  EVERY_CERTAIN_MINUTES = 'everyCertainMinutes',
}

export enum HourOptionValue {
  EVERY_HOUR = 'everyHour',
  HOUR_BETWEEN = 'hourBetween',
  EVERY_X_HOURS = 'everyXHours',
  EVERY_CERTAIN_HOURS = 'everyCertainHours',
}

export enum MonthDayOptionValue {
  EVERY_MONTH_DAY = 'everyMonthDay',
  CERTAIN_MONTH_DAY = 'certainMonthDay',
}

export enum MonthYearOptionValue {
  EVERY_MONTH_YEAR = 'everyMonthYear',
  CERTAIN_MONTH_YEAR = 'certainMonthYear',
}

export enum DayOfWeekOptionValue {
  EVERY_DAY_OF_WEEK = 'everyDayOfWeek',
  CERTAIN_DAY_OF_WEEK = 'certainDayOfWeek',
}

export type CronFormSelection =
  | MinuteOptionValue
  | HourOptionValue
  | MonthDayOptionValue
  | MonthYearOptionValue
  | DayOfWeekOptionValue;

export type FieldError = {
  type: string;
  message: string;
  ref?: {
    name: string;
  };
};

export enum MinuteInputs {
  MINUTE_BETWEEN_FROM = 'minuteBetweenFrom',
  MINUTE_BETWEEN_TO = 'minuteBetweenTo',
  EVERY_X_MINUTES = 'everyXMinutes',
  EVERY_CERTAIN_MINUTES = 'everyCertainMinutes',
}

export enum HourInputs {
  HOUR_BETWEEN_FROM = 'hourBetweenFrom',
  HOUR_BETWEEN_TO = 'hourBetweenTo',
  EVERY_X_HOURS = 'everyXHours',
  EVERY_CERTAIN_HOURS = 'everyCertainHours',
}

export enum MonthDayInputs {
  CERTAIN_MONTH_DAY = 'certainMonthDay',
}

export enum MonthYearInputs {
  CERTAIN_MONTH_YEAR = 'certainMonthYear',
}

export enum DayOfWeekInputs {
  CERTAIN_DAY_OF_WEEK = 'certainDayOfWeek',
}

export type CronFormInput =
  | MinuteInputs
  | HourInputs
  | MonthDayInputs
  | MonthYearInputs
  | DayOfWeekInputs;
