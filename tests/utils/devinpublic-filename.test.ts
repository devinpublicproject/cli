import { describe, expect, it } from 'vitest';
import {
  buildNoteFilename,
  pickUniqueNoteFilename,
  slugifyTaskName,
} from '@/utils/devinpublic-filename.js';

describe('slugifyTaskName', () => {
  it('lowercases and turns spaces into hyphens', () => {
    expect(slugifyTaskName('My Task Here')).toBe('my-task-here');
  });

  it('uses note when empty or whitespace', () => {
    expect(slugifyTaskName('')).toBe('note');
    expect(slugifyTaskName('   ')).toBe('note');
  });

  it('strips non-alphanumeric characters', () => {
    expect(slugifyTaskName('Fix bug #42 (urgent)!')).toBe('fix-bug-42-urgent');
  });

  it('transliterates Vietnamese with locale vi', () => {
    expect(slugifyTaskName('Đơn giản là test thôi')).toBe('don-gian-la-test-thoi');
  });
});

describe('buildNoteFilename', () => {
  it('joins ymd, unix ms timestamp, and slug', () => {
    expect(buildNoteFilename('2026-03-28', 1712345678901, 'my-task')).toBe(
      '2026-03-28-1712345678901-my-task.md'
    );
  });
});

describe('pickUniqueNoteFilename', () => {
  it('returns first candidate when no collision', () => {
    expect(
      pickUniqueNoteFilename([], '2026-03-28', 100, 'a')
    ).toBe('2026-03-28-100-a.md');
  });

  it('appends numeric suffix when filename exists', () => {
    const existing = ['2026-03-28-100-a.md'];
    expect(pickUniqueNoteFilename(existing, '2026-03-28', 100, 'a')).toBe(
      '2026-03-28-100-a-2.md'
    );
  });

  it('increments suffix until unique', () => {
    const existing = [
      '2026-03-28-100-a.md',
      '2026-03-28-100-a-2.md',
      '2026-03-28-100-a-3.md',
    ];
    expect(pickUniqueNoteFilename(existing, '2026-03-28', 100, 'a')).toBe(
      '2026-03-28-100-a-4.md'
    );
  });
});
