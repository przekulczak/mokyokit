import { SelectField } from '../components/select/selectField';
import { MultiSelect } from '../components/multiselect/multiselect';
import { InputType } from '../types/types';
import { ControllerRenderProps } from 'react-hook-form';

interface GetInputTypeProps {
  inputName: any;
  field: ControllerRenderProps;
  option: any;
  selection: any;
  name: string;
  error: string | undefined;
}

export const getInputType = ({
  inputName,
  field,
  option,
  selection,
  name,
  error,
}: GetInputTypeProps) => {
  switch (inputName.type) {
    case InputType.SELECT:
      return (
        <SelectField
          options={inputName.values}
          field={field}
          disabled={selection !== option.value}
          name={name}
          error={error}
        />
      );
    case InputType.MULTIVALUE:
      return (
        <MultiSelect
          options={inputName.values}
          onValueChange={field.onChange}
          disabled={selection !== option.value}
          value={field.value}
          name={name}
          error={error}
        />
      );
  }
};
