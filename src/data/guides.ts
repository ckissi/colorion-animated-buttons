export interface GuideSection { id: string; title: string; paragraphs: string[]; code?: string; }
export interface Guide { slug: string; name: string; title: string; summary: string; intro: string; sections: GuideSection[]; effects: string[]; demoIds: number[]; references: { label: string; href: string }[]; }
export const guides: Guide[] = [
  {
    slug: 'css-button-hover-effects', name: 'How button hover effects work',
    title: 'CSS button hover effects: transitions, transforms, and examples',
    summary: 'Understand the moving layers, fix abrupt transitions, and choose an effect that fits the action.',
    intro: 'A useful hover effect connects a resting state to an interaction state. The button remains a normal HTML control. CSS changes its surface, border, or position when a pointer hovers over it or a keyboard user focuses it.',
    demoIds: [1, 15], effects: ['sliding-fill', 'border-draw', 'shine-sweep'],
    sections: [
      { id: 'resting-state', title: 'Start with a usable resting state', paragraphs: [
        'Use a button for an action, such as opening a dialog. Set type="button" unless the control should submit a form. Use an anchor with an href for navigation.',
        'Make the label readable before adding motion. A border or background should identify the control even when the user cannot hover. Put the transition on the resting rule so it runs both when interaction starts and when it ends.',
      ], code: '.example {\n  background: transparent;\n  color: #0f191e;\n  border: 1px solid currentColor;\n  transition: transform 180ms ease, background-color 180ms ease;\n}\n.example:is(:hover, :focus-visible) {\n  background: #f4ff2b;\n  transform: translateY(-2px);\n}\n.example:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; }' },
      { id: 'moving-layer', title: 'Move a layer behind the text', paragraphs: [
        'A fill animation needs a surface that can move independently of the label. The sliding-fill example uses ::before as that surface. The button supplies a positioning context and clips the panel outside its edges.',
        'The label has its own positioning and z-index. That keeps the text above the moving layer. If the panel covers your label, check those stacking rules before adding larger z-index values elsewhere.',
        'Transform moves the panel visually without changing its layout dimensions. A translate of 100% uses the moving element’s own size. Change the sign or axis to choose the entrance direction.',
      ] },
      { id: 'debugging', title: 'Fix abrupt or missing transitions', paragraphs: [
        'Check that the property has different values in the resting and interaction states. Then check whether CSS can interpolate those values. A change from display: none to display: block does not create a conventional transition.',
        'A later shorthand can replace your transition settings. Inspect the computed transition-property and transition-duration in browser developer tools. Also check overflow if the effect appears cut off.',
        'Start with transform and opacity for movement. Borders, shadows, clipping, and gradients can need painting. Measure a representative page before applying an expensive effect to many controls.',
      ] },
      { id: 'interaction', title: 'Treat hover as an enhancement', paragraphs: [
        'Touch users do not have a reliable hover state. Keep the action understandable at rest, and use application state for loading, success, or failure.',
        'Provide a visible focus indicator, and include the reduced-motion rules with the copied effect. The complete implementations below contain both. The small teaching example above only illustrates the transition mechanism.',
      ] },
    ],
    references: [{ label: 'MDN: CSS transitions', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions' }, { label: 'MDN: transform', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transform' }],
  },
  {
    slug: 'accessible-button-animations', name: 'Accessible button animations',
    title: 'Accessible CSS button animations: focus and reduced motion',
    summary: 'Keep keyboard focus visible, reduce unnecessary movement, and make the resting state work on touch screens.',
    intro: 'An animation should add feedback without becoming the only way to understand or operate a button. Build a native control first. Then test the label, focus, motion preference, and behavior on a touch screen.',
    demoIds: [40, 34], effects: ['pulse', 'arrow-push', 'glitch'],
    sections: [
      { id: 'native-controls', title: 'Use native controls and clear names', paragraphs: [
        'Native buttons support keyboard activation without a custom key handler. A button that runs an action should have type="button". A link should have a real destination.',
        'Keep separate actions separate. A gallery card can contain a preview button, a code button, and a heading link. Making the whole card a simulated button creates confusing nested controls.',
        'Keep the action name stable during decoration. A generated arrow can enter the accessible name, so check the result with a screen reader. An explicit accessible label can preserve the intended name.',
      ] },
      { id: 'focus', title: 'Make keyboard focus visible', paragraphs: [
        'Use :focus-visible to give keyboard users a clear outline. A decorative glow or moving border should not erase that indicator. Check that the outline remains visible against nearby surfaces.',
        'The library’s effect rules pair hover with focus-visible. Keyboard users can therefore try the same visual treatment. Avoid an endless animation on a focused control when a quiet color change would communicate enough.',
      ], code: '.btn:focus-visible {\n  outline: 2px solid currentColor;\n  outline-offset: 5px;\n}\n/* Pair interaction states without removing the focus outline. */\n.btn:is(:hover, :focus-visible) {\n  background-color: #f4ff2b;\n}' },
      { id: 'reduced-motion', title: 'Honor the motion preference in the export', paragraphs: [
        'A reduced-motion rule must travel with the copied code. A rule that exists only in the gallery stylesheet cannot protect people who use the snippet on another site.',
        'Disable keyframes and shorten transitions for the button, its descendants, and its pseudo-elements. Preserve a static color or border change so interaction remains visible.',
        'A reduced-motion preference does not mean every possible effect is safe for every person. Test with users, and avoid disruptive motion for critical actions.',
      ], code: '@media (prefers-reduced-motion: reduce) {\n  .btn, .btn *, .btn::before, .btn::after,\n  .btn *::before, .btn *::after {\n    animation: none !important;\n    transition-duration: 0.01ms !important;\n    transition-delay: 0ms !important;\n  }\n}' },
      { id: 'touch-and-states', title: 'Test touch, disabled, and active states', paragraphs: [
        'On touch screens, check the button without a mouse. Its label and purpose must remain clear before any hover treatment. Use :active only for brief activation feedback.',
        'Use the disabled attribute when a native button cannot operate. Supply an explanation nearby if the reason is unclear. Do not use a low-contrast appearance as the only indicator.',
        'Test Tab, Shift+Tab, Enter, and Space. Then test system reduced motion and a narrow screen. Automated checks can find some failures, but they cannot establish that the full interaction is accessible.',
      ] },
    ],
    references: [{ label: 'MDN: prefers-reduced-motion', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion' }, { label: 'WAI: button pattern', href: 'https://www.w3.org/WAI/ARIA/apg/patterns/button/' }, { label: 'MDN: focus-visible', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible' }],
  },
  {
    slug: 'customize-css-buttons', name: 'Customize your CSS button',
    title: 'Customize CSS buttons with color, size, radius, and timing',
    summary: 'Adapt the theme variables and effect rules without carrying the whole gallery into your project.',
    intro: 'Every exported button contains a shared base, one effect, focus styles, and a reduced-motion rule. Keep those parts together, then change the local values that control its appearance.',
    demoIds: [14, 59], effects: ['glow', 'brutalist', 'press'],
    sections: [
      { id: 'theme', title: 'Set the color roles together', paragraphs: [
        '--primary is the accent. --secondary is the default dark color. --surface supplies the contrasting light surface. --bink and --bsurf refer to the foreground and surface roles used by the effect.',
        'Many fill effects use --bink for the incoming panel and --bsurf for the final label. Change those roles as a pair. Check the resting state and the completed effect, not just a screenshot halfway through the transition.',
      ], code: '.btn {\n  --primary: #f4ff2b;\n  --secondary: #0f191e;\n  --surface: #e2f1f2;\n  --bink: var(--secondary);\n  --bsurf: var(--surface);\n}' },
      { id: 'size', title: 'Change dimensions without clipping the effect', paragraphs: [
        'Use padding and font-size to fit the label. Border-radius controls the common shape, but an individual effect can override it. For example, Arrow Ring intentionally uses a pill radius.',
        'Test longer labels and the focus outline after changing dimensions. Radial fills may need a larger final scale to cover wide corners. Shadows and outlines need space beyond the button’s layout box.',
        'Avoid copying a fixed width from an isolated demo into a responsive layout. Let content determine the width unless the product has a specific reason for equal-size actions.',
      ] },
      { id: 'timing', title: 'Adjust the rule that actually animates', paragraphs: [
        'The shared base sets a transition, but some effects define a more specific transition or a keyframe animation. Changing only the base duration does not update every effect.',
        'For a fill, edit the pseudo-element’s transform transition. For Pulse, edit the animation duration. For a layered effect, keep the label and surface timings coordinated.',
        'Do not edit the reduced-motion guard to make the default animation faster. That guard serves a separate preference and should remain at the end of the exported CSS.',
      ] },
      { id: 'integration', title: 'Copy only the implementation you need', paragraphs: [
        'Use the effect page’s HTML and CSS blocks, or open its React example. Save the React CSS as button.css next to the component, then import it once. The CSS supplies the visual effect without a runtime animation dependency.',
        'Several exports share .btn and .btn-label. If your project already uses those names, rename both the markup and every matching selector, including focus and reduced-motion rules.',
        'The generator below can change colors, padding, radius, and transition timing, then export a complete example. Always check your chosen contrast and label length in the final interface.',
      ] },
    ],
    references: [{ label: 'MDN: CSS custom properties', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties' }, { label: 'MDN: transition-duration', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration' }],
  },
];
export const getGuide = (slug: string) => {
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) throw new Error(`Unknown guide: ${slug}`);
  return guide;
};
