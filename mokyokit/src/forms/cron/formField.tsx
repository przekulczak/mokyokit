import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Control } from 'react-hook-form';

interface CronFormValues {
  name: string;
  command: string;
  schedule: string;
}

interface Props {
  name: keyof CronFormValues;
  control: Control<CronFormValues>;
  label: string;
  className?: string;
}

export const CronFormField = ({ control, name, label, className }: Props) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={cn('relative w-full', className)}>
        <FormLabel className='text-[11px] font-normal bg-white absolute left-[12px] bottom-[22px] tracking-[2%] border-solid border-[5px] border-white box-border'>
          {label}
        </FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
