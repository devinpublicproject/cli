import { describe, expect, it } from 'vitest';
import { formatYmd } from '@/utils/date-format.js';

describe('formatYmd', () => {
  it('formats local calendar date', () => {
    expect(formatYmd(new Date(2026, 2, 28))).toBe('2026-03-28');
    expect(formatYmd(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
});
