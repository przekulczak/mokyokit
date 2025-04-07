// src/routes/__root.tsx
import { AppWrapper } from '@/components';
import { createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => {
    return (
      <AppWrapper>
        <Outlet />
      </AppWrapper>
    );
  },
});

import { Outlet } from '@tanstack/react-router';
