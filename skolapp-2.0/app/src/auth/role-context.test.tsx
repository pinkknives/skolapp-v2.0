import React from 'react';
import { render, screen } from '@testing-library/react';
import { RoleProvider, useRole } from './role-context';

const Probe: React.FC = () => {
  const { role, setRole } = useRole();
  return (
    <div>
      <span data-testid="role">{role}</span>
      <button onClick={() => setRole('teacher')}>to-teacher</button>
    </div>
  );
};

describe('RoleContext', () => {
  it('defaults to guest and can change role', () => {
    render(
      <RoleProvider>
        <Probe />
      </RoleProvider>
    );
    expect(screen.getByTestId('role').textContent).toBe('guest');
  });
});
