export function getImagePath(filename: string): string;
export function getImagePath(filename: null | undefined): undefined;
export function getImagePath(filename: string | null | undefined) {
  return filename ? `/assets/images/${filename}` : undefined;
}
