import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

export async function ensureGitignoreEntry(
  root: string,
  entry = ".context-pilot/",
): Promise<boolean> {
  const gitignorePath = join(root, ".gitignore");
  let content = "";
  let exists = false;

  try {
    content = await readFile(gitignorePath, "utf8");
    exists = true;
  } catch {
    exists = false;
  }

  const lines = content.split(/\r?\n/);
  const normalizedEntry = entry.replace(/\/$/, "");
  const alreadyPresent = lines.some((line) => {
    const trimmed = line.trim();
    return (
      trimmed === entry ||
      trimmed === normalizedEntry ||
      trimmed === `${normalizedEntry}/`
    );
  });

  if (alreadyPresent) {
    return false;
  }

  const newline = content.length === 0 || content.endsWith("\n") ? "" : "\n";
  const updatedContent = `${content}${newline}${entry}\n`;
  await writeFile(gitignorePath, updatedContent, "utf8");
  return true;
}
