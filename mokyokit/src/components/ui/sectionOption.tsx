import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

export const SectionOption = ({
  option,
  form,
  registerName,
}: {
  option: any;
  form: any;
  registerName: string;
}) => {
  return (
    <FormField
      control={form.control}
      name={registerName}
      render={({ field }: { field: any }) => (
        <FormItem>
          <FormLabel>{option.label}</FormLabel>
          <FormControl>
            <RadioGroup>
              {option.inputs?.map((inputName: any) => (
                <RadioGroupItem key={inputName} value={inputName} id={inputName} {...field} />
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
