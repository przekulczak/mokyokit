import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { Index } from '../routes';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import { CronValueProvider } from '@/context/cron-provider';
import { ModalProvider } from '@/context/modal-provider';

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

describe('Index component', () => {
  it('should render header in the document', () => {
    render(
      <ModalProvider>
        <CronValueProvider>
          <Index />
        </CronValueProvider>
      </ModalProvider>
    );

    const harmonogramText = screen.getByText('Cron');
    expect(harmonogramText).toBeInTheDocument();
  });

  it('should open and close modal all the possible ways', () => {
    render(
      <ModalProvider>
        <CronValueProvider>
          <Index />
        </CronValueProvider>
      </ModalProvider>
    );

    const scheduleButton = screen.getByText('Ustaw harmonogram');
    expect(scheduleButton).toBeInTheDocument();
    fireEvent.click(scheduleButton);

    const modalHeader = screen.getAllByText('Harmonogram')[0];
    expect(modalHeader).toBeInTheDocument();

    const modalDialog = screen.getByRole('dialog');
    const modalCloseButton = within(modalDialog).getByText('Zamknij');
    expect(modalCloseButton).toBeInTheDocument();
    fireEvent.click(modalCloseButton);

    waitFor(() => {
      expect(modalHeader).not.toBeInTheDocument();
    });

    fireEvent.click(scheduleButton);

    const newModalDialog = screen.getByRole('dialog');
    const xButton = within(newModalDialog).getByRole('button', { name: 'Close' });
    expect(xButton).toBeInTheDocument();
    fireEvent.click(xButton);

    waitFor(() => {
      expect(modalHeader).not.toBeInTheDocument();
    });

    fireEvent.click(scheduleButton);
    const overlay = document.querySelector('[data-slot="dialog-overlay"]')!;
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay);

    waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('validation should work properly', async () => {
    render(
      <ModalProvider>
        <CronValueProvider>
          <Index />
        </CronValueProvider>
      </ModalProvider>
    );

    const button = screen.getByText('Ustaw harmonogram');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    const minuteBetweenRadioButton = screen.getByLabelText(/co minutę między/i);
    fireEvent.click(minuteBetweenRadioButton);

    const setButton = screen.getByText('Ustaw');
    expect(setButton).toBeDisabled();
    const headerText = screen.getByTestId('cron-value-header');
    expect(headerText).toHaveTextContent('');
    const validationErrors = screen.getAllByText(/wartość jest wymagana/i);
    expect(validationErrors).toHaveLength(2);

    const everyMinuteRadioButton = screen.getByLabelText(/każda minuta/i);
    fireEvent.click(everyMinuteRadioButton);
    expect(screen.queryAllByText(/wartość jest wymagana/i)).toHaveLength(0);
    let updatedHeaderText = screen.getByTestId('cron-value-header');
    await waitFor(() => {
      expect(updatedHeaderText).toHaveTextContent('* * * * *');
    });
    expect(setButton).toBeEnabled();

    const everyXHoursRadioButton = screen.getByLabelText(/co \*\/x godzin/i);
    fireEvent.click(everyXHoursRadioButton);
    expect(setButton).toBeDisabled();
    expect(headerText).toHaveTextContent('');
    expect(validationErrors).toHaveLength(2);

    const everyHourRadioButton = screen.getByLabelText(/każda godzina/i);
    fireEvent.click(everyHourRadioButton);
    expect(screen.queryAllByText(/wartość jest wymagana/i)).toHaveLength(0);
    await waitFor(() => {
      expect(updatedHeaderText).toHaveTextContent('* * * * *');
    });
    expect(setButton).toBeEnabled();

    const certainMountDayRadioButton = screen.getByLabelText(/określony dzień miesiąca/i);
    fireEvent.click(certainMountDayRadioButton);
    expect(setButton).toBeDisabled();
    expect(headerText).toHaveTextContent('');
    expect(screen.queryAllByText(/wartość jest wymagana/i)).toHaveLength(1);

    const everyMonthDayRadioButton = screen.getByLabelText(/każdy dzień miesiąca/i);
    fireEvent.click(everyMonthDayRadioButton);
    expect(screen.queryAllByText(/wartość jest wymagana/i)).toHaveLength(0);
    await waitFor(() => {
      expect(updatedHeaderText).toHaveTextContent('* * * * *');
    });
    expect(setButton).toBeEnabled();

    const certainWeekDayRadioButton = screen.getByLabelText(/określony dzień tygodnia/i);
    fireEvent.click(certainWeekDayRadioButton);
    expect(setButton).toBeDisabled();
    expect(headerText).toHaveTextContent('');
    expect(screen.queryAllByText(/wartość jest wymagana/i)).toHaveLength(1);

    const everyWeekDayRadioButton = screen.getByLabelText(/każdy dzień tygodnia/i);
    fireEvent.click(everyWeekDayRadioButton);
    expect(screen.queryAllByText(/wartość jest wymagana/i)).toHaveLength(0);
    await waitFor(() => {
      expect(updatedHeaderText).toHaveTextContent('* * * * *');
    });
    expect(setButton).toBeEnabled();
  });

  it('should properly display various cron patterns in the header and set them', async () => {
    render(
      <ModalProvider>
        <CronValueProvider>
          <Index />
        </CronValueProvider>
      </ModalProvider>
    );

    const button = screen.getByText('Ustaw harmonogram');
    expect(button).toBeInTheDocument();

    const testCases = [
      {
        name: 'Minutes between 0-5',
        setup: async () => {
          fireEvent.click(button);
          const headerText = screen.getByTestId('cron-value-header');
          await waitFor(() => {
            expect(headerText).toHaveTextContent('* * * * *');
          });

          const minuteBetweenRadioButton = screen.getByLabelText(/co minutę między/i);
          fireEvent.click(minuteBetweenRadioButton);

          await waitFor(() => {
            const minuteFromSelect = document.querySelector('[name="minuteBetweenFrom"]');
            expect(minuteFromSelect).toBeInTheDocument();
          });

          const minuteFromSelect = document.querySelector(
            '[name="minuteBetweenFrom"]'
          ) as HTMLElement;
          const minuteToSelect = document.querySelector('[name="minuteBetweenTo"]') as HTMLElement;

          fireEvent.click(minuteFromSelect);
          const option0 = screen.getByRole('option', { name: '0' });
          fireEvent.click(option0);

          fireEvent.click(minuteToSelect);
          const option5 = screen.getByRole('option', { name: '5' });
          fireEvent.click(option5);
        },
        expectedPattern: '0-5 * * * *',
      },
      {
        name: 'Minutes between 0-5, Hours between 5-10',
        setup: async () => {
          fireEvent.click(button);
          const headerText = screen.getByTestId('cron-value-header');
          await waitFor(() => {
            expect(headerText).toHaveTextContent('* * * * *');
          });

          const minuteBetweenRadioButton = screen.getByLabelText(/co minutę między/i);
          fireEvent.click(minuteBetweenRadioButton);

          await waitFor(() => {
            const minuteFromSelect = document.querySelector('[name="minuteBetweenFrom"]');
            expect(minuteFromSelect).toBeInTheDocument();
          });

          const minuteFromSelect = document.querySelector(
            '[name="minuteBetweenFrom"]'
          ) as HTMLElement;
          const minuteToSelect = document.querySelector('[name="minuteBetweenTo"]') as HTMLElement;

          fireEvent.click(minuteFromSelect);
          const option0 = screen.getByRole('option', { name: '0' });
          fireEvent.click(option0);

          fireEvent.click(minuteToSelect);
          const option5 = screen.getByRole('option', { name: '5' });
          fireEvent.click(option5);

          const hourBetweenRadioButton = screen.getByLabelText(/co godzinę między/i);
          fireEvent.click(hourBetweenRadioButton);

          await waitFor(() => {
            const hourFromSelect = document.querySelector('[name="hourBetweenFrom"]');
            expect(hourFromSelect).toBeInTheDocument();
          });

          const hourFromSelect = document.querySelector('[name="hourBetweenFrom"]') as HTMLElement;
          const hourToSelect = document.querySelector('[name="hourBetweenTo"]') as HTMLElement;

          fireEvent.click(hourFromSelect);
          const hour5 = screen.getByRole('option', { name: '5' });
          fireEvent.click(hour5);

          fireEvent.click(hourToSelect);
          const hour10 = screen.getByRole('option', { name: '10' });
          fireEvent.click(hour10);
        },
        expectedPattern: '0-5 5-10 * * *',
      },
      {
        name: 'Every 5 minutes, Hours between 5-10',
        setup: async () => {
          fireEvent.click(button);

          const everyXMinutesRadioButton = screen.getByLabelText(/co \*\/x minut/i);
          fireEvent.click(everyXMinutesRadioButton);

          await waitFor(() => {
            const minuteSelect = document.querySelector('[name="everyXMinutes"]');
            expect(minuteSelect).toBeInTheDocument();
          });

          const minuteSelect = document.querySelector('[name="everyXMinutes"]') as HTMLElement;
          fireEvent.click(minuteSelect);
          const option5 = screen.getByRole('option', { name: '5' });
          fireEvent.click(option5);

          const hourBetweenRadioButton = screen.getByLabelText(/co godzinę między/i);
          fireEvent.click(hourBetweenRadioButton);

          await waitFor(() => {
            const hourFromSelect = document.querySelector('[name="hourBetweenFrom"]');
            expect(hourFromSelect).toBeInTheDocument();
          });

          const hourFromSelect = document.querySelector('[name="hourBetweenFrom"]') as HTMLElement;
          fireEvent.click(hourFromSelect);
          const hour5 = screen.getByRole('option', { name: '5' });
          fireEvent.click(hour5);

          const hourToSelect = document.querySelector('[name="hourBetweenTo"]') as HTMLElement;
          fireEvent.click(hourToSelect);
          const hour10 = screen.getByRole('option', { name: '10' });
          fireEvent.click(hour10);
        },
        expectedPattern: '*/5 5-10 * * *',
      },
      {
        name: 'Minutes between 1-10, Every hour',
        setup: async () => {
          fireEvent.click(button);

          const minuteBetweenRadioButton = screen.getByLabelText(/co minutę między/i);
          fireEvent.click(minuteBetweenRadioButton);

          await waitFor(() => {
            const minuteFromSelect = document.querySelector('[name="minuteBetweenFrom"]');
            expect(minuteFromSelect).toBeInTheDocument();
          });

          const minuteFromSelect = document.querySelector(
            '[name="minuteBetweenFrom"]'
          ) as HTMLElement;
          fireEvent.click(minuteFromSelect);
          const option1 = screen.getByRole('option', { name: '1' });
          fireEvent.click(option1);

          const minuteToSelect = document.querySelector('[name="minuteBetweenTo"]') as HTMLElement;
          fireEvent.click(minuteToSelect);
          const option10 = screen.getByRole('option', { name: '10' });
          fireEvent.click(option10);
        },
        expectedPattern: '1-10 * * * *',
      },
      {
        name: 'Minutes 1-10, Hours 10-15, Monday',
        setup: async () => {
          fireEvent.click(button);

          const minuteBetweenRadioButton = screen.getByLabelText(/co minutę między/i);
          fireEvent.click(minuteBetweenRadioButton);

          await waitFor(() => {
            const minuteFromSelect = document.querySelector('[name="minuteBetweenFrom"]');
            expect(minuteFromSelect).toBeInTheDocument();
          });

          const minuteFromSelect = document.querySelector(
            '[name="minuteBetweenFrom"]'
          ) as HTMLElement;
          fireEvent.click(minuteFromSelect);
          const option1 = screen.getByRole('option', { name: '1' });
          fireEvent.click(option1);

          const minuteToSelect = document.querySelector('[name="minuteBetweenTo"]') as HTMLElement;
          fireEvent.click(minuteToSelect);
          const option10 = screen.getByRole('option', { name: '10' });
          fireEvent.click(option10);

          const hourBetweenRadioButton = screen.getByLabelText(/co godzinę między/i);
          fireEvent.click(hourBetweenRadioButton);

          await waitFor(() => {
            const hourFromSelect = document.querySelector('[name="hourBetweenFrom"]');
            expect(hourFromSelect).toBeInTheDocument();
          });

          const hourFromSelect = document.querySelector('[name="hourBetweenFrom"]') as HTMLElement;
          fireEvent.click(hourFromSelect);
          const hour10 = screen.getByRole('option', { name: '10' });
          fireEvent.click(hour10);

          const hourToSelect = document.querySelector('[name="hourBetweenTo"]') as HTMLElement;
          fireEvent.click(hourToSelect);
          const hour15 = screen.getByRole('option', { name: '15' });
          fireEvent.click(hour15);

          const certainWeekDayRadioButton = screen.getByLabelText(/określony dzień tygodnia/i);
          fireEvent.click(certainWeekDayRadioButton);

          await waitFor(() => {
            const dayOfWeekSelect = document.querySelector('[name="certainDayOfWeek"]');
            expect(dayOfWeekSelect).toBeInTheDocument();
          });

          const dayOfWeekSelect = document.querySelector(
            '[name="certainDayOfWeek"]'
          ) as HTMLElement;
          fireEvent.click(dayOfWeekSelect);
          const mondayOption = screen.getByRole('option', { name: 'Poniedziałek' });
          fireEvent.click(mondayOption);
        },
        expectedPattern: '1-10 10-15 * * 1',
      },
      {
        name: 'Minutes 0-5, Hours 5-10, Day 1, April, Tuesday',
        setup: async () => {
          fireEvent.click(button);

          const minuteBetweenRadioButton = screen.getByLabelText(/co minutę między/i);
          fireEvent.click(minuteBetweenRadioButton);

          await waitFor(() => {
            const minuteFromSelect = document.querySelector('[name="minuteBetweenFrom"]');
            expect(minuteFromSelect).toBeInTheDocument();
          });

          const minuteFromSelect = document.querySelector(
            '[name="minuteBetweenFrom"]'
          ) as HTMLElement;
          fireEvent.click(minuteFromSelect);
          const option0 = screen.getByRole('option', { name: '0' });
          fireEvent.click(option0);

          const minuteToSelect = document.querySelector('[name="minuteBetweenTo"]') as HTMLElement;
          fireEvent.click(minuteToSelect);
          const option5 = screen.getByRole('option', { name: '5' });
          fireEvent.click(option5);

          const hourBetweenRadioButton = screen.getByLabelText(/co godzinę między/i);
          fireEvent.click(hourBetweenRadioButton);

          await waitFor(() => {
            const hourFromSelect = document.querySelector('[name="hourBetweenFrom"]');
            expect(hourFromSelect).toBeInTheDocument();
          });

          const hourFromSelect = document.querySelector('[name="hourBetweenFrom"]') as HTMLElement;
          fireEvent.click(hourFromSelect);
          const hour5 = screen.getByRole('option', { name: '5' });
          fireEvent.click(hour5);

          const hourToSelect = document.querySelector('[name="hourBetweenTo"]') as HTMLElement;
          fireEvent.click(hourToSelect);
          const hour10 = screen.getByRole('option', { name: '10' });
          fireEvent.click(hour10);

          const certainMonthDayRadioButton = screen.getByLabelText(/określony dzień miesiąca/i);
          fireEvent.click(certainMonthDayRadioButton);

          await waitFor(() => {
            const dayOfMonthSelect = document.querySelector('[name="certainMonthDay"]');
            expect(dayOfMonthSelect).toBeInTheDocument();
          });

          const dayOfMonthSelect = document.querySelector(
            '[name="certainMonthDay"]'
          ) as HTMLElement;
          fireEvent.click(dayOfMonthSelect);
          const day1Option = screen.getByRole('option', { name: '1' });
          fireEvent.click(day1Option);

          const certainMonthRadioButton = screen.getByLabelText(/określony miesiąc/i);
          fireEvent.click(certainMonthRadioButton);

          await waitFor(() => {
            const monthSelect = document.querySelector('[name="certainMonthYear"]');
            expect(monthSelect).toBeInTheDocument();
          });

          const monthSelect = document.querySelector('[name="certainMonthYear"]') as HTMLElement;
          fireEvent.click(monthSelect);
          const aprilOption = screen.getByRole('option', { name: 'Kwiecień' });
          fireEvent.click(aprilOption);

          const certainWeekDayRadioButton = screen.getByLabelText(/określony dzień tygodnia/i);
          fireEvent.click(certainWeekDayRadioButton);

          await waitFor(() => {
            const dayOfWeekSelect = document.querySelector('[name="certainDayOfWeek"]');
            expect(dayOfWeekSelect).toBeInTheDocument();
          });

          const dayOfWeekSelect = document.querySelector(
            '[name="certainDayOfWeek"]'
          ) as HTMLElement;
          fireEvent.click(dayOfWeekSelect);
          const tuesdayOption = screen.getByRole('option', { name: 'Wtorek' });
          fireEvent.click(tuesdayOption);
        },
        expectedPattern: '0-5 5-10 1 4 2',
      },
      {
        name: 'Specific minute 59, Specific hour 23, Day 1, April, Tuesday',
        setup: async () => {
          fireEvent.click(button);

          const certainMinuteRadioButton = screen.getByLabelText(/określona minuta/i);
          fireEvent.click(certainMinuteRadioButton);

          await waitFor(() => {
            const minuteSelect = document.querySelector('[name="everyCertainMinutes"]');
            expect(minuteSelect).toBeInTheDocument();
          });

          const minuteSelect = document.querySelector(
            '[name="everyCertainMinutes"]'
          ) as HTMLElement;
          fireEvent.click(minuteSelect);
          const option59 = screen.getByRole('option', { name: '59' });
          fireEvent.click(option59);

          const certainHourRadioButton = screen.getByLabelText(/określona godzina/i);
          fireEvent.click(certainHourRadioButton);

          await waitFor(() => {
            const hourSelect = document.querySelector('[name="everyCertainHours"]');
            expect(hourSelect).toBeInTheDocument();
          });

          const hourSelect = document.querySelector('[name="everyCertainHours"]') as HTMLElement;
          fireEvent.click(hourSelect);
          const hour23 = screen.getByRole('option', { name: '23' });
          fireEvent.click(hour23);

          const certainMonthDayRadioButton = screen.getByLabelText(/określony dzień miesiąca/i);
          fireEvent.click(certainMonthDayRadioButton);

          await waitFor(() => {
            const dayOfMonthSelect = document.querySelector('[name="certainMonthDay"]');
            expect(dayOfMonthSelect).toBeInTheDocument();
          });

          const dayOfMonthSelect = document.querySelector(
            '[name="certainMonthDay"]'
          ) as HTMLElement;
          fireEvent.click(dayOfMonthSelect);
          const day1Option = screen.getByRole('option', { name: '1' });
          fireEvent.click(day1Option);

          const certainMonthRadioButton = screen.getByLabelText(/określony miesiąc/i);
          fireEvent.click(certainMonthRadioButton);

          await waitFor(() => {
            const monthSelect = document.querySelector('[name="certainMonthYear"]');
            expect(monthSelect).toBeInTheDocument();
          });

          const monthSelect = document.querySelector('[name="certainMonthYear"]') as HTMLElement;
          fireEvent.click(monthSelect);
          const aprilOption = screen.getByRole('option', { name: 'Kwiecień' });
          fireEvent.click(aprilOption);

          const certainWeekDayRadioButton = screen.getByLabelText(/określony dzień tygodnia/i);
          fireEvent.click(certainWeekDayRadioButton);

          await waitFor(() => {
            const dayOfWeekSelect = document.querySelector('[name="certainDayOfWeek"]');
            expect(dayOfWeekSelect).toBeInTheDocument();
          });

          const dayOfWeekSelect = document.querySelector(
            '[name="certainDayOfWeek"]'
          ) as HTMLElement;
          fireEvent.click(dayOfWeekSelect);
          const tuesdayOption = screen.getByRole('option', { name: 'Wtorek' });
          fireEvent.click(tuesdayOption);
        },
        expectedPattern: '59 23 1 4 2',
      },
    ];

    for (const testCase of testCases) {
      await testCase.setup();
      const headerText = screen.getByTestId('cron-value-header');
      await waitFor(
        () => {
          expect(headerText).toHaveTextContent(testCase.expectedPattern);
        },
        { timeout: 3000 }
      );
      if (testCases.indexOf(testCase) < testCases.length - 1) {
        const modalDialog = screen.getByRole('dialog');
        const modalSetButton = within(modalDialog).getByText('Ustaw');
        fireEvent.click(modalSetButton);
        const scheduleField = document.querySelector('[name="schedule"]');
        expect(scheduleField).toHaveValue(testCase.expectedPattern);
      }
    }
  });
});
