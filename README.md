# @devinpublic/dip

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)

**dip** (*devinpublic*) is a small, dependency-light CLI that captures what you are about to do and saves it as a dated Markdown note under `.devinpublic/`. It is built with TypeScript, [Commander](https://github.com/tj/commander.js), and ships as an npm package for use in any project.

## Why use it?

- **One prompt** — asks what you are about to do, then writes the file.
- **Predictable filenames** — `YYYY-MM-DD--NNN-init.md` with per-day sequence numbering so runs do not overwrite each other.
- **Portable** — install once per repo or run via `npx`; works on Node 18+.

## Installation

```bash
npm install @devinpublic/dip
```

Or run without installing:

```bash
npx @devinpublic/dip
```

## Usage

Add a script to your `package.json`:

```json
{
  "scripts": {
    "dip": "dip"
  }
}
```

Then:

```bash
npm run dip
```

You will be prompted:

```text
What are you about to do?
```

After you press Enter, a new file is created under `.devinpublic/` and a success line is printed, for example:

```text
File created successfully at .devinpublic/2026-03-28--001-init.md
```

### CLI options

| Option | Description |
|--------|-------------|
| `-h`, `--help` | Show help |
| `-V`, `--version` | Print version |

## Requirements

- **Node.js** 18 or newer

## Development

```bash
git clone <your-repo-url>
cd devinpublic
npm install
npm run build
npm test
npm run typecheck
```

| Script | Purpose |
|--------|---------|
| `npm run build` | Compile TypeScript to `dist/` and resolve path aliases |
| `npm run dip` | Run the built CLI locally |
| `npm test` | Run the test suite (Vitest) |
| `npm run test:watch` | Tests in watch mode |
| `npm run typecheck` | Typecheck `src/` and `tests/` |

### Project layout

- `src/cli.ts` — CLI entry (Commander)
- `src/actions/` — Command actions (e.g. `note-create`)
- `src/utils/` — Shared helpers
- `tests/` — Test files

Imports use the `@/` alias mapped to `src/` (see `tsconfig.json`).

## Contributing

Contributions are welcome. Please open an issue to discuss larger changes before submitting a pull request. Ensure tests pass:

```bash
npm test
npm run typecheck
```

## License

[MIT](https://opensource.org/licenses/MIT). SPDX: `MIT` (see `package.json`).

## Acknowledgements

Built with [Commander](https://github.com/tj/commander.js), [TypeScript](https://www.typescriptlang.org/), and [Vitest](https://vitest.dev/).
