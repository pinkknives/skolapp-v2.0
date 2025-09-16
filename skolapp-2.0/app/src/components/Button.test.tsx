import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  it('renders primary by default', () => {
    render(<Button>Hej</Button>);
    const btn = screen.getByRole('button', { name: 'Hej' });
    expect(btn.className).toMatch(/btn--primary/);
  });

  it('honours variant secondary', () => {
    render(<Button variant="secondary">Sek</Button>);
    const btn = screen.getByRole('button', { name: 'Sek' });
    expect(btn.className).toMatch(/btn--secondary/);
  });

  it('disabled blocks clicks', () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Block</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Block' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('loading blocks clicks and sets aria', () => {
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>Load</Button>);
    const btn = screen.getByRole('button', { name: 'Load' });
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
  });

  it('icon-only warns if no srLabel (dev only)', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Button variant="icon" icon={<span>✎</span>} />);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it('icon-only with srLabel passes without warning', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Button variant="icon" srLabel="Redigera" />);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});
