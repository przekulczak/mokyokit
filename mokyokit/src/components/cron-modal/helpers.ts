export const createHoursOptions = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    label: String(i),
    value: String(i),
  }));
};

export const createMinutesOptions = () => {
  return Array.from({ length: 60 }, (_, i) => ({
    label: String(i),
    value: String(i),
  }));
};

export const createDaysOptions = () => {
  return Array.from({ length: 31 }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1),
  }));
};

const months = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];

export const createMonthsOptions = () => {
  return months.map((month, index) => ({
    label: month,
    value: String(index + 1),
  }));
};

const daysOfWeek = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];

export const createDaysOfWeekOptions = () => {
  return daysOfWeek.map((day, index) => ({
    label: day,
    value: String(index + 1),
  }));
};
