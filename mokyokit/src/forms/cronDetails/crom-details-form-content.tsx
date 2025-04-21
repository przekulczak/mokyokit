import { cronFormFields } from '../../forms/cronDetails/configs';
import { CronFormSection } from './cron-details-form-section';
import { ConfigField, CronFormInput, CronFormSelection } from '../../types/types';

const CronDetailsFormContent = () => {
  return (
    <div className='grid grid-cols-6 gap-2'>
      {cronFormFields.map((field: ConfigField<CronFormSelection>, index: number) => (
        <CronFormSection
          key={String(field.name)}
          title={field.label}
          options={field.values}
          selectionName={field.name as CronFormInput}
          className={index < 2 ? 'col-span-3' : 'col-span-2'}
        />
      ))}
    </div>
  );
};

export default CronDetailsFormContent;
