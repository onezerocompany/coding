export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/gu,
    (txt: string): string =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}
