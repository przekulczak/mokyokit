import { Dot } from 'lucide-react';

export const OrnamentSecondary = () => {
  return (
    <div className='grid grid-cols-2 grid-rows-3 w-3 h-3 text-ornament'>
      {[...Array(6)].map((_, i) => (
        <Dot key={i} className='w-[4px] h-[4px]' />
      ))}
    </div>
  );
};
