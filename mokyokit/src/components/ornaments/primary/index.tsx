import { Dot } from 'lucide-react';

export const OrnamentPrimary = () => {
  return (
    <div className='grid grid-cols-3 grid-rows-3 w-3 h-3 text-ornament'>
      {[...Array(9)].map((_, i) => (
        <Dot key={i} className='w-[4px] h-[4px]' />
      ))}
    </div>
  );
};
