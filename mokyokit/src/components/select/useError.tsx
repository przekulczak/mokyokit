import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

interface UseErrorArguments {
  name: string;
  value: string;
  disabled: boolean;
}

export const useError = ({ name, value, disabled }: UseErrorArguments) => {
  const { setError, clearErrors } = useFormContext();

  useEffect(() => {
    if (!disabled && value === '') {
      setError(name, { message: 'Wartość jest wymagana' });
    }
    if (!disabled && value !== '') {
      clearErrors(name);
    }
    if (disabled) {
      clearErrors(name);
    }
  }, [name, value, disabled]);
};
