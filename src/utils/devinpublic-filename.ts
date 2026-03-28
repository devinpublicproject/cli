import slugifyImport from 'slugify';

type SlugifyOptions = {
  replacement?: string;
  remove?: RegExp;
  lower?: boolean;
  strict?: boolean;
  locale?: string;
  trim?: boolean;
};

const slugify = slugifyImport as unknown as (
  str: string,
  options?: SlugifyOptions
) => string;

const SLUGIFY_OPTS: SlugifyOptions = {
  lower: true,
  strict: true,
  locale: 'vi',
  trim: true,
};

export function slugifyTaskName(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed.length) return 'note';
  const slug = slugify(trimmed, SLUGIFY_OPTS).slice(0, 80);
  return slug.length > 0 ? slug : 'note';
}

export function buildNoteFilename(
  ymd: string,
  timestampMs: number,
  slug: string
): string {
  return `${ymd}-${timestampMs}-${slug}.md`;
}

export function pickUniqueNoteFilename(
  existingNames: string[],
  ymd: string,
  timestampMs: number,
  slug: string
): string {
  let candidate = buildNoteFilename(ymd, timestampMs, slug);
  let n = 2;
  while (existingNames.includes(candidate)) {
    candidate = buildNoteFilename(ymd, timestampMs, `${slug}-${n}`);
    n += 1;
  }
  return candidate;
}
