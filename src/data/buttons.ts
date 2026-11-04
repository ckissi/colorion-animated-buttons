// Build-time button data: shared base styles, every effect's CSS, and the
// per-button copyable snippet + LLM prompt. Imported by index.astro (for the
// live grid) and by button-data.json.ts (served as a static file, fetched
// on demand when a user opens the copy modal).


// Shared base — every button starts from this, then layers one `.fx-N` effect.
export const BTN_BASE = `.btn {
  /* Theme tokens — override these to recolour the button */
  --primary: #F4FF2B;
  --secondary: #0F191E;
  --surface: #E2F1F2;
  --bink: var(--secondary);   /* ink / foreground */
  --bsurf: var(--surface);    /* surface / background */
  position: relative;
  isolation: isolate;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 13px 24px;
  border: 1px solid var(--bink);
  border-radius: 8px;
  background: transparent;
  color: var(--bink);
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.btn-label {
  position: relative;
  z-index: 2;
  display: inline-block;
  transition: inherit;
}
/* Shared sliding panel used by many fill effects */
.btn::before {
  content: "";
  position: absolute;
  z-index: 1;
  inset: 0;
  background: var(--bink);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease;
}`;

// Each effect: a display name plus the CSS that, layered on .btn, produces it.
const rawEffects: { id: number; name: string; css: string }[] = [
  { id: 1, name: 'Fill Up', css: `.fx-1::before { transform: translateY(100%); }
.fx-1:hover::before { transform: translateY(0); }
.fx-1:hover .btn-label { color: var(--bsurf); }` },
  { id: 2, name: 'Fill Down', css: `.fx-2::before { transform: translateY(-100%); }
.fx-2:hover::before { transform: translateY(0); }
.fx-2:hover .btn-label { color: var(--bsurf); }` },
  { id: 3, name: 'Fill Left', css: `.fx-3::before { transform: translateX(100%); }
.fx-3:hover::before { transform: translateX(0); }
.fx-3:hover .btn-label { color: var(--bsurf); }` },
  { id: 4, name: 'Fill Right', css: `.fx-4::before { transform: translateX(-100%); }
.fx-4:hover::before { transform: translateX(0); }
.fx-4:hover .btn-label { color: var(--bsurf); }` },
  { id: 5, name: 'Fill X', css: `.fx-5::before { transform: scaleX(0); transform-origin: center; }
.fx-5:hover::before { transform: scaleX(1); }
.fx-5:hover .btn-label { color: var(--bsurf); }` },
  { id: 6, name: 'Fill Y', css: `.fx-6::before { transform: scaleY(0); transform-origin: center; }
.fx-6:hover::before { transform: scaleY(1); }
.fx-6:hover .btn-label { color: var(--bsurf); }` },
  { id: 7, name: 'Diagonal', css: `.fx-7::before { transform: translate(-100%, -100%); }
.fx-7:hover::before { transform: translate(0, 0); }
.fx-7:hover .btn-label { color: var(--bsurf); }` },
  { id: 8, name: 'Radial', css: `.fx-8::before { border-radius: 50%; transform: scale(0); transform-origin: center; }
.fx-8:hover::before { transform: scale(1.6); }
.fx-8:hover .btn-label { color: var(--bsurf); }` },
  { id: 9, name: 'Lift', css: `.fx-9 { overflow: visible; }
.fx-9::before { display: none; }
.fx-9:hover { transform: translateY(-4px); box-shadow: 0 8px 0 -2px color-mix(in srgb, var(--bink) 30%, transparent); }` },
  { id: 10, name: 'Press', css: `.fx-10 { overflow: visible; box-shadow: 0 4px 0 0 color-mix(in srgb, var(--bink) 40%, transparent); }
.fx-10::before { display: none; }
.fx-10:hover { transform: translateY(3px); box-shadow: 0 1px 0 0 color-mix(in srgb, var(--bink) 40%, transparent); }` },
  { id: 11, name: 'Scale Up', css: `.fx-11 { overflow: visible; }
.fx-11::before { display: none; }
.fx-11:hover { transform: scale(1.12); }` },
  { id: 12, name: 'Scale Down', css: `.fx-12 { overflow: visible; }
.fx-12::before { display: none; }
.fx-12:hover { transform: scale(0.9); opacity: 0.85; }` },
  { id: 13, name: 'Shadow Grow', css: `.fx-13 { overflow: visible; }
.fx-13::before { display: none; }
.fx-13:hover { box-shadow: 0 12px 24px -8px color-mix(in srgb, var(--bink) 45%, transparent); transform: translateY(-2px); }` },
  { id: 14, name: 'Glow', css: `.fx-14 { overflow: visible; }
.fx-14::before { display: none; }
.fx-14:hover { box-shadow: 0 0 0 4px color-mix(in srgb, var(--primary) 60%, transparent), 0 0 18px color-mix(in srgb, var(--primary) 70%, transparent); border-color: var(--primary); }` },
  { id: 15, name: 'Border Draw', css: `.fx-15 { overflow: visible; border-color: transparent; box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--bink) 25%, transparent); }
.fx-15::before { display: none; }
.fx-15::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit;
  border: 2px solid var(--bink); clip-path: inset(0 100% 0 0);
  transition: clip-path 0.45s ease;
}
.fx-15:hover::after { clip-path: inset(0 0 0 0); }` },
  { id: 16, name: 'Outline Pop', css: `.fx-16 { overflow: visible; }
.fx-16::before { display: none; }
.fx-16:hover { outline: 2px solid var(--bink); outline-offset: 4px; }` },
  { id: 17, name: 'Underline', css: `.fx-17 { border: none; padding: 13px 6px; border-radius: 0; }
.fx-17::before { top: auto; bottom: 0; height: 2px; transform: scaleX(0); transform-origin: left; }
.fx-17:hover::before { transform: scaleX(1); }` },
  { id: 18, name: 'Under Center', css: `.fx-18 { border: none; padding: 13px 6px; border-radius: 0; }
.fx-18::before { top: auto; bottom: 0; height: 2px; transform: scaleX(0); transform-origin: center; }
.fx-18:hover::before { transform: scaleX(1); }` },
  { id: 19, name: 'Bracketed', css: `.fx-19 { border: none; padding: 13px 10px; border-radius: 0; }
.fx-19::before { top: 0; bottom: auto; height: 2px; transform: scaleX(0); transform-origin: right; }
.fx-19::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 2px;
  background: var(--bink); transform: scaleX(0); transform-origin: left;
  transition: transform 0.4s ease;
}
.fx-19:hover::before, .fx-19:hover::after { transform: scaleX(1); }` },
  { id: 20, name: 'Ink Swap', css: `.fx-20::before { display: none; }
.fx-20:hover { background: var(--bink); color: var(--bsurf); }` },
  { id: 21, name: 'Spaced Out', css: `.fx-21::before { display: none; }
.fx-21:hover { letter-spacing: 0.3em; padding-left: 30px; }` },
  { id: 22, name: 'Bold Shift', css: `.fx-22::before { display: none; }
.fx-22:hover .btn-label { font-weight: 600; transform: scale(1.04); }
.fx-22:hover { background: color-mix(in srgb, var(--primary) 18%, var(--bsurf)); }` },
  { id: 23, name: 'Skew', css: `.fx-23 { overflow: visible; }
.fx-23::before { display: none; }
.fx-23:hover { transform: skewX(-10deg); background: var(--bink); color: var(--bsurf); }` },
  { id: 24, name: 'Tilt', css: `.fx-24 { overflow: visible; }
.fx-24::before { display: none; }
.fx-24:hover { transform: rotate(-3deg) scale(1.05); }` },
  { id: 25, name: 'Sheen', css: `.fx-25 { overflow: visible; transform-style: preserve-3d; }
.fx-25::before { display: none; }
.fx-25:hover { transform: perspective(400px) rotateX(14deg); box-shadow: 0 10px 16px -10px color-mix(in srgb, var(--bink) 50%, transparent); }` },
  { id: 26, name: 'Gradient Slide', css: `.fx-26 {
  background: linear-gradient(90deg, var(--bink) 0 50%, var(--bsurf) 50% 100%);
  background-size: 200% 100%; background-position: 100% 0;
  transition: background-position 0.45s ease, color 0.45s ease;
}
.fx-26::before { display: none; }
.fx-26:hover { background-position: 0 0; color: var(--bsurf); }` },
  { id: 27, name: 'Conic Spin', css: `.fx-27 {
  background: conic-gradient(from 0deg, var(--bink), color-mix(in srgb, var(--primary) 80%, var(--bink)), var(--bink));
  background-size: 200% 200%; background-position: 0 0; color: var(--bsurf); border-color: transparent;
  transition: background-position 0.6s ease, transform 0.4s ease;
}
.fx-27::before { display: none; }
.fx-27:hover { background-position: 100% 100%; transform: scale(1.04); }` },
  { id: 28, name: 'Stripe Slide', css: `.fx-28 {
  background-image: repeating-linear-gradient(45deg, color-mix(in srgb, var(--bink) 15%, transparent) 0 8px, transparent 8px 16px);
  background-size: 200% 100%; background-position: 0 0;
  transition: background-position 0.6s linear, background-color 0.4s ease;
}
.fx-28::before { display: none; }
.fx-28:hover { background-position: 32px 0; background-color: color-mix(in srgb, var(--primary) 20%, var(--bsurf)); }` },
  { id: 29, name: 'Shine Sweep', css: `.fx-29::before { display: none; }
.fx-29::after {
  content: ""; position: absolute; z-index: 1; top: 0; bottom: 0; width: 40%;
  left: -60%; transform: skewX(-20deg);
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--bink) 25%, transparent), transparent);
  transition: left 0.6s ease;
}
.fx-29:hover::after { left: 120%; }` },
  { id: 30, name: 'Ripple', css: `.fx-30::before { border-radius: 50%; transform: scale(0); transform-origin: center; opacity: 0.5; }
.fx-30:hover::before { transform: scale(2.4); opacity: 0; transition: transform 0.6s ease, opacity 0.6s ease; }` },
  { id: 31, name: 'Invert', css: `.fx-31 { background: var(--bink); color: var(--bsurf); }
.fx-31::before { display: none; }
.fx-31:hover { background: var(--bsurf); color: var(--bink); }` },
  { id: 32, name: 'Swap Out', css: `.fx-32::before { display: none; }
.fx-32:hover { background: var(--primary); border-color: var(--primary); color: var(--secondary); }` },
  { id: 33, name: 'Corners', css: `.fx-33 { overflow: visible; border-color: color-mix(in srgb, var(--bink) 25%, transparent); }
.fx-33::before { display: none; }
.fx-33::after {
  content: ""; position: absolute; inset: -4px; pointer-events: none;
  border: 2px solid var(--bink);
  clip-path: polygon(0 0, 22% 0, 22% 2px, 2px 2px, 2px 22%, 0 22%, 0 100%, 22% 100%, 22% calc(100% - 2px), 2px calc(100% - 2px), 2px 78%, 0 78%);
  opacity: 0; transition: opacity 0.3s ease, inset 0.3s ease;
}
.fx-33:hover::after { opacity: 1; inset: -6px; }` },
  { id: 34, name: 'Arrow Push', css: `.fx-34::before { display: none; }
.fx-34 .btn-label::after { content: " \\2192"; display: inline-block; transition: transform 0.3s ease; }
.fx-34:hover .btn-label::after { transform: translateX(5px); }
.fx-34:hover { padding-right: 30px; background: color-mix(in srgb, var(--primary) 16%, var(--bsurf)); }` },
  { id: 35, name: 'Icon Push', css: `.fx-35::before { display: none; }
.fx-35 .btn-label::before { content: "+ "; transition: transform 0.3s ease; display: inline-block; }
.fx-35:hover .btn-label::before { transform: rotate(90deg); }` },
  { id: 36, name: 'Double Edge', css: `.fx-36 { overflow: visible; }
.fx-36::before { display: none; }
.fx-36:hover { box-shadow: 0 0 0 1px var(--bsurf), 0 0 0 3px var(--bink); }` },
  { id: 37, name: 'Dash Solid', css: `.fx-37 { border-style: dashed; }
.fx-37::before { display: none; }
.fx-37:hover { border-style: solid; background: color-mix(in srgb, var(--bink) 8%, var(--bsurf)); letter-spacing: 0.12em; }` },
  { id: 38, name: 'De-Round', css: `.fx-38 { border-radius: 9999px; }
.fx-38::before { display: none; }
.fx-38:hover { border-radius: 2px; background: var(--bink); color: var(--bsurf); }` },
  { id: 39, name: 'To Pill', css: `.fx-39::before { display: none; }
.fx-39:hover { border-radius: 9999px; padding-inline: 32px; }` },
  { id: 40, name: 'Pulse', css: `.fx-40 { overflow: visible; }
.fx-40::before { display: none; }
.fx-40:hover { animation: btn-pulse 0.9s ease-in-out infinite; }
@keyframes btn-pulse {
  0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--bink) 40%, transparent); }
  50% { box-shadow: 0 0 0 8px transparent; }
}` },
  { id: 41, name: 'Wobble', css: `.fx-41 { overflow: visible; }
.fx-41::before { display: none; }
.fx-41:hover { animation: btn-wobble 0.6s ease-in-out; }
@keyframes btn-wobble {
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(-4deg); }
  75% { transform: rotate(4deg); }
}` },
  { id: 42, name: 'Bounce', css: `.fx-42 { overflow: visible; }
.fx-42::before { display: none; }
.fx-42:hover { animation: btn-bounce 0.6s ease infinite; }
@keyframes btn-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}` },
  { id: 43, name: 'Jelly', css: `.fx-43 { overflow: visible; }
.fx-43::before { display: none; }
.fx-43:hover { animation: btn-jelly 0.6s ease; }
@keyframes btn-jelly {
  0%, 100% { transform: scale(1, 1); }
  30% { transform: scale(1.15, 0.85); }
  50% { transform: scale(0.9, 1.1); }
  70% { transform: scale(1.05, 0.95); }
}` },
  { id: 44, name: 'Shake', css: `.fx-44 { overflow: visible; }
.fx-44::before { display: none; }
.fx-44:hover { animation: btn-shake 0.4s linear infinite; }
@keyframes btn-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  75% { transform: translateX(3px); }
}` },
  { id: 45, name: 'Spread', css: `.fx-45::before { display: none; }
.fx-45:hover { letter-spacing: 0.4em; background: var(--bink); color: var(--bsurf); padding-left: 34px; }` },
  { id: 46, name: 'Split Half', css: `.fx-46::before { inset: 0 50% 0 0; transform: translateX(-100%); }
.fx-46::after {
  content: ""; position: absolute; z-index: 1; inset: 0 0 0 50%;
  background: var(--bink); transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.fx-46:hover::before, .fx-46:hover::after { transform: translateX(0); }
.fx-46:hover .btn-label { color: var(--bsurf); }` },
  { id: 47, name: 'Neon Flicker', css: `.fx-47 { overflow: visible; }
.fx-47::before { display: none; }
.fx-47:hover { color: var(--primary); border-color: var(--primary); text-shadow: 0 0 6px var(--primary), 0 0 12px color-mix(in srgb, var(--primary) 60%, transparent); animation: btn-flicker 1.4s linear infinite; }
@keyframes btn-flicker {
  0%, 100% { opacity: 1; }
  47% { opacity: 1; }
  48% { opacity: 0.6; }
  49% { opacity: 1; }
  72% { opacity: 0.7; }
  73% { opacity: 1; }
}` },
  { id: 48, name: 'Glitch', css: `.fx-48 { overflow: visible; }
.fx-48::before { display: none; }
.fx-48:hover .btn-label { animation: btn-glitch 0.4s steps(2) infinite; }
@keyframes btn-glitch {
  0% { transform: translate(0); text-shadow: none; }
  25% { transform: translate(-2px, 1px); text-shadow: 2px 0 color-mix(in srgb, var(--primary) 80%, transparent); }
  50% { transform: translate(2px, -1px); text-shadow: -2px 0 color-mix(in srgb, var(--bink) 60%, transparent); }
  75% { transform: translate(-1px, -1px); }
}` },
  { id: 49, name: 'Size Grow', css: `.fx-49 {
  background: radial-gradient(circle at center, var(--bink) 0 0) no-repeat center / 0 0;
  transition: background-size 0.45s ease, color 0.45s ease;
}
.fx-49::before { display: none; }
.fx-49:hover { background-size: 250% 250%; color: var(--bsurf); }` },
  { id: 50, name: 'Clip Reveal', css: `.fx-50::before { clip-path: inset(0 0 0 50%); transform: none; opacity: 0; }
.fx-50:hover::before { clip-path: inset(0 0 0 0); opacity: 1; }
.fx-50:hover .btn-label { color: var(--bsurf); }` },
  { id: 51, name: 'Left Bar', css: `.fx-51::before { right: auto; width: 4px; }
.fx-51:hover::before { width: 100%; }
.fx-51:hover .btn-label { color: var(--bsurf); }` },
  { id: 52, name: 'Base Bar', css: `.fx-52::before { top: auto; height: 3px; }
.fx-52:hover::before { height: 100%; }
.fx-52:hover .btn-label { color: var(--bsurf); }` },
  { id: 53, name: 'Dotted', css: `.fx-53 {
  background-image: radial-gradient(color-mix(in srgb, var(--bink) 35%, transparent) 1.5px, transparent 1.6px);
  background-size: 10px 10px; background-position: 0 0;
  transition: background-position 0.5s ease, background-color 0.4s ease;
}
.fx-53::before { display: none; }
.fx-53:hover { background-position: 10px 10px; background-color: color-mix(in srgb, var(--primary) 14%, var(--bsurf)); }` },
  { id: 54, name: 'Inset Fill', css: `.fx-54::before { display: none; }
.fx-54:hover { box-shadow: inset 0 0 0 40px var(--bink); color: var(--bsurf); }` },
  { id: 55, name: 'Emboss', css: `.fx-55::before { display: none; }
.fx-55:hover { box-shadow: inset 2px 2px 4px color-mix(in srgb, var(--bink) 35%, transparent), inset -2px -2px 4px var(--bsurf); background: color-mix(in srgb, var(--bink) 6%, var(--bsurf)); }` },
  { id: 56, name: 'Sweep Diag', css: `.fx-56::before { transform: translate(-100%, 100%); }
.fx-56:hover::before { transform: translate(0, 0); }
.fx-56:hover .btn-label { color: var(--bsurf); }` },
  { id: 57, name: 'Fold', css: `.fx-57 { overflow: visible; transform-style: preserve-3d; }
.fx-57::before { display: none; }
.fx-57:hover { transform: perspective(300px) rotateY(18deg); box-shadow: -8px 0 14px -8px color-mix(in srgb, var(--bink) 50%, transparent); }` },
  { id: 58, name: 'Hard Shadow', css: `.fx-58 { overflow: visible; }
.fx-58::before { display: none; }
.fx-58:hover { box-shadow: 6px 6px 0 0 var(--bink); transform: translate(-3px, -3px); }` },
  { id: 59, name: 'Brutalist', css: `.fx-59 { overflow: visible; box-shadow: 4px 4px 0 0 var(--bink); background: var(--primary); border-color: var(--secondary); color: var(--secondary); }
.fx-59::before { display: none; }
.fx-59:hover { box-shadow: 0 0 0 0 var(--bink); transform: translate(4px, 4px); }` },
  { id: 60, name: 'Shadow Slide', css: `.fx-60 { overflow: visible; }
.fx-60::before { display: none; }
.fx-60:hover { box-shadow: -6px 6px 0 0 color-mix(in srgb, var(--primary) 90%, var(--bink)); transform: translate(3px, -3px); }` },
  { id: 61, name: 'Color Cycle', css: `.fx-61::before { display: none; }
.fx-61:hover { animation: btn-hue 2s linear infinite; border-color: currentColor; }
@keyframes btn-hue {
  from { color: var(--bink); }
  50% { color: color-mix(in srgb, var(--primary) 90%, var(--bink)); }
  to { color: var(--bink); }
}` },
  { id: 62, name: 'Outline Grow', css: `.fx-62 { overflow: visible; }
.fx-62::before { display: none; }
.fx-62:hover { box-shadow: 0 0 0 6px color-mix(in srgb, var(--bink) 14%, transparent); }` },
  { id: 63, name: 'Ring Pulse', css: `.fx-63 { overflow: visible; border-radius: 9999px; }
.fx-63::before { display: none; }
.fx-63::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit;
  border: 2px solid var(--bink); opacity: 0; transition: none;
}
.fx-63:hover::after { animation: btn-ring 1.2s ease-out infinite; }
@keyframes btn-ring {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(1.4); opacity: 0; }
}` },
  { id: 64, name: 'Under Right', css: `.fx-64 { border: none; padding: 13px 6px; border-radius: 0; }
.fx-64::before { top: auto; bottom: 0; height: 2px; transform: scaleX(0); transform-origin: right; }
.fx-64:hover::before { transform: scaleX(1); }` },
  { id: 65, name: 'Skew Wipe', css: `.fx-65::before { transform: translateX(-110%) skewX(-20deg); width: 130%; left: -15%; }
.fx-65:hover::before { transform: translateX(0) skewX(-20deg); }
.fx-65:hover .btn-label { color: var(--bsurf); }` },
  { id: 66, name: 'Gooey', css: `.fx-66 { overflow: visible; }
.fx-66::before { display: none; }
.fx-66:hover { border-radius: 40% 60% 55% 45% / 55% 45% 55% 45%; background: var(--bink); color: var(--bsurf); }` },
  { id: 67, name: 'Marker', css: `.fx-67 { border: none; border-radius: 0; }
.fx-67::before { top: auto; bottom: 0; height: 40%; background: color-mix(in srgb, var(--primary) 80%, transparent); transform: scaleX(0); transform-origin: left; }
.fx-67:hover::before { transform: scaleX(1); height: 80%; }` },
  { id: 68, name: 'Highlight', css: `.fx-68 { border: none; border-radius: 0; }
.fx-68::before { transform: scaleY(0); transform-origin: bottom; background: color-mix(in srgb, var(--primary) 85%, transparent); }
.fx-68:hover::before { transform: scaleY(1); }` },
  { id: 69, name: 'Pad Grow', css: `.fx-69::before { display: none; }
.fx-69:hover { padding: 16px 36px; background: color-mix(in srgb, var(--bink) 10%, var(--bsurf)); }` },
  { id: 70, name: 'Label Swap', css: `.fx-70 { overflow: hidden; }
.fx-70::before { display: none; }
.fx-70 .btn-label { transition: transform 0.35s ease; }
.fx-70:hover .btn-label { transform: translateY(-3px); }
.fx-70:hover { background: var(--bink); color: var(--bsurf); }` },
  { id: 71, name: 'Hover Lift', css: `.fx-71 { overflow: visible; }
.fx-71::before { display: none; }
.fx-71:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 10px 20px -10px color-mix(in srgb, var(--bink) 60%, transparent); letter-spacing: 0.12em; }` },
  { id: 72, name: 'Frost', css: `.fx-72 { background: color-mix(in srgb, var(--bink) 8%, transparent); }
.fx-72::before { display: none; }
.fx-72:hover { background: color-mix(in srgb, var(--bink) 20%, transparent); backdrop-filter: blur(4px); border-color: color-mix(in srgb, var(--bink) 50%, transparent); }` },
  { id: 73, name: 'Sheen Bar', css: `.fx-73 { border: none; border-radius: 0; background: color-mix(in srgb, var(--bink) 6%, var(--bsurf)); }
.fx-73::before { top: auto; bottom: 0; height: 100%; opacity: 0.12; transform: translateX(-100%); }
.fx-73:hover::before { transform: translateX(0); opacity: 0.16; }` },
  { id: 74, name: 'Border Hue', css: `.fx-74 { overflow: visible; border: 2px solid; border-image: linear-gradient(90deg, var(--bink), var(--bink)) 1; }
.fx-74::before { display: none; }
.fx-74:hover { border-image: linear-gradient(90deg, var(--primary), color-mix(in srgb, var(--primary) 50%, var(--bink))) 1; }` },
  { id: 75, name: 'Dot Under', css: `.fx-75 { border: none; border-radius: 0; }
.fx-75::before {
  top: auto; bottom: 2px; height: 3px; background: none;
  background-image: radial-gradient(var(--bink) 40%, transparent 45%); background-size: 6px 3px;
  transform: scaleX(0); transform-origin: left;
}
.fx-75:hover::before { transform: scaleX(1); }` },
  { id: 76, name: 'Spin Scale', css: `.fx-76 { overflow: visible; }
.fx-76::before { display: none; }
.fx-76:hover { transform: rotate(360deg) scale(1.08); transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1); }` },
  { id: 77, name: 'Drift', css: `.fx-77 {
  background: linear-gradient(120deg, color-mix(in srgb, var(--bink) 10%, var(--bsurf)), color-mix(in srgb, var(--primary) 30%, var(--bsurf)), color-mix(in srgb, var(--bink) 10%, var(--bsurf)));
  background-size: 200% 100%; background-position: 0 0;
  transition: background-position 0.8s ease;
}
.fx-77::before { display: none; }
.fx-77:hover { background-position: 100% 0; }` },
  { id: 78, name: 'Corner Cut', css: `.fx-78 { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); transition: clip-path 0.4s ease, background 0.4s ease; }
.fx-78::before { display: none; }
.fx-78:hover { clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px); background: var(--bink); color: var(--bsurf); }` },
  { id: 79, name: 'Arrow Ring', css: `.fx-79 { overflow: visible; border-radius: 9999px; }
.fx-79::before { display: none; }
.fx-79 .btn-label::after { content: " \\2197"; display: inline-block; transition: transform 0.3s ease; }
.fx-79:hover { background: var(--bink); color: var(--bsurf); }
.fx-79:hover .btn-label::after { transform: translate(3px, -3px); }` },
  { id: 80, name: 'Plus Turn', css: `.fx-80::before { display: none; }
.fx-80:hover { transform: rotate(90deg); background: var(--bink); color: var(--bsurf); border-radius: 16px; }` },
  { id: 81, name: 'Corner Fill', css: `.fx-81::before { width: 12px; height: 12px; inset: auto auto 0 0; border-radius: 0 100% 0 0; }
.fx-81:hover::before { width: 220%; height: 220%; border-radius: 0; }
.fx-81:hover .btn-label { color: var(--bsurf); }` },
  { id: 82, name: 'Ink Spread', css: `.fx-82::before {
  background: radial-gradient(circle, var(--bink) 0 0); inset: 0;
  transform: scale(0); transform-origin: center; border-radius: 50%;
}
.fx-82:hover::before { transform: scale(2); transition: transform 0.5s ease; }
.fx-82:hover .btn-label { color: var(--bsurf); transition-delay: 0.1s; }` },
  { id: 83, name: 'Rise Reveal', css: `.fx-83 { overflow: hidden; }
.fx-83::before { display: none; }
.fx-83 .btn-label { transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
.fx-83:hover .btn-label { transform: translateY(-3px); }
.fx-83:hover { background: var(--bink); color: var(--bsurf); }` },
  { id: 84, name: 'Wave', css: `.fx-84::before { top: auto; height: 100%; border-radius: 45% 45% 0 0 / 12px; transform: translateY(100%); }
.fx-84:hover::before { transform: translateY(0); }
.fx-84:hover .btn-label { color: var(--bsurf); }` },
  { id: 85, name: 'Pop Color', css: `.fx-85 { overflow: visible; }
.fx-85::before { display: none; }
.fx-85:hover { background: var(--primary); border-color: var(--primary); color: var(--secondary); transform: translateY(-3px); box-shadow: 0 8px 18px -8px color-mix(in srgb, var(--primary) 80%, transparent); }` },
  { id: 86, name: 'Retro 3D', css: `.fx-86 { overflow: visible; }
.fx-86::before { display: none; }
.fx-86:hover { text-shadow: 1px 1px 0 color-mix(in srgb, var(--bink) 60%, transparent), 2px 2px 0 color-mix(in srgb, var(--bink) 40%, transparent), 3px 3px 0 color-mix(in srgb, var(--bink) 20%, transparent); transform: translate(-2px, -2px); }` },
  { id: 87, name: 'Long Shadow', css: `.fx-87 { overflow: visible; }
.fx-87::before { display: none; }
.fx-87:hover { box-shadow: 3px 3px 0 color-mix(in srgb, var(--bink) 55%, transparent), 6px 6px 0 color-mix(in srgb, var(--bink) 35%, transparent), 9px 9px 0 color-mix(in srgb, var(--bink) 15%, transparent); }` },
  { id: 88, name: 'Thick Line', css: `.fx-88 { border: none; border-bottom: 2px solid color-mix(in srgb, var(--bink) 30%, transparent); border-radius: 0; }
.fx-88::before { top: auto; bottom: 0; height: 2px; transform: scaleX(0); transform-origin: left; }
.fx-88:hover::before { transform: scaleX(1); height: 5px; }` },
  { id: 89, name: 'Edge Up', css: `.fx-89 { border: none; border-bottom: 3px solid var(--bink); border-radius: 0; }
.fx-89::before { display: none; }
.fx-89:hover { background: color-mix(in srgb, var(--bink) 10%, var(--bsurf)); transform: translateY(-3px); box-shadow: 0 4px 0 -1px color-mix(in srgb, var(--bink) 40%, transparent); }` },
  { id: 90, name: 'Widen', css: `.fx-90::before { display: none; }
.fx-90:hover { padding-inline: 40px; background: var(--bink); color: var(--bsurf); }` },
  { id: 91, name: 'Squeeze', css: `.fx-91::before { display: none; }
.fx-91:hover { padding-inline: 12px; letter-spacing: 0.02em; background: var(--bink); color: var(--bsurf); }` },
  { id: 92, name: 'Tilt Shine', css: `.fx-92 { overflow: hidden; }
.fx-92::before { display: none; }
.fx-92::after {
  content: ""; position: absolute; z-index: 1; inset: 0;
  background: linear-gradient(120deg, transparent 30%, color-mix(in srgb, var(--primary) 40%, transparent) 50%, transparent 70%);
  background-size: 250% 100%; background-position: 100% 0;
  transition: background-position 0.6s ease;
}
.fx-92:hover::after { background-position: 0 0; }` },
  { id: 93, name: 'Spotlight', css: `.fx-93 {
  background: radial-gradient(120px circle at 50% 120%, color-mix(in srgb, var(--primary) 45%, transparent), transparent 60%);
  transition: background 0.4s ease;
}
.fx-93::before { display: none; }
.fx-93:hover { background: radial-gradient(160px circle at 50% 50%, color-mix(in srgb, var(--primary) 55%, transparent), transparent 70%); }` },
  { id: 94, name: 'Neon Edge', css: `.fx-94 { overflow: visible; }
.fx-94::before { display: none; }
.fx-94:hover { border-color: var(--primary); box-shadow: 0 0 0 1px var(--primary), 0 0 10px color-mix(in srgb, var(--primary) 70%, transparent), inset 0 0 8px color-mix(in srgb, var(--primary) 40%, transparent); }` },
  { id: 95, name: 'Glass', css: `.fx-95 { background: color-mix(in srgb, var(--bink) 5%, transparent); border-color: color-mix(in srgb, var(--bink) 30%, transparent); }
.fx-95::before { display: none; }
.fx-95:hover { background: color-mix(in srgb, var(--bink) 14%, transparent); backdrop-filter: blur(6px); box-shadow: inset 0 1px 0 var(--bsurf), 0 6px 16px -8px color-mix(in srgb, var(--bink) 40%, transparent); }` },
  { id: 96, name: 'Hue Text', css: `.fx-96::before { display: none; }
.fx-96:hover .btn-label {
  background: linear-gradient(90deg, var(--bink), color-mix(in srgb, var(--primary) 80%, var(--bink)));
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.fx-96:hover { border-color: color-mix(in srgb, var(--primary) 60%, var(--bink)); }` },
  { id: 97, name: 'Pill Grow', css: `.fx-97 { border-radius: 9999px; }
.fx-97::before { border-radius: inherit; transform: scale(0); transform-origin: center; }
.fx-97:hover::before { transform: scale(1.05); }
.fx-97:hover .btn-label { color: var(--bsurf); }` },
  { id: 98, name: 'Dash Spin', css: `.fx-98 { overflow: visible; border: 2px dashed var(--bink); }
.fx-98::before { display: none; }
.fx-98:hover { animation: btn-dash 4s linear infinite; background: color-mix(in srgb, var(--bink) 8%, var(--bsurf)); }
@keyframes btn-dash { to { transform: rotate(360deg); } }` },
  { id: 99, name: 'Sparkle', css: `.fx-99 { overflow: visible; }
.fx-99::before { display: none; }
.fx-99 .btn-label::after { content: " \\2726"; display: inline-block; opacity: 0; transition: opacity 0.3s ease, transform 0.3s ease; }
.fx-99:hover .btn-label::after { opacity: 1; transform: scale(1.3) rotate(20deg); }
.fx-99:hover { background: color-mix(in srgb, var(--primary) 18%, var(--bsurf)); box-shadow: 0 0 12px -4px color-mix(in srgb, var(--primary) 70%, transparent); }` },
];

