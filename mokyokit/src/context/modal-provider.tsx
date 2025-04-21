import { createContext, useState, ReactNode } from 'react';

type ModalContextType = {
  isModalOpened: boolean;
  setIsModalOpened: (value: boolean) => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isModalOpened,
        setIsModalOpened,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
