import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
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
    const ts = fixed.getTime();
    const expectedName = `2026-03-28-${ts}-my-task.md`;

    const { relativePath } = await noteCreate({
      cwd: base,
      now: fixed,
      prompt: async () => 'my task',
      log: (msg) => logs.push(msg),
    });

    expect(relativePath).toBe(`.devinpublic/${expectedName}`);

    const content = await readFile(
      join(base, '.devinpublic', expectedName),
      'utf8'
    );
    expect(content).toBe('# Note\n\nmy task\n');

    expect(logs).toEqual([
      `File created successfully at .devinpublic/${expectedName}`,
    ]);

    await rm(base, { recursive: true, force: true });
  });

  it('creates distinct files for different slugs same instant', async () => {
    const base = await mkdtemp(join(tmpdir(), 'dip-test-'));
    const fixed = new Date(2026, 2, 28);
    const ts = fixed.getTime();

    const first = await noteCreate({
      cwd: base,
      now: fixed,
      prompt: async () => 'first',
      log: () => undefined,
    });

    const second = await noteCreate({
      cwd: base,
      now: fixed,
      prompt: async () => 'second',
      log: () => undefined,
    });

    expect(first.relativePath).toBe(`.devinpublic/2026-03-28-${ts}-first.md`);
    expect(second.relativePath).toBe(`.devinpublic/2026-03-28-${ts}-second.md`);

    await rm(base, { recursive: true, force: true });
  });

  it('adds suffix when same slug and timestamp already exists', async () => {
    const base = await mkdtemp(join(tmpdir(), 'dip-test-'));
    const fixed = new Date(2026, 2, 28);
    const ts = fixed.getTime();
    const dir = join(base, '.devinpublic');
    await mkdir(dir, { recursive: true });
    await writeFile(
      join(dir, `2026-03-28-${ts}-dup.md`),
      '# Note\n\nplaceholder\n',
      'utf8'
    );

    const { relativePath } = await noteCreate({
      cwd: base,
      now: fixed,
      prompt: async () => 'dup',
      log: () => undefined,
    });

    expect(relativePath).toBe(`.devinpublic/2026-03-28-${ts}-dup-2.md`);

    await rm(base, { recursive: true, force: true });
  });
});
