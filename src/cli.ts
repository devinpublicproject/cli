#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Command } from 'commander';
import { noteCreate } from '@/actions/note-create.js';

function readPackageVersion(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  const pkgPath = join(here, '..', 'package.json');
  const raw = readFileSync(pkgPath, 'utf8');
  const pkg = JSON.parse(raw) as { version?: string };
  return pkg.version ?? '0.0.0';
}

const program = new Command();

program
  .name('dip')
  .description('Create a markdown note under .devinpublic')
  .version(readPackageVersion(), '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'display help for command')
  .action(async () => {
    await noteCreate({ cwd: process.cwd() });
  });

program.parseAsync(process.argv).catch((err: unknown) => {
  console.error(err);
  process.exitCode = 1;
});
