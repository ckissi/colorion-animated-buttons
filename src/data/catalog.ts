import { effects, getEffect } from './buttons';

export const SITE = 'https://animatedbuttons.colorion.co';

export interface Collection {
  slug: string;
  name: string;
  title: string;
  summary: string;
  intro: string;
  advice: { title: string; text: string }[];
  ids: number[];
  guide: string;
}

export const collections: Collection[] = [
  {
    slug: 'glow-buttons', name: 'Glow & neon', title: 'CSS glow and neon buttons',
    summary: 'Soft halos, bright borders, and light effects. Compare the glow before you copy the code.',
    intro: 'A glow changes the light around a button without changing its dimensions. These examples use box-shadow, text-shadow, and layered backgrounds. Try a steady border for an everyday action, or a short light effect for a more expressive interface.',
    advice: [
      { title: 'Choose the light source', text: 'Glow lights the outside of a button. Neon Edge also adds an inset shadow. Neon Flicker animates the label and border, so it needs more restraint.' },
      { title: 'Keep the label readable', text: 'A halo does not replace contrast. Check the label against the actual button surface, both before and during the effect.' },
      { title: 'Avoid competing signals', text: 'Use one emphasized action in a group. Repeated glows and flickers can make every button look equally urgent.' },
    ],
    ids: [14, 40, 47, 63, 85, 93, 94, 99], guide: 'accessible-button-animations',
  },
  {
    slug: 'fill-buttons', name: 'Sliding fills', title: 'CSS button fill animations',
    summary: 'Sliding panels, radial reveals, and split fills with complete HTML and CSS.',
    intro: 'Fill effects place a colored layer behind the button label. Translate a panel for a directional sweep, scale a circle for a radial reveal, or combine two panels for a split fill. The label stays above the moving layer.',
    advice: [
      { title: 'Start with a sliding panel', text: 'The four directional fills share the same markup. Change the initial transform to choose the direction without adding more HTML.' },
      { title: 'Match the surface and label', text: 'Set --bink for the fill and --bsurf for the contrasting hover label. Check both colors when you adapt the button to a new theme.' },
      { title: 'Choose transforms first', text: 'Translate and scale do not change the layout box. Effects that animate dimensions or background size need a separate performance check.' },
    ],
    ids: [1, 2, 3, 4, 5, 6, 7, 8, 20, 26, 28, 30, 31, 32, 46, 49, 50, 51, 52, 54, 56, 65, 73, 81, 82, 84], guide: 'css-button-hover-effects',
  },
  {
    slug: 'border-buttons', name: 'Borders & outlines', title: 'CSS button border animations',
    summary: 'Draw a border, extend its corners, or expand an outline without adding a wrapper.',
    intro: 'Borders can signal interaction while leaving the button surface quiet. These effects use outlines, clipped overlays, and pseudo-elements. Compare the space each one needs outside the button before you use it in a dense toolbar.',
    advice: [
      { title: 'Leave room for the outline', text: 'An outline can extend past the layout box. Keep enough space between neighboring controls, and check parents that use overflow: hidden.' },
      { title: 'Understand the overlay', text: 'Border Draw reveals a second border with clip-path. Corners reveals a clipped frame outside the button. Neither approach needs extra elements in the button.' },
      { title: 'Keep focus distinct', text: 'The animation is decoration. Retain a visible keyboard focus outline even when the decorative border also changes.' },
    ],
    ids: [15, 16, 33, 36, 37, 53, 62, 74, 78, 88, 89, 98], guide: 'css-button-hover-effects',
  },
  {
    slug: '3d-shadow-buttons', name: 'Depth & shadows', title: 'CSS 3D and shadow buttons',
    summary: 'Raised surfaces, pressed edges, and offset shadows for buttons with visible depth.',
    intro: 'These buttons suggest depth with transforms, shadows, and perspective. A press effect moves toward its shadow. A lift moves away from the surface. Use the direction to reinforce what the action does, and keep the surrounding layout stable.',
    advice: [
      { title: 'Separate hover from press', text: 'A hover preview is not a completed action. Reserve :active for the short pressed state, and use application state for success or failure.' },
      { title: 'Choose hard or soft edges', text: 'Hard Shadow and Brutalist use solid offset edges. Lift and Shadow Grow use softer shadows that suit a less graphic interface.' },
      { title: 'Check nearby controls', text: 'Shadows and tilted surfaces extend outside the original rectangle. Test the effect in a real row of buttons, not only in an isolated preview.' },
    ],
    ids: [9, 10, 13, 25, 55, 57, 58, 59, 60, 71, 86, 87], guide: 'customize-css-buttons',
  },
  {
    slug: 'text-icon-buttons', name: 'Text & arrows', title: 'CSS text and arrow button effects',
    summary: 'Moving arrows, growing underlines, and label highlights for lighter button treatments.',
    intro: 'Text effects keep the button frame simple and put movement near the label. Use a small arrow translation to suggest direction, an underline for a text-like action, or a highlight when the label needs emphasis without a filled surface.',
    advice: [
      { title: 'Keep the accessible name stable', text: 'Decorative arrows should not replace the action label. Use an accessible text label and hide any extra decorative icon when appropriate.' },
      { title: 'Allow for longer labels', text: 'Test translated icons with real text and translated content. A fixed-width button can clip a label that fits in the original demo.' },
      { title: 'Use the right element', text: 'Use a button for an action and an anchor for navigation. The visual treatment does not change the element’s purpose.' },
    ],
    ids: [17, 18, 19, 21, 22, 34, 35, 45, 64, 67, 68, 70, 75, 79, 83, 96], guide: 'accessible-button-animations',
  },
  {
    slug: 'motion-buttons', name: 'Motion & shape', title: 'CSS motion and shape button effects',
    summary: 'Bounces, tilts, shape changes, and sheen effects with reduced-motion exports.',
    intro: 'Motion can acknowledge a pointer or keyboard interaction without a JavaScript animation library. These effects range from a small scale change to a repeated shake. Choose the smallest movement that communicates the interaction, and keep a static reduced-motion version.',
    advice: [
      { title: 'Use loops sparingly', text: 'Shake, Bounce, and Glitch repeat while the control has hover or focus. For a quieter interface, change infinite to 1 or use a brief transition instead.' },
      { title: 'Protect the layout', text: 'Scale and rotation leave the layout box unchanged. Padding and letter-spacing can affect nearby content, so check those effects inside your actual layout.' },
      { title: 'Offer a static result', text: 'The exported reduced-motion rule stops keyframes and shortens transitions. A color, outline, or surface change can still communicate the interaction.' },
    ],
    ids: [11, 12, 23, 24, 27, 29, 38, 39, 41, 42, 43, 44, 48, 61, 66, 69, 72, 76, 77, 80, 90, 91, 92, 95, 97], guide: 'accessible-button-animations',
  },
];

