interface Props {
  errorMessage?: string;
}

export const Error = ({ errorMessage }: Props) => {
  return <p className='text-red-500 text-xs absolute top-[40px]'>{errorMessage}</p>;
};
