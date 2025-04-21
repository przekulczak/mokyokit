import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { cronFormDefaultValues } from '../forms/cronDetails/default-values';
import { FormValues, formSchema } from '../forms/cronDetails/form-schema';
import { useCronValue } from './use-cron-value';

export const useCronDetailsForm = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: cronFormDefaultValues,
    mode: 'all',
  });

  const {
    formState: { errors, isValid },
    control,
    getValues,
  } = methods;

  const values = useWatch<FormValues>({ control });

  const { handleCronValue, setCronValue } = useCronValue();

  useEffect(() => {
    if (!isValid) {
      setCronValue('');
    } else {
      handleCronValue(values);
    }
  }, [errors, values, isValid]);

  return { errors, methods, isValid, getValues };
};
