import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useScrollReveal } from '../../app/composables/useScrollReveal';

describe('useScrollReveal Composable', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with isRevealed = false by default in non-browser or before intersecting', () => {
    const { isRevealed, targetRef } = useScrollReveal();
    expect(isRevealed.value).toBe(false);
    expect(targetRef.value).toBeNull();
  });

  it('exposes a configurable options contract', () => {
    const customConfig = {
      threshold: 0.25,
      rootMargin: '0px 0px -100px 0px',
      once: true,
    };
    const { isRevealed } = useScrollReveal(customConfig);
    expect(isRevealed.value).toBe(false);
  });
});
