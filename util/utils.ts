export function isNullOrEmpty(str: string | null | undefined) {
  return !str || str.trim() === "";
}
