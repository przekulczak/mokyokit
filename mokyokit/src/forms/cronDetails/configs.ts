import {
  createHoursOptions,
  createMinutesOptions,
  createDaysOptions,
  createMonthsOptions,
  createDaysOfWeekOptions,
} from '../../helpers/helpers';
import {
  DayOfWeekOptionValue,
  HourOptionValue,
  InputType,
  MinuteOptionValue,
  MonthDayOptionValue,
  MonthYearOptionValue,
  ConfigField,
  DayOfWeekInputs,
  MonthYearInputs,
  MonthDayInputs,
  HourInputs,
  MinuteInputs,
} from '../../types/types';

const selectMinuteOptions = createMinutesOptions();
const selectHourOptions = createHoursOptions();
const selectDayOptions = createDaysOptions();
const selectMonthOptions = createMonthsOptions();
const selectDayOfWeekOptions = createDaysOfWeekOptions();

export const minuteOptions: ConfigField<MinuteOptionValue> = {
  label: 'Minuta',
  name: 'minuteSelection',
  values: [
    { value: MinuteOptionValue.EVERY_MINUTE, label: 'Każda minuta' },
    {
      value: MinuteOptionValue.MINUTE_BETWEEN,
      label: 'Co minutę między',
      inputs: [
        {
          name: MinuteInputs.MINUTE_BETWEEN_FROM,
          type: InputType.SELECT,
          values: selectMinuteOptions,
        },
        {
          name: MinuteInputs.MINUTE_BETWEEN_TO,
          type: InputType.SELECT,
          values: selectMinuteOptions,
        },
      ],
    },
    {
      value: MinuteOptionValue.EVERY_X_MINUTES,
      label: 'Co */X minut',
      inputs: [
        {
          name: MinuteInputs.EVERY_X_MINUTES,
          type: InputType.SELECT,
          values: selectMinuteOptions,
        },
      ],
    },
    {
      value: MinuteOptionValue.EVERY_CERTAIN_MINUTES,
      label: 'Określona minuta (wybierz jedną lub więcej)',
      inputs: [
        {
          name: MinuteInputs.EVERY_CERTAIN_MINUTES,
          type: InputType.MULTIVALUE,
          values: selectMinuteOptions,
        },
      ],
    },
  ],
};

export const hourOptions: ConfigField<HourOptionValue> = {
  label: 'Godziny',
  name: 'hourSelection',
  values: [
    { value: HourOptionValue.EVERY_HOUR, label: 'Każda godzina' },
    {
      value: HourOptionValue.HOUR_BETWEEN,
      label: 'Co godzinę między',
      inputs: [
        { name: HourInputs.HOUR_BETWEEN_FROM, type: InputType.SELECT, values: selectHourOptions },
        { name: HourInputs.HOUR_BETWEEN_TO, type: InputType.SELECT, values: selectHourOptions },
      ],
    },
    {
      value: HourOptionValue.EVERY_X_HOURS,
      label: 'Co */X godzin',
      inputs: [
        { name: HourInputs.EVERY_X_HOURS, type: InputType.SELECT, values: selectHourOptions },
      ],
    },
    {
      value: HourOptionValue.EVERY_CERTAIN_HOURS,
      label: 'Określona godzina (wybierz jedną lub więcej)',
      inputs: [
        {
          name: HourInputs.EVERY_CERTAIN_HOURS,
          type: InputType.MULTIVALUE,
          values: selectHourOptions,
        },
      ],
    },
  ],
};

export const monthDayOptions: ConfigField<MonthDayOptionValue> = {
  label: 'Dzień miesiąca',
  name: 'monthDaySelection',
  values: [
    { value: MonthDayOptionValue.EVERY_MONTH_DAY, label: 'Każdy dzień miesiąca' },
    {
      value: MonthDayOptionValue.CERTAIN_MONTH_DAY,
      label: 'Określony dzień miesiąca',
      inputs: [
        {
          name: MonthDayInputs.CERTAIN_MONTH_DAY,
          type: InputType.SELECT,
          values: selectDayOptions,
        },
      ],
    },
  ],
};

export const monthYearOptions: ConfigField<MonthYearOptionValue> = {
  label: 'Miesiąc roku',
  name: 'monthYearSelection',
  values: [
    { value: MonthYearOptionValue.EVERY_MONTH_YEAR, label: 'Każdy miesiąc roku' },
    {
      value: MonthYearOptionValue.CERTAIN_MONTH_YEAR,
      label: 'Określony miesiąc roku',
      inputs: [
        {
          name: MonthYearInputs.CERTAIN_MONTH_YEAR,
          type: InputType.SELECT,
          values: selectMonthOptions,
        },
      ],
    },
  ],
};

export const dayOfWeekOptions: ConfigField<DayOfWeekOptionValue> = {
  label: 'Dzień tygodnia',
  name: 'dayOfWeekSelection',
  values: [
    { value: DayOfWeekOptionValue.EVERY_DAY_OF_WEEK, label: 'Każdy dzień tygodnia' },
    {
      value: DayOfWeekOptionValue.CERTAIN_DAY_OF_WEEK,
      label: 'Określony dzień tygodnia',
      inputs: [
        {
          name: DayOfWeekInputs.CERTAIN_DAY_OF_WEEK,
          type: InputType.SELECT,
          values: selectDayOfWeekOptions,
        },
      ],
    },
  ],
};

export const cronFormFields = [
  minuteOptions,
  hourOptions,
  monthDayOptions,
  monthYearOptions,
  dayOfWeekOptions,
];
