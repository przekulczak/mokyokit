import { useFormContext, useWatch } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { getInputType } from '../../helpers/get-input-type';
import { cn } from '@/lib/utils';
import { Fragment } from 'react';
import { CronFormInput, CronFormSelection, OptionType } from '../../types/types';

type CronFormSectionProps = {
  title: string;
  options: OptionType<CronFormSelection>[];
  selectionName: CronFormInput;
  className: string;
};

export const CronFormSection = ({
  title,
  options,
  selectionName,
  className,
}: CronFormSectionProps) => {
  const { control } = useFormContext();
  const selection = useWatch({ control: control, name: selectionName });

  return (
    <div className={className}>
      <h3 className='text-base font-medium mb-2'>{title}</h3>
      <FormField
        control={control}
        name={selectionName}
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} value={field.value} name={selectionName}>
                {options.map((option: any) => (
                  <div key={option.value}>
                    <FormItem className='flex gap-2 items-center'>
                      <FormControl>
                        <RadioGroupItem
                          value={option.value}
                          id={`${selectionName}-${option.value}`}
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor={`${selectionName}-${option.value}`}
                        className='font-normal text-sm cursor-pointer'
                      >
                        {option.label}
                      </FormLabel>
                    </FormItem>

                    {option.inputs && (
                      <div
                        className={cn(
                          'min-h-12 mb-3',
                          option.inputs.length > 1 ? 'flex gap-4' : ''
                        )}
                      >
                        {option.inputs.map((inputName: any, index: any) => (
                          <Fragment key={inputName.name}>
                            <FormField
                              key={inputName.name}
                              control={control}
                              name={inputName.name}
                              render={({ field, fieldState }) => (
                                <FormItem
                                  className={`${option.inputs.length > 1 ? 'flex-1' : ''} mt-2`}
                                >
                                  <FormControl>
                                    <div
                                      key={`${selection}-${option.value}`}
                                      className='flex gap-4 h-full items-center justify-center'
                                    >
                                      {getInputType({
                                        inputName,
                                        field,
                                        option,
                                        selection,
                                        name: inputName.name,
                                        error: fieldState.error?.message,
                                      })}
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            {option.inputs.length > 1 && index !== option.inputs.length - 1 && (
                              <div className='h-inherit flex items-center justify-center'>-</div>
                            )}
                          </Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
