import { describe, expect, it } from 'vitest';
import {
  buildNoteFilename,
  nextSequenceFromFilenames,
} from '@/utils/devinpublic-filename.js';

describe('nextSequenceFromFilenames', () => {
  it('returns 1 when no matching files', () => {
    expect(nextSequenceFromFilenames([], '2026-03-28')).toBe(1);
    expect(
      nextSequenceFromFilenames(
        ['other.md', '2025-01-01--001-init.md'],
        '2026-03-28'
      )
    ).toBe(1);
  });

  it('returns max + 1 for same ymd', () => {
    const names = [
      '2026-03-28--001-init.md',
      '2026-03-28--003-init.md',
      'noise.txt',
    ];
    expect(nextSequenceFromFilenames(names, '2026-03-28')).toBe(4);
  });
});

describe('buildNoteFilename', () => {
  it('pads sequence to three digits', () => {
    expect(buildNoteFilename('2026-03-28', 1)).toBe(
      '2026-03-28--001-init.md'
    );
    expect(buildNoteFilename('2026-03-28', 12)).toBe(
      '2026-03-28--012-init.md'
    );
  });
});
