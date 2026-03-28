export function buildMarkdown(answer: string): string {
  const body = answer.trim() === '' ? '_(empty)_' : answer.trim();
  return ['# Note', '', body, ''].join('\n');
}
