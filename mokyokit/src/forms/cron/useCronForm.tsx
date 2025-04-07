import { useForm } from 'react-hook-form';

export const useCronForm = () => {
  const methods = useForm({
    defaultValues: {
      name: '',
      command: '',
      schedule: '',
    },
  });

  const { control, handleSubmit, setValue } = methods;

  return { control, handleSubmit, setValue, methods };
};
