import { Separator } from '../../components/ui/separator';
import { useCronValue } from '../../hooks/use-cron-value';

export const CronDetailsModalHeader = () => {
  const { cronValue } = useCronValue();
  return (
    <>
      <h3 className='text-sm'>Harmonogram</h3>
      <p
        className='text-2xl mb-2 font-semibold h-9 overflow-hidden text-ellipsis whitespace-nowrap max-w-[600px]'
        data-testid='cron-value-header'
        title={cronValue}
      >
        {cronValue}
      </p>
      <Separator />
    </>
  );
};
