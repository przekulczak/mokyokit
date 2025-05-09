import { CronValueProvider } from '../../context/cron-provider';
import { ModalProvider } from '../../context/modal-provider';
interface Props {
  children: React.ReactNode;
}

export const AppWrapper = ({ children }: Props) => {
  return (
    <ModalProvider>
      <CronValueProvider>
        <header className='h-[64px] bg-header flex p-[24px] box-border mb-[24px]'>
          <img src='logo.png' alt='Logo' className='h-[18px] w-[48px]' />
        </header>
        <main className='flex flex-col  align-center min-h-screen bg-[#FCFCFD] max-w-full'>
          {children}
        </main>
      </CronValueProvider>
    </ModalProvider>
  );
};
