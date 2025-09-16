import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useQuizzes } from './useQuizzes';

// Simple fetch mock
const mockFetch = vi.fn();

describe('useQuizzes', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    // @ts-expect-error override
    global.fetch = mockFetch;
    localStorage.clear();
  });

  it('loads quizzes successfully', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ([{ id: 'a', title: 'Test', updatedAt: '2025-01-01T00:00:00Z' }]) });
    const { result } = renderHook(() => useQuizzes());
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.quizzes.length).toBe(1);
    expect(result.current.offline).toBe(false);
  });

  it('falls back to cache on failure', async () => {
    // First call success to seed cache
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ([{ id: 'a', title: 'Seed', updatedAt: '2025-01-01T00:00:00Z' }]) });
    const first = renderHook(() => useQuizzes());
    await waitFor(() => expect(first.result.current.loading).toBe(false));

    // Second render: network fails
    mockFetch.mockRejectedValueOnce(new Error('Network'));
    const second = renderHook(() => useQuizzes());
    await waitFor(() => expect(second.result.current.loading).toBe(false));
    expect(second.result.current.quizzes.length).toBe(1);
    expect(second.result.current.offline).toBe(true);
  });
});
