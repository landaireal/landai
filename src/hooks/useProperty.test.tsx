import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useProperty } from './useProperty';

describe('useProperty', () => {
  it('returns loading state initially', () => {
    const { result } = renderHook(() => useProperty('studio-1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.property).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('returns property when id exists', async () => {
    const { result } = renderHook(() => useProperty('studio-1'));

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 2000 }
    );

    expect(result.current.property).not.toBeNull();
    expect(result.current.property?.id).toBe('studio-1');
    expect(result.current.error).toBeNull();
  });

  it('returns error when property not found', async () => {
    const { result } = renderHook(() => useProperty('non-existent-id'));

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 2000 }
    );

    expect(result.current.property).toBeNull();
    expect(result.current.error).toBe('Property not found');
  });

  it('returns error when id is undefined', async () => {
    const { result } = renderHook(() => useProperty(undefined));

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 2000 }
    );

    expect(result.current.property).toBeNull();
    expect(result.current.error).toBe('Property ID is required');
  });
});
