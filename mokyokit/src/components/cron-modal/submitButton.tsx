import { Button } from '../ui/button';

export const SubmitButton = ({ disabled }: { disabled: boolean }) => (
  <Button className='bg-button-primary font-normal' disabled={disabled}>
    Ustaw
  </Button>
);
