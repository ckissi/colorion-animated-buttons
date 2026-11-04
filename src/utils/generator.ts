export interface ButtonSettings {
  effect: number; label: string; accent: string; ink: string; surface: string;
  radius: number; padding: number; duration: number;
}
export const DEFAULT_SETTINGS: ButtonSettings = {
  effect: 14, label: 'Make it yours', accent: '#f4ff2b', ink: '#0f191e', surface: '#e2f1f2',
  radius: 8, padding: 24, duration: 400,
};
export function parseSettings(fragment: string, validIds: number[]): ButtonSettings {
  const params = new URLSearchParams(fragment.replace(/^#/, ''));
  const numeric = (key: string, fallback: number, min: number, max: number) => {
    const raw = params.get(key);
    if (raw === null || raw.trim() === '' || !Number.isFinite(Number(raw))) return fallback;
    return Math.round(Math.max(min, Math.min(max, Number(raw))));
  };
  const color = (key: string, fallback: string) => /^#[\da-f]{6}$/i.test(params.get(key) || '') ? params.get(key)!.toLowerCase() : fallback;
  const id = numeric('effect', 14, 1, 999);
  return {
    effect: validIds.includes(id) ? id : 14,
    label: (params.get('label') || DEFAULT_SETTINGS.label).slice(0, 60),
    accent: color('accent', DEFAULT_SETTINGS.accent), ink: color('ink', DEFAULT_SETTINGS.ink), surface: color('surface', DEFAULT_SETTINGS.surface),
    radius: numeric('radius', 8, 0, 48), padding: numeric('padding', 24, 12, 48), duration: numeric('duration', 400, 100, 1600),
  };
}
export const serializeSettings = (settings: ButtonSettings) => new URLSearchParams(Object.entries(settings).map(([key, value]) => [key, String(value)])).toString();
const escapeText = (text: string) => text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
export const generatorMarkup = (settings: ButtonSettings) => `<button\n  class="btn fx-${settings.effect}"\n  type="button"\n  aria-label="${escapeText(settings.label)}"\n>\n  <span class="btn-label">${escapeText(settings.label)}</span>\n</button>`;
export const generatorReact = (settings: ButtonSettings) => `import './button.css';\n\nexport function AnimatedButton({ children = ${JSON.stringify(settings.label)}, ...props }) {\n  return (\n    <button type="button" aria-label={typeof children === 'string' ? children : undefined} {...props} className="btn fx-${settings.effect}">\n      <span className="btn-label">{children}</span>\n    </button>\n  );\n}`;
export function customizeCss(source: string, settings: ButtonSettings) {
  const guardStart = source.indexOf('@media (prefers-reduced-motion: reduce)');
  if (guardStart === -1) throw new Error('Export is missing its reduced-motion guard');
  const effect = source.slice(0, guardStart).replace(/\b\d*\.?\d+(?:ms|s)\b/g, `${settings.duration}ms`);
  return `${effect}\n/* Your theme */\n.btn {\n  --primary: ${settings.accent};\n  --secondary: ${settings.ink};\n  --surface: ${settings.surface};\n  --bink: var(--secondary);\n  --bsurf: var(--surface);\n  border-radius: ${settings.radius}px;\n  padding: 13px ${settings.padding}px;\n}\n\n${source.slice(guardStart)}`;
}
export const generatorDocument = (settings: ButtonSettings, css: string) => `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Custom CSS button</title>\n  <style>\nbody { min-height: 100dvh; margin: 0; display: grid; place-items: center; background: ${settings.surface}; }\n${css}\n  </style>\n</head>\n<body>\n  ${generatorMarkup(settings)}\n</body>\n</html>`;
