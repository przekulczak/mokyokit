import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectValueType } from '../cron-modal/types';
import { ControllerRenderProps } from 'node_modules/react-hook-form/dist/types/controller';
import { DeleteButton } from './deleteButton';
import { Error } from '../cron-modal/errors';
import { useError } from './useError';

interface SelectFieldProps {
  options: SelectValueType[];
  field: ControllerRenderProps;
  disabled: boolean;
  name: string;
  error?: string;
}

export function SelectField({ options, field, disabled, name, error }: SelectFieldProps) {
  useError({ name, disabled, value: field.value });

  return (
    <div className='relative w-full flex flex-col'>
      <Select value={field.value} onValueChange={field.onChange} disabled={disabled} name={name}>
        <SelectTrigger className='w-full' name={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <DeleteButton value={field.value} onChange={field.onChange} />
      <Error errorMessage={error} />
    </div>
  );
}
