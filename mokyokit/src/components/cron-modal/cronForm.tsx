import { FormProvider, UseFormReturn } from 'react-hook-form';
import { Separator } from '../ui/separator';
import CronFormContent from './cromFormContent';
import { CloseButton } from './closeButton';
import { useCronDetailsForm } from './useCronForm';
import { ButtonPrimary } from '../buttonPrimary';
import { useCron } from './useCron';

interface Props {
  setValue: any;
  setIsModalOpened: (val: boolean) => void;
}

const CronDetailsForm = ({ setValue, setIsModalOpened }: Props) => {
  const { methods, isValid } = useCronDetailsForm();
  const { cronValue } = useCron();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    methods.handleSubmit(setValue('schedule', cronValue));
    setIsModalOpened(false);
  };

  return (
    <div className='w-full'>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className='space-y-3'>
          <CronFormContent />
          <Separator />
          <div className='flex justify-end gap-2'>
            <CloseButton />
            <ButtonPrimary text='Ustaw' type='submit' disabled={!isValid} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CronDetailsForm;
