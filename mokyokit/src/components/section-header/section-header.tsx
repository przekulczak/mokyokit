interface Props {
  text: string;
}

export const SectionHeader = ({ text }: Props) => {
  return (
    <header>
      <h1 className='pb-[24px] pt-[10px] font-inter font-normal '>{text}</h1>
    </header>
  );
};
