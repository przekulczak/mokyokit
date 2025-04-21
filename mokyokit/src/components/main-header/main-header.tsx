import { OrnamentPrimary } from '../ornaments/primary';

interface Props {
  text: string;
}

export const MainHeader = ({ text }: Props) => (
  <div className='mb-[24px] ml-[24px] flex items-center gap-2 '>
    <OrnamentPrimary />
    <h1 className='font-normal text-sm leading-none text-[32px] font-semibold '>{text}</h1>
  </div>
);
