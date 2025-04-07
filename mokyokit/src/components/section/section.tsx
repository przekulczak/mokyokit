interface Props {
  children: React.ReactNode;
}

export const Section = ({ children }: Props) => {
  return (
    <section className='flex border border-[#EFF1F5] bg-white p-[24px] mx-6 rounded-[8px] flex-col'>
      {children}
    </section>
  );
};
