import { createContext, useState, ReactNode } from 'react';
import { generateCronExpression } from './generate-cron-expression';

type CronContextType = {
  cronValue: string;
  handleCronValue: (value: any) => void;
  setCronValue: (value: string) => void;
};

export const CronContext = createContext<CronContextType | undefined>(undefined);

export const CronProvider = ({ children }: { children: ReactNode }) => {
  const [cronValue, setCronValue] = useState('');

  const handleCronValue = (value: any) => setCronValue(generateCronExpression(value));
  return (
    <CronContext.Provider value={{ cronValue, handleCronValue, setCronValue }}>
      {children}
    </CronContext.Provider>
  );
};
