import { ButtonSecondary } from '../buttonSecondary';
import { DialogClose } from '@/components/ui/dialog';

export const CloseButton = () => (
  <DialogClose asChild>
    <ButtonSecondary text='Zamknij' />
  </DialogClose>
);
