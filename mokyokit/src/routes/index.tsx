import { ButtonPrimary } from '@/components/buttons/primary';
import { ButtonSecondary } from '@/components/buttons/secondary';
import { CronDetailsModal } from '@/modals/cron-modal/cron-modal';
import { Section } from '@/components/section/section';
import { SectionHeader } from '@/components/ui/modal-header';
import CronForm from '@/forms/cron';
import { Separator } from '@/components/ui/separator';
import { createFileRoute } from '@tanstack/react-router';
import { XIcon, Plus } from 'lucide-react';
import { MainHeader } from '@/components/main-header/main-header';
import { useCronForm } from '@/forms/cron/useCronForm';

export const Route = createFileRoute('/')({
  component: Index,
});

export function Index() {
  const { control, handleSubmit, setValue, methods } = useCronForm();
  return (
    <div className='w-full'>
      <MainHeader text='Cron' />
      <Section>
        <div className='flex justify-between w-full'>
          <div className='flex gap-2 w-full mb-[24px]'>
            <SectionHeader text='Harmonogram' />
            <ButtonSecondary text='Zamknij' icon={<XIcon fontWeight={100} />} />
            <ButtonPrimary text='Zapisz' icon={<Plus fontWeight={100} />} />
          </div>
        </div>
        <Separator className='mb-[24px]' />
        <CronForm handleSubmit={handleSubmit} methods={methods} control={control} />
        <CronDetailsModal setValue={setValue} />
      </Section>
    </div>
  );
}
