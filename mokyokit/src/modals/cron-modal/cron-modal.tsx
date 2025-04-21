import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import CronDetailsForm from '../../forms/cronDetails/cron-details-form';
import { CronDetailsModalHeader } from './cron-header';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { CronFormData } from '@/forms/cron/types';
import { UseFormReturn } from 'react-hook-form';
import { useModal } from '@/hooks/use-modal';

interface Props {
  setValue: UseFormReturn<CronFormData>['setValue'];
}

export function CronDetailsModal({ setValue }: Props) {
  const { isModalOpened, setIsModalOpened } = useModal();

  return (
    <Dialog open={isModalOpened} onOpenChange={setIsModalOpened}>
      <DialogTrigger className='bg-button-secondary text-black font-normal border border-solid button-outline flex gap-2 shadow-none hover:bg-button-secondary rounded-sm p-2 text-sm max-w-fit'>
        Ustaw harmonogram
      </DialogTrigger>
      <DialogContent className='min-w-full max-h-full  scroll-y-auto p-12'>
        <DialogTitle>
          <DialogHeader className='gap-0'>
            <CronDetailsModalHeader />
          </DialogHeader>
        </DialogTitle>
        <DialogDescription className='sr-only'>
          Set the schedule and configuration for your recurring job.
        </DialogDescription>
        <CronDetailsForm setValue={setValue} />
      </DialogContent>
    </Dialog>
  );
}