export interface EffectPage {
  slug: string;
  name: string;
  title: string;
  summary: string;
  collection: string;
  ids: number[];
  mechanism: string[];
  customize: string[];
  limitation: string;
  related: string[];
}

export const effectPages: EffectPage[] = [
  {
    slug: 'glow', name: 'Glow button', title: 'CSS glow button: demo and HTML/CSS code', collection: 'glow-buttons', ids: [14],
    summary: 'Add a soft outer glow with layered box shadows. Copy a complete button with keyboard focus and reduced-motion styles.',
    mechanism: ['Two box-shadow layers create the effect. The first draws a narrow ring. The second adds a larger blur around the button.', 'The hover and focus rule changes the border to --primary. The base styles keep the label above the surface and preserve the button’s original dimensions.'],
    customize: ['Change --primary to set the glow color. Keep --bink as the readable foreground color.', 'Adjust the 18px blur radius for a wider halo. Reduce the mixed-color percentages for a quieter result.', 'The common transition is 0.4s. Shorten the box-shadow transition if the glow should appear more quickly.'],
    limitation: 'Animated shadows require painting. Keep the blur small, and measure performance before you apply this effect to many controls at once.',
    related: ['neon-edge', 'pulse', 'border-draw'],
  },
  {
    slug: 'neon-edge', name: 'Neon edge button', title: 'CSS neon border button: demo and code', collection: 'glow-buttons', ids: [94],
    summary: 'Combine a sharp neon border, an outer halo, and an inset glow with one button element.',
    mechanism: ['The border and a one-pixel shadow draw the sharp edge. A second shadow spreads light outside it. An inset shadow brings a little of that color onto the surface.', 'Unlike Neon Flicker in the collection, this example uses a steady glow. It does not need looping keyframes.'],
    customize: ['Set --primary to choose the neon color. Check its contrast against the surrounding page.', 'Change the 10px outer blur and 8px inset blur independently. A smaller inset shadow leaves more of the surface untouched.', 'Use a darker local --bsurf when you want a stronger light effect. Preserve a readable --bink for the label.'],
    limitation: 'The visual edge is decorative. Keep the separate focus outline, and do not rely on the glow alone to signal keyboard focus.',
    related: ['glow', 'border-draw', 'pulse'],
  },
  {
    slug: 'sliding-fill', name: 'Sliding fill button', title: 'CSS sliding fill button: four directions and code', collection: 'fill-buttons', ids: [1, 2, 3, 4],
    summary: 'Slide a colored panel into a button from any edge. Compare four directions with the same HTML structure.',
    mechanism: ['A ::before pseudo-element covers the button surface behind the label. Its initial translate moves it outside the visible area, and overflow: hidden clips it.', 'On hover or keyboard focus, the transform returns to zero. The label changes to --bsurf as the fill arrives. Up, down, left, and right variants only change the initial translation.'],
    customize: ['Choose translateY for a vertical entrance and translateX for a horizontal entrance. Positive values start below or to the right.', 'Set --bink to the fill color and --bsurf to the label color used during the fill. Check contrast in both states.', 'Change the shared transform duration and easing to control the sweep. Keep the label transition in step with the panel.'],
    limitation: 'A panel can cover the label if you remove the relative positioning or z-index from .btn-label. Keep the supplied stacking order.',
    related: ['radial-fill', 'shine-sweep', 'border-draw'],
  },
  {
    slug: 'radial-fill', name: 'Radial fill button', title: 'CSS radial fill button: expanding circle examples', collection: 'fill-buttons', ids: [8, 82],
    summary: 'Reveal a button fill from the center with an expanding circle. Compare two scale-based implementations.',
    mechanism: ['The fill starts at scale(0) on a circular ::before layer. Hover or focus expands that layer until the button clips it at its outer edge.', 'Radial scales to 1.6. Ink Spread scales to 2 and adds a short delay to the label color. Both use the same button and span markup.'],
    customize: ['Increase the final scale if a very wide button leaves empty corners. Check the result with your longest label.', 'Change transform-origin to move the starting point. Keep the initial scale at zero for a fully hidden circle.', 'Set the fill through --bink and the final label through --bsurf. Remove the label delay if your color combination needs an immediate change.'],
    limitation: 'This is a hover/focus reveal. It does not start at a pointer’s click coordinates. A pointer-position ripple requires additional event handling.',
    related: ['sliding-fill', 'glow', 'pulse'],
  },
  {
    slug: 'border-draw', name: 'Border draw button', title: 'CSS border draw button: animated outline and code', collection: 'border-buttons', ids: [15],
    summary: 'Reveal an outline from left to right with a clipped pseudo-element and no extra wrapper.',
    mechanism: ['The base border becomes transparent, while an inset shadow supplies a quiet resting edge. An absolutely positioned ::after draws the stronger border.', 'clip-path initially hides that overlay from the right. Hover or focus changes the inset to zero, revealing the full border.'],
    customize: ['Adjust the overlay’s 2px border to change its weight. Keep border-radius: inherit so it follows the button shape.', 'Change the initial inset to reveal from a different edge. Use the sliding-fill page if you want the whole surface to move.', 'Change the 0.45s clip-path transition to set the draw speed. Leave enough surrounding space for the focus outline.'],
    limitation: 'The border reveal needs clip-path support. Without that enhancement, the native button and its text remain usable, but the decorative reveal can differ.',
    related: ['corner-border', 'neon-edge', 'sliding-fill'],
  },
  {
    slug: 'corner-border', name: 'Corner border button', title: 'CSS corner border button: expanding corners and code', collection: 'border-buttons', ids: [33],
    summary: 'Reveal a clipped corner frame just outside a button with a single CSS pseudo-element.',
    mechanism: ['An absolutely positioned ::after draws a border outside the button. A polygon clip-path keeps selected corner segments visible, while opacity hides the overlay at rest.', 'Hover or focus reveals the overlay and moves its inset from -4px to -6px. The quiet base border remains in place. The ::before fill is disabled for this effect.'],
    customize: ['Edit the polygon coordinates to change the visible corner segments. Keep paired points aligned to the border thickness.', 'Set --bink for the line color. Adjust the low-opacity resting border separately if it needs more contrast.', 'Change the negative inset values to control the gap around the button. Keep enough space for the separate focus outline.'],
    limitation: 'This effect needs clip-path support and animates inset. Test rendering cost and surrounding space in a real row of controls.',
    related: ['border-draw', 'neon-edge', 'brutalist'],
  },
  {
    slug: 'shine-sweep', name: 'Shine sweep button', title: 'CSS shine button: sweeping light effect and code', collection: 'motion-buttons', ids: [29, 92],
    summary: 'Move a narrow highlight across a button. Compare a translated-looking sheen with a background-position variant.',
    mechanism: ['Shine Sweep places a skewed highlight in ::after, then changes its left position from outside one edge to outside the other.', 'Tilt Shine instead puts a large gradient on a surface-sized overlay and changes background-position. The highlight passes over the surface while the text stays above it.'],
    customize: ['Lower the mixed color opacity for a subtle sheen. A highlight should not wash out the label.', 'Change the stripe width and skew angle together. Test longer labels so the sweep clears the whole button.', 'Use a slower duration for a broad sweep, or a short duration for a brief acknowledgement. Keep it interaction-triggered.'],
    limitation: 'Both versions can require painting, and the first animates left. For a busy interface, rewrite the moving layer with transform and measure the result.',
    related: ['sliding-fill', 'glow', 'arrow-push'],
  },
  {
    slug: 'press', name: 'Press button', title: 'CSS press button: raised shadow demo and code', collection: '3d-shadow-buttons', ids: [10],
    summary: 'Move a raised button toward its shadow to create a simple press effect in pure CSS.',
    mechanism: ['A solid downward shadow makes the resting button appear raised. Hover or focus translates the surface down by three pixels and shortens the shadow.', 'The transform changes the visual position without moving neighboring elements. The effect is an interaction preview, not an application success state.'],
    customize: ['Keep the downward translation close to the reduction in shadow offset. This makes the surface appear to meet its base.', 'Use a stronger mixed --bink color for a harder edge, or reduce it for a softer depth cue.', 'If you reserve the press for activation, change the effect selector to :active and leave :focus-visible as a distinct outline.'],
    limitation: 'The button moves visually while its layout box stays in place. Leave space around it and keep its activation target large enough for touch.',
    related: ['brutalist', 'arrow-push', 'glow'],
  },
  {
    slug: 'brutalist', name: 'Brutalist shadow button', title: 'CSS brutalist button: hard shadow examples and code', collection: '3d-shadow-buttons', ids: [59, 58],
    summary: 'Build a graphic button with a solid offset shadow. Compare a filled brutalist style with a quieter hard-shadow version.',
    mechanism: ['A box-shadow with no blur creates a second hard edge. Translating the button toward that edge makes the shadow appear to collapse.', 'Brutalist starts with a strong --primary surface and a four-pixel offset. Hard Shadow uses a different resting treatment and shifts in the opposite visual direction.'],
    customize: ['Keep the shadow offset and translation coordinated. A larger shadow needs more surrounding space.', 'Set --primary for the Brutalist surface and --secondary for its text and border. Test their contrast as a pair.', 'Use the hard-shadow variant if the action should look quieter at rest. Preserve the focus outline in either version.'],
    limitation: 'A hard shadow can overlap adjacent controls. Test the complete button group at narrow widths before you reuse the isolated demo.',
    related: ['press', 'corner-border', 'arrow-push'],
  },
  {
    slug: 'arrow-push', name: 'Arrow button', title: 'CSS arrow button animation: hover and focus examples', collection: 'text-icon-buttons', ids: [34, 79],
    summary: 'Nudge a decorative arrow beside a stable button label. Compare a horizontal arrow and a diagonal pill treatment.',
    mechanism: ['An ::after pseudo-element on .btn-label draws the arrow. Only the arrow moves, so the main label stays in place.', 'Arrow Push moves horizontally. Arrow Ring uses a rounded surface and moves diagonally. Both react to keyboard focus as well as hover.'],
    customize: ['Change the arrow character if your design needs a different direction. Use the button’s aria-label to preserve a clear action name.', 'Reduce the translation for compact controls. Leave room after the text so the arrow does not clip.', 'Use an anchor with href when the action navigates. Keep type="button" when the element runs an application action.'],
    limitation: 'Generated characters can enter an accessible name. The supplied preview uses an explicit name. Recheck the name if you replace the label or icon.',
    related: ['press', 'shine-sweep', 'sliding-fill'],
  },
  {
    slug: 'pulse', name: 'Pulse button', title: 'CSS pulse button animation: shadow and ring examples', collection: 'glow-buttons', ids: [40, 63],
    summary: 'Compare a soft shadow pulse and an expanding ring. Both exports include a static reduced-motion fallback.',
    mechanism: ['Pulse animates the spread of a box-shadow while the button has hover or focus. The edge fades as it moves outward.', 'Ring Pulse uses a separate ring layer around a rounded button. Its timing and geometry differ from the shadow-based version.'],
    customize: ['Change the keyframe duration to set the rhythm. Use one iteration for a brief acknowledgement instead of an infinite pulse.', 'Adjust the ring or shadow distance to keep it clear of nearby content.', 'Keep the reduced-motion rule at the end of the stylesheet. It disables the loop without removing the button or its focus outline.'],
    limitation: 'A repeated pulse can distract from other content. Do not use animation alone to express urgency, validation, or success.',
    related: ['glow', 'neon-edge', 'glitch'],
  },
  {
    slug: 'glitch', name: 'Glitch button', title: 'CSS glitch button: stepped text animation and code', collection: 'motion-buttons', ids: [48],
    summary: 'Create a short digital glitch with stepped label transforms and offset text shadows.',
    mechanism: ['The label cycles through small translations and offset text shadows. steps(2) makes the movement jump between frames rather than interpolate smoothly.', 'The button surface stays in place while the label moves. Hover and focus start the keyframes, and the reduced-motion rule disables them.'],
    customize: ['Replace infinite with 1 to make the glitch run once. A short single cycle is easier to use in a conventional interface.', 'Reduce the translation distances and shadow offsets if the label becomes difficult to read.', 'Set --primary for the accent shadow. Keep a readable base text color when the animation is stopped.'],
    limitation: 'This effect intentionally disrupts the label. Avoid it for critical actions or dense navigation, and test it with people who use reduced motion.',
    related: ['pulse', 'shine-sweep', 'arrow-push'],
  },
];

export const getCollection = (slug: string) => {
  const collection = collections.find((item) => item.slug === slug);
  if (!collection) throw new Error(`Unknown collection: ${slug}`);
  return collection;
};
export const collectionFor = (id: number) => {
  const collection = collections.find((item) => item.ids.includes(id));
  if (!collection) throw new Error(`No collection for effect: ${id}`);
  return collection;
};
export const pageFor = (id: number) => effectPages.find((page) => page.ids.includes(id));
export const effectHref = (id: number) => {
  const page = pageFor(id);
  return page ? `/effects/${page.slug}/#effect-${id}` : `/collections/${collectionFor(id).slug}/#effect-${id}`;
};
export const featuredEffects = effectPages.map((page) => getEffect(page.ids[0]));

// Fail the build if a collection drops an example or silently includes it twice.
const ids = collections.flatMap((collection) => collection.ids);
if (ids.length !== effects.length || new Set(ids).size !== effects.length || ids.some((id) => !effects.some((effect) => effect.id === id))) {
  throw new Error('Every button must belong to exactly one primary collection.');
}
