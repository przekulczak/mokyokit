import { cronFormFields } from './configs';
import { CronFormSection } from './cronFormSection';

const CronFormContent = () => {
  return (
    <div className='grid grid-cols-6 gap-2'>
      {cronFormFields.map((field, index) => (
        <CronFormSection
          key={field.name}
          title={field.label}
          options={field.values}
          selectionName={field.name}
          className={index < 2 ? 'col-span-3' : 'col-span-2'}
        />
      ))}
    </div>
  );
};

export default CronFormContent;
