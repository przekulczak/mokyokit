import { FormProvider, UseFormReturn } from 'react-hook-form';
import { CronFormField } from './formField';
import { CronFormData } from './types';

interface Props {
  methods: UseFormReturn<CronFormData>;
  handleSubmit: UseFormReturn<CronFormData>['handleSubmit'];
  control: UseFormReturn<CronFormData>['control'];
}

const CronForm = ({ methods, handleSubmit, control }: Props) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(() => null)} className='flex flex-col gap-[24px] w-full'>
        <div className='flex w-full gap-[24px]'>
          <CronFormField control={control} name='name' label='Nazwa' />
          <CronFormField control={control} name='command' label='Komenda' />
        </div>
        <CronFormField
          control={control}
          name='schedule'
          label='Harmonogram'
          className='mb-[24px]'
        />
      </form>
    </FormProvider>
  );
};

export default CronForm;
