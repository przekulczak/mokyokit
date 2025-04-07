import { render, screen, waitFor } from '@testing-library/react';
import { Index } from '../routes';
import { describe, it, expect } from 'vitest';
import { CronProvider } from '@/components/cron-modal/cronProvider';
import userEvent from '@testing-library/user-event';

describe('Index component', () => {
  it('should render header in the document', () => {
    render(
      <CronProvider>
        <Index />
      </CronProvider>
    );

    const harmonogramText = screen.getByText('Cron');
    expect(harmonogramText).toBeInTheDocument();
  });
});
