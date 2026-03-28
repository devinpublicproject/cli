import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { noteCreate, QUESTION } from '@/actions/note-create.js';

describe('QUESTION', () => {
  it('matches product spec', () => {
    expect(QUESTION).toBe('What are you about to do?');
  });
});

describe('noteCreate', () => {
  it('creates file and logs success path', async () => {
    const base = await mkdtemp(join(tmpdir(), 'dip-test-'));
    const logs: string[] = [];
    const fixed = new Date(2026, 2, 28, 12, 0, 0);

    const { relativePath } = await noteCreate({
      cwd: base,
      now: fixed,
      prompt: async () => 'my task',
      log: (msg) => logs.push(msg),
    });

    expect(relativePath).toBe('.devinpublic/2026-03-28--001-init.md');

    const content = await readFile(
      join(base, '.devinpublic', '2026-03-28--001-init.md'),
      'utf8'
    );
    expect(content).toBe('# Note\n\nmy task\n');

    expect(logs).toEqual([
      'File created successfully at .devinpublic/2026-03-28--001-init.md',
    ]);

    await rm(base, { recursive: true, force: true });
  });

  it('increments sequence when file exists', async () => {
    const base = await mkdtemp(join(tmpdir(), 'dip-test-'));
    const fixed = new Date(2026, 2, 28);

    await noteCreate({
      cwd: base,
      now: fixed,
      prompt: async () => 'first',
      log: () => undefined,
    });

    const { relativePath } = await noteCreate({
      cwd: base,
      now: fixed,
      prompt: async () => 'second',
      log: () => undefined,
    });

    expect(relativePath).toBe('.devinpublic/2026-03-28--002-init.md');

    await rm(base, { recursive: true, force: true });
  });
});
