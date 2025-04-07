import { z } from 'zod';
import {
  validateMinuteSelection,
  validateHourSelection,
  validateMonthSelection,
  validateDayOfWeekSelection,
  validateMonthYearSelection,
} from './validators';

export const formSchema = z
  .object({
    minuteSelection: z.string().optional().or(z.literal('')),
    hourSelection: z.string().optional().or(z.literal('')),
    monthDaySelection: z.string().optional().or(z.literal('')),
    monthYearSelection: z.string().optional().or(z.literal('')),
    dayOfWeekSelection: z.string().optional().or(z.literal('')),
    minuteBetweenFrom: z.string().optional().or(z.literal('')),
    minuteBetweenTo: z.string().optional().or(z.literal('')),
    hourBetweenFrom: z.string().optional().or(z.literal('')),
    hourBetweenTo: z.string().optional().or(z.literal('')),
    everyXMinutes: z.string().optional().or(z.literal('')),
    everyXHours: z.string().optional().or(z.literal('')),
    everyCertainMinutes: z.array(z.string()).or(z.string()),
    everyCertainHours: z.array(z.string()).or(z.string()),
    certainMonthDay: z.string().optional().or(z.literal('')),
    certainMonthYear: z.string().optional().or(z.literal('')),
    certainDayOfWeek: z.string().optional().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    validateMinuteSelection(data, ctx);
    validateHourSelection(data, ctx);
    validateMonthSelection(data, ctx);
    validateDayOfWeekSelection(data, ctx);
    validateMonthYearSelection(data, ctx);
  });

export type FormValues = z.infer<typeof formSchema>;
