import { cn } from '@/lib/utils';
import { Button } from '../../ui/button';

interface Props {
  onClick?: () => void;
  icon?: React.ReactNode;
  type?: 'submit' | 'button';
  disabled?: boolean;
  className?: string;
  text: string;
}

export const ButtonPrimary = ({ onClick, icon, type, disabled, className, text }: Props) => (
  <Button
    type={type || 'button'}
    className={cn('bg-button-primary font-normal flex gap-2 hover:bg-button-primary', className)}
    disabled={disabled}
    onClick={onClick}
  >
    {icon}
    {text}
  </Button>
);
