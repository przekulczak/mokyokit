import { createContext, useState, ReactNode } from 'react';
import { generateCronExpression } from '../helpers/generate-cron-expression';

type CronContextType = {
  cronValue: string;
  handleCronValue: (value: any) => void;
  setCronValue: (value: string) => void;
  resetCronValue: () => void;
};

export const CronValueContext = createContext<CronContextType | undefined>(undefined);

export const CronValueProvider = ({ children }: { children: ReactNode }) => {
  const [cronValue, setCronValue] = useState('');

  const handleCronValue = (value: any) => setCronValue(generateCronExpression(value));
  const resetCronValue = () => setCronValue('');

  return (
    <CronValueContext.Provider
      value={{
        cronValue,
        handleCronValue,
        setCronValue,
        resetCronValue,
      }}
    >
      {children}
    </CronValueContext.Provider>
  );
};
