import { createInterface } from 'node:readline';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { formatYmd } from '@/utils/date-format.js';
import {
  pickUniqueNoteFilename,
  slugifyTaskName,
} from '@/utils/devinpublic-filename.js';
import { buildMarkdown } from '@/utils/note-markdown.js';

export const QUESTION = 'What are you about to do?';

export type NoteCreateOptions = {
  cwd: string;
  now?: Date;
  stdin?: NodeJS.ReadableStream;
  stdout?: NodeJS.WritableStream;
  log?: (msg: string) => void;
  prompt?: () => Promise<string>;
};

async function promptWithReadline(
  question: string,
  stdin: NodeJS.ReadableStream,
  stdout: NodeJS.WritableStream
): Promise<string> {
  const rl = createInterface({ input: stdin, output: stdout });
  return new Promise((resolve) => {
    rl.question(`${question}\n`, (line: string) => {
      rl.close();
      resolve(line);
    });
  });
}

export async function noteCreate(
  options: NoteCreateOptions
): Promise<{ relativePath: string }> {
  const {
    cwd,
    now = new Date(),
    stdin = process.stdin,
    stdout = process.stdout,
    log = console.log,
    prompt,
  } = options;

  const answer = prompt
    ? await prompt()
    : await promptWithReadline(QUESTION, stdin, stdout);

  const dir = join(cwd, '.devinpublic');
  await mkdir(dir, { recursive: true });

  const ymd = formatYmd(now);
  const timestampMs = now.getTime();
  const slug = slugifyTaskName(answer);
  const names = await readdir(dir);
  const filename = pickUniqueNoteFilename(names, ymd, timestampMs, slug);
  const filepath = join(dir, filename);

  await writeFile(filepath, buildMarkdown(answer), 'utf8');

  const relativePath = `.devinpublic/${filename}`;
  log(`File created successfully at ${relativePath}`);
  return { relativePath };
}
