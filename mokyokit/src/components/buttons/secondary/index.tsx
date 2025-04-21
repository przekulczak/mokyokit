import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Props {
  onClick?: () => void;
  icon?: React.ReactNode;
  text: string;
  className?: string;
}

export const ButtonSecondary = ({ icon, text, className, onClick }: Props) => (
  <Button
    className={cn(
      'bg-button-secondary text-black font-normal border border-solid button-outline flex gap-2 shadow-none hover:bg-button-secondary',
      className
    )}
    type='button'
    onClick={onClick ? onClick : undefined}
  >
    {icon}
    {text}
  </Button>
);
