import { describe, expect, it } from 'vitest';
import { buildMarkdown } from '@/utils/note-markdown.js';

describe('buildMarkdown', () => {
  it('wraps non-empty answer', () => {
    expect(buildMarkdown('  hello  ')).toBe('# Note\n\nhello\n');
  });

  it('uses placeholder for blank answer', () => {
    expect(buildMarkdown('   ')).toBe('# Note\n\n_(empty)_\n');
  });
});
