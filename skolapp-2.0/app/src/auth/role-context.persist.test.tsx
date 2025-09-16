import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { RoleProvider, useRole } from './role-context';

const Probe: React.FC = () => {
  const { role, setRole } = useRole();
  return (
    <div>
      <span data-testid="role">{role}</span>
      <button onClick={() => setRole('teacher')}>set-teacher</button>
    </div>
  );
};

describe('Role persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores and restores role from localStorage', () => {
    const { getByTestId, getByText, unmount, rerender } = render(
      <RoleProvider>
        <Probe />
      </RoleProvider>
    );
    expect(getByTestId('role').textContent).toBe('guest');
  fireEvent.click(getByText('set-teacher'));
  expect(getByTestId('role').textContent).toBe('teacher');
    unmount();
    // Re-render new provider, should pick up stored role
    const { getByTestId: again } = render(
      <RoleProvider>
        <Probe />
      </RoleProvider>
    );
    expect(again('role').textContent).toBe('teacher');
  });
});
