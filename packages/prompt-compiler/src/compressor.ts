export function compressExcerpt(code: string): string {
  const lines = code.split(/\r?\n/);
  const processed: string[] = [];

  let inBlockComment = false;

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

    if (inBlockComment) {
      if (trimmed.includes("*/")) {
        inBlockComment = false;
      }
      continue;
    }

    if (trimmed.startsWith("/*") && !trimmed.endsWith("*/")) {
      inBlockComment = true;
      continue;
    }

    if (trimmed.startsWith("/*") && trimmed.endsWith("*/")) {
      continue;
    }

    if (trimmed.startsWith("//") || trimmed.startsWith("# ")) {
      continue;
    }

    processed.push(rawLine.trimEnd());
  }

  const collapsed: string[] = [];
  let prevEmpty = false;

  for (const line of processed) {
    const isEmpty = line.trim().length === 0;
    if (isEmpty) {
      if (!prevEmpty) {
        collapsed.push("");
        prevEmpty = true;
      }
    } else {
      collapsed.push(line);
      prevEmpty = false;
    }
  }

  return collapsed.join("\n").trim();
}
