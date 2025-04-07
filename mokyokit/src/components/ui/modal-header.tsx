import { OrnamentSecondary } from '../ornamentSecondary';

interface Props {
  text: string;
}

export const SectionHeader = ({ text }: Props) => {
  return (
    <header className='mb-[24px] flex items-center gap-1 w-full'>
      <OrnamentSecondary />
      <h2 className='font-normal text-sm leading-none'>{text}</h2>
    </header>
  );
};
