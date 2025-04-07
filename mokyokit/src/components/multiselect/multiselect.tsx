import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckIcon, XCircle, ChevronsUpDownIcon, XIcon, WandSparkles } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useFormContext } from 'react-hook-form';
import { Error } from '../cron-modal/errors';

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva(
  'm-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300',
  {
    variants: {
      variant: {
        default: 'border-foreground/10 text-foreground bg-card hover:bg-card/80',
        secondary:
          'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        inverted: 'inverted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string;
    /** The unique value associated with the option. */
    value: string;
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>;
  }[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string[]) => void;

  /** The currently selected values (controlled component). */
  value?: string[];

  /** The default selected values when the component mounts (uncontrolled component). */
  defaultValue?: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;
  error?: string;
  name: string;
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      variant,
      value,
      defaultValue = [],
      placeholder = '',
      animation = 0,
      maxCount = 30,
      modalPopover = false,
      asChild = false,
      className,
      disabled,
      error,
      name,
      ...props
    },
    ref
  ) => {
    const { setError, clearErrors } = useFormContext();

    // Use controlled or uncontrolled state based on whether value prop is provided
    const [internalSelectedValues, setInternalSelectedValues] =
      React.useState<string[]>(defaultValue);

    // Use value from props if provided, otherwise use internal state
    const selectedValues = value !== undefined ? value : internalSelectedValues;

    React.useEffect(() => {
      if (disabled) {
        clearErrors(name);
      } else if (selectedValues.length === 0) {
        setError(name, { message: 'Wartość jest wymagana' });
      } else {
        clearErrors(name);
      }
    }, [name, selectedValues, disabled]);

    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const [triggerWidth, setTriggerWidth] = React.useState<number | undefined>(undefined);

    // Update trigger width when popover opens
    React.useEffect(() => {
      if (isPopoverOpen && triggerRef.current) {
        const width = triggerRef.current.getBoundingClientRect().width;
        setTriggerWidth(width);
      }
    }, [isPopoverOpen]);

    // Close popover when component is disabled
    React.useEffect(() => {
      if (disabled && isPopoverOpen) {
        setIsPopoverOpen(false);
      }
    }, [disabled, isPopoverOpen]);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setIsPopoverOpen(true);
      } else if (event.key === 'Backspace' && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        handleValuesChange(newSelectedValues);
      }
    };

    const handleValuesChange = (newValues: string[]) => {
      setInternalSelectedValues(newValues);
      onValueChange(newValues);
    };

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      handleValuesChange(newSelectedValues);
    };

    const handleClear = () => {
      handleValuesChange([]);
    };

    const handleTogglePopover = () => {
      if (!disabled) {
        setIsPopoverOpen((prev) => !prev);
      }
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      handleValuesChange(newSelectedValues);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        handleValuesChange(allValues);
      }
    };

    return (
      <div className='relative w-full'>
        <Popover
          open={disabled ? false : isPopoverOpen}
          onOpenChange={disabled ? undefined : setIsPopoverOpen}
          modal={modalPopover}
        >
          <PopoverTrigger asChild>
            <Button
              ref={(node) => {
                if (typeof ref === 'function') {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
                triggerRef.current = node;
              }}
              {...props}
              disabled={disabled}
              onClick={handleTogglePopover}
              className={cn(
                'flex w-full p-1 rounded-md  min-h-9 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto disabled:cursor-not-allowed disabled:bg-select-disabled',
                className
              )}
            >
              {selectedValues.length > 0 ? (
                <div className='flex justify-between items-center w-full'>
                  <div className='flex flex-wrap items-center'>
                    {selectedValues.slice(0, maxCount).map((value) => {
                      const option = options.find((o) => o.value === value);
                      const IconComponent = option?.icon;
                      return (
                        <Badge
                          key={value}
                          className={cn(
                            isAnimating ? 'animate-bounce' : '',
                            multiSelectVariants({ variant }),
                            disabled ? 'opacity-70' : ''
                          )}
                          style={{ animationDuration: `${animation}s` }}
                        >
                          {IconComponent && <IconComponent className='h-4 w-4 mr-2' />}
                          {option?.label}
                          {value !== '' && (
                            <XCircle
                              className='ml-2 h-4 w-4 cursor-pointer'
                              onClick={(event) => {
                                event.stopPropagation();
                                toggleOption(value);
                              }}
                            />
                          )}
                        </Badge>
                      );
                    })}
                    {selectedValues.length > maxCount && (
                      <Badge
                        className={cn(
                          'bg-transparent text-foreground border-foreground/1 hover:bg-transparent',
                          isAnimating ? 'animate-bounce' : '',
                          multiSelectVariants({ variant }),
                          disabled ? 'opacity-70' : ''
                        )}
                        style={{ animationDuration: `${animation}s` }}
                      >
                        {`+ ${selectedValues.length - maxCount} more`}
                        {!disabled && (
                          <XCircle
                            className='ml-2 h-4 w-4 cursor-pointer'
                            onClick={(event) => {
                              event.stopPropagation();
                              clearExtraOptions();
                            }}
                          />
                        )}
                      </Badge>
                    )}
                  </div>
                  <div className='flex items-center justify-between'>
                    {!disabled && (
                      <XIcon
                        className='h-4 mx-2 cursor-pointer text-muted-foreground'
                        onClick={(event) => {
                          event.stopPropagation();
                          handleClear();
                        }}
                      />
                    )}
                    <Separator orientation='vertical' className='flex min-h-6 h-full' />
                    <ChevronsUpDownIcon className='h-4 mx-2 cursor-pointer text-muted-foreground' />
                  </div>
                </div>
              ) : (
                <div className='flex items-center justify-between w-full mx-auto'>
                  <span className='text-sm text-muted-foreground mx-3'>{placeholder}</span>
                  <ChevronsUpDownIcon className='h-4 cursor-pointer text-muted-foreground mx-2' />
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className='p-0'
            align='start'
            onEscapeKeyDown={() => setIsPopoverOpen(false)}
            style={{ width: triggerWidth ? `${triggerWidth}px` : 'auto' }}
          >
            <Command className='w-full'>
              <CommandInput placeholder='Search...' onKeyDown={handleInputKeyDown} />
              <CommandList className='w-full'>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => toggleOption(option.value)}
                        className='cursor-pointer'
                      >
                        <div
                          className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50 [&_svg]:invisible'
                          )}
                        >
                          <CheckIcon className='h-4 w-4' />
                        </div>
                        {option.icon && (
                          <option.icon className='mr-2 h-4 w-4 text-muted-foreground' />
                        )}
                        <span>{option.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup>
                  <div className='flex items-center justify-between'>
                    {selectedValues.length > 0 && (
                      <>
                        <CommandItem
                          onSelect={handleClear}
                          className='flex-1 justify-center cursor-pointer'
                        >
                          Clear
                        </CommandItem>
                        <Separator orientation='vertical' className='flex min-h-6 h-full' />
                      </>
                    )}
                    <CommandItem
                      onSelect={() => setIsPopoverOpen(false)}
                      className='flex-1 justify-center cursor-pointer max-w-full'
                    >
                      Close
                    </CommandItem>
                  </div>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
          {animation > 0 && selectedValues.length > 0 && !disabled && (
            <WandSparkles
              className={cn(
                'cursor-pointer my-2 text-foreground bg-background w-3 h-3',
                isAnimating ? '' : 'text-muted-foreground'
              )}
              onClick={() => setIsAnimating(!isAnimating)}
            />
          )}
        </Popover>
        <Error errorMessage={error} />
      </div>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
