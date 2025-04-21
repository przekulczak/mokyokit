import { FormProvider } from 'react-hook-form';
import { Separator } from '../../components/ui/separator';
import CronFormContent from './crom-details-form-content';
import { ModalCloseButton } from '../../components/modal-close-button/closeButton';
import { useCronDetailsForm } from '../../hooks/use-cron-form';
import { ButtonPrimary } from '../../components/buttons/primary';
import { useCronValue } from '../../hooks/use-cron-value';
import { useModal } from '../../hooks/use-modal';

interface Props {
  setValue: any;
}

const CronDetailsForm = ({ setValue }: Props) => {
  const { methods, isValid } = useCronDetailsForm();
  const { cronValue } = useCronValue();
  const { setIsModalOpened } = useModal();

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
            <ModalCloseButton />
            <ButtonPrimary text='Ustaw' type='submit' disabled={!isValid} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CronDetailsForm;
