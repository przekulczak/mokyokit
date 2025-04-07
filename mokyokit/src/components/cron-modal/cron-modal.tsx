import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import CronDetailsForm from './cronForm';
import { CronHeader } from './cron-header';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { useCron } from './useCron';
import { CronFormData } from '@/forms/cron/types';
import { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';

interface Props {
  setValue: UseFormReturn<CronFormData>['setValue'];
}

export function CronModal({ setValue }: Props) {
  const { cronValue } = useCron();
  const [isOpened, setIsOpened] = useState(false);
  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger className='bg-button-secondary text-black font-normal border border-solid button-outline flex gap-2 shadow-none hover:bg-button-secondary rounded-sm p-2 text-sm max-w-fit'>
        Ustaw harmonogram
      </DialogTrigger>
      <DialogContent className='min-w-full max-h-full  scroll-y-auto p-12'>
        <DialogTitle>
          <DialogHeader className='gap-0'>
            <CronHeader value={cronValue} />
          </DialogHeader>
        </DialogTitle>
        <DialogDescription className='sr-only'>
          Set the schedule and configuration for your recurring job.
        </DialogDescription>
        <CronDetailsForm setValue={setValue} setIsModalOpened={setIsOpened} />
      </DialogContent>
    </Dialog>
  );
}
