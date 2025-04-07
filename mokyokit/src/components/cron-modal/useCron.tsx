import { useContext } from 'react';
import { CronContext } from './cronProvider';

export const useCron = () => {
  const context = useContext(CronContext);
  if (!context) {
    throw new Error('useCron must be used within a CronProvider');
  }
  return context;
};
