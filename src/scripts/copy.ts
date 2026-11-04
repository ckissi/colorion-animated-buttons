declare global {
  interface Window { plausible?: ((event: string, options?: { props: Record<string, string> }) => void); }
}
export async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try { await navigator.clipboard.writeText(text); return true; } catch { /* Use the selection fallback. */ }
  }
  const focus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.className = 'clipboard-fallback';
  (document.querySelector('dialog[open]') ?? document.body).append(textarea);
  textarea.select();
  let success = false;
  try { success = document.execCommand('copy'); } catch { success = false; }
  textarea.remove();
  focus?.focus({ preventScroll: true });
  return success;
}
export function trackCopy(effectId: string, format: string) {
  const path = window.location.pathname;
  window.plausible?.('Code Copied', { props: {
    effect_id: effectId, export_type: format,
    page_type: path === '/' ? 'gallery' : path.split('/')[1] || 'other',
  } });
}
const resetTimers = new WeakMap<HTMLButtonElement, number>();
document.addEventListener('click', async (event) => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest<HTMLButtonElement>('[data-copy-target]');
  if (!button || button.disabled) return;
  const target = document.getElementById(button.dataset.copyTarget!);
  if (!target?.textContent) return;
  button.disabled = true;
  button.dataset.copyLabel ??= button.textContent || 'Copy';
  const label = button.dataset.copyLabel;
  window.clearTimeout(resetTimers.get(button));
  const success = await copyText(target.textContent);
  button.disabled = false;
  button.textContent = success ? 'Copied' : 'Try again';
  const status = document.getElementById('copy-status');
  if (status) status.textContent = success ? 'Code copied to clipboard.' : 'Copy failed. Select the code and copy it manually.';
  if (success) trackCopy(button.dataset.copyEffect || 'guide', button.dataset.copyFormat || 'css');
  resetTimers.set(button, window.setTimeout(() => { button.textContent = label; }, 1800));
});
