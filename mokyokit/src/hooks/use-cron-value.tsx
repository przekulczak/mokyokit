import { useContext } from 'react';
import { CronValueContext } from '../context/cron-provider';

export const useCronValue = () => {
  const context = useContext(CronValueContext);
  if (!context) {
    throw new Error('useCronValue must be used within a CronProvider');
  }
  return context;
};
