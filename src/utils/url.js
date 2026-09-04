/**
 * URL resolution helpers for games, iframes, and assets across GitHub Pages and local environments.
 */

export function getBaseAppUrl() {
  if (typeof window === 'undefined') return '';
  const href = window.location.href.split('#')[0].split('?')[0];
  // If the path ends in a file (e.g., .html), strip back to the enclosing directory slash
  const dirHref = href.substring(0, href.lastIndexOf('/') + 1);
  return dirHref;
}

/**
 * Resolves a game URL relative to the current site base,
 * properly handling subpaths like GitHub Pages (/repo-name/ or /repo-name/docs/)
 * while preserving external http/https/data URLs.
 */
export function resolveGameUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  
  // External or inline protocol URLs remain untouched
  if (/^(https?:|data:|blob:|\/\/)/i.test(trimmed)) {
    return trimmed;
  }
  
  // Strip leading slashes (/games/ -> games/, ./games/ -> games/)
  const relativePath = trimmed.replace(/^(\.\/|\/)+/, '');
  
  try {
    const base = getBaseAppUrl();
    return new URL(relativePath, base).href;
  } catch (e) {
    return relativePath;
  }
}

/**
 * Sanitizes iframe HTML markup by resolving any relative/root paths in src attributes
 */
export function resolveIframeCode(code) {
  if (!code || typeof code !== 'string') return '';
  
  // Replace src="/games/..." or src="/Hosted/..." or src="./games/..." with properly resolved URLs
  return code.replace(/src=["']([^"']+)["']/gi, (match, srcVal) => {
    if (/^(https?:|data:|blob:|\/\/)/i.test(srcVal)) {
      return match;
    }
    const resolved = resolveGameUrl(srcVal);
    return `src="${resolved}"`;
  });
}
