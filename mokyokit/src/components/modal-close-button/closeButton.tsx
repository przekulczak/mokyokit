import { ButtonSecondary } from '../buttons/secondary';

import { useModal } from '@/hooks/use-modal';
export const ModalCloseButton = () => {
  const { setIsModalOpened } = useModal();
  const onClick = () => {
    setIsModalOpened(false);
  };
  return <ButtonSecondary text='Zamknij' onClick={onClick} />;
};
