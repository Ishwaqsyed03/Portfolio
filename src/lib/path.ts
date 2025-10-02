/**
 * Get the base path for assets based on environment
 * This is needed for GitHub Pages deployment where the site is served from /Portfolio
 */
export function getBasePath(): string {
  // In production (GitHub Pages), the base path is /Portfolio
  // In development, there's no base path
  return process.env.NODE_ENV === 'production' && typeof window !== 'undefined' 
    ? '/Portfolio' 
    : '';
}

/**
 * Prefix a path with the base path if needed
 * @param path - The path to prefix (should start with /)
 */
export function withBasePath(path: string): string {
  if (!path || path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const basePath = getBasePath();
  // Ensure the path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
