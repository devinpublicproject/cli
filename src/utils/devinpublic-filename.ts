export function nextSequenceFromFilenames(
  filenames: string[],
  ymd: string
): number {
  const suffix = '-init.md';
  const re = new RegExp(
    `^${ymd.replace(/-/g, '\\-')}--(\\d+)${suffix.replace(/\./g, '\\.')}$`
  );
  let max = 0;
  for (const name of filenames) {
    const m = name.match(re);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n > max) max = n;
    }
  }
  return max + 1;
}

export function buildNoteFilename(ymd: string, seq: number): string {
  const seqStr = String(seq).padStart(3, '0');
  return `${ymd}--${seqStr}-init.md`;
}