export const MOTION_GUARD = `@media (prefers-reduced-motion: reduce) {
  .btn, .btn *, .btn::before, .btn::after,
  .btn *::before, .btn *::after {
    animation: none !important;
    transition-duration: 0.01ms !important;
    transition-delay: 0ms !important;
    scroll-behavior: auto !important;
  }
}`;

export const FOCUS_CSS = `.btn:focus-visible {
  outline: 2px solid var(--bink);
  outline-offset: 5px;
}
.btn:disabled { cursor: not-allowed; opacity: 0.5; }
.btn:disabled::before, .btn:disabled::after { animation: none !important; }`;

// Explicit IDs keep classes and exports stable when the gallery order changes.
export const effects = rawEffects.map((effect) => ({
  ...effect,
  css: effect.css.replaceAll(':hover', ':is(:hover, :focus-visible, [data-preview])'),
}));

export type ButtonEffect = (typeof effects)[number];
export function getEffect(id: number): ButtonEffect {
  const effect = effects.find((item) => item.id === id);
  if (!effect) throw new Error(`Unknown button effect: ${id}`);
  return effect;
}

export const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (char) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);

export function getMarkup(id: number, label = getEffect(id).name) {
  return `<button\n  class="btn fx-${id}"\n  type="button"\n  aria-label="${escapeHtml(label)}"\n>\n  <span class="btn-label">${escapeHtml(label)}</span>\n</button>`;
}

export function getCss(ids: number[]) {
  return [BTN_BASE, ...ids.map((id) => getEffect(id).css), FOCUS_CSS, MOTION_GUARD].join('\n\n');
}

export function getReact(id: number) {
  return `import './button.css';\n\nexport function AnimatedButton({ children = '${getEffect(id).name}', ...props }) {\n  return (\n    <button type="button" aria-label={typeof children === 'string' ? children : undefined} {...props} className="btn fx-${id}">\n      <span className="btn-label">{children}</span>\n    </button>\n  );\n}`;
}

export const liveCss = getCss(effects.map((effect) => effect.id));
export const snippets: Record<string, string> = {};
export const prompts: Record<string, string> = {};
for (const effect of effects) {
  const markup = getMarkup(effect.id);
  const css = getCss([effect.id]);
  snippets[String(effect.id)] = `/* HTML: ${markup} */\n\n${css}`;
  prompts[String(effect.id)] = `Create this ${effect.name} button with HTML and CSS.\n\nHTML:\n${markup}\n\nCSS:\n${css}\n\nKeep the theme variables, keyboard focus states, button type, and reduced-motion rules. Use no JavaScript for the effect. Do not add external dependencies.`;
}
