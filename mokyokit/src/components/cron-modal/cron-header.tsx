import { Separator } from '../ui/separator';

interface Props {
  value: string;
}

export const CronHeader = ({ value }: Props) => {
  return (
    <>
      <h3 className='text-sm'>Harmonogram</h3>
      <p className='text-2xl mb-2 font-semibold h-9'>{value}</p>
      <Separator />
    </>
  );
};
