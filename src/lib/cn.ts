/**
 * Minimal class joiner.
 *
 * Deliberately not clsx/tailwind-merge — this codebase does not need another
 * dependency for `filter(Boolean).join(" ")`, and no component here relies on
 * conflicting-class resolution.
 */
export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
