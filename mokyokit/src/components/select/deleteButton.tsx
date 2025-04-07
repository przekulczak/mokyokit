import { X } from 'lucide-react';

interface Props {
  value: string;
  onChange: (...event: any[]) => void;
}

export const DeleteButton = ({ value, onChange }: Props) => {
  const handleXClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };
  return (
    value !== '' && (
      <button
        type='button'
        onClick={handleXClick}
        className='absolute right-10 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100'
      >
        <X className='size-4' />
      </button>
    )
  );
};
