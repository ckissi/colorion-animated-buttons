export const COLORION_REF = 'animatedbuttons.colorion.co';

export function colorionHref(href: string) {
  const url = new URL(href);
  url.searchParams.set('ref', COLORION_REF);
  return url.href;
}

export const colorionProjects = [
  { name: 'Colorion', href: 'https://www.colorion.co/', icon: 'palette' },
  { name: '2 Color Combinations', href: 'https://2colors.colorion.co/', icon: 'filter' },
  { name: 'Color Palettes', href: 'https://colorpalettes.colorion.co/', icon: 'swatch' },
  { name: 'Palette Generator', href: 'https://palettegenerator.colorion.co/', icon: 'wand' },
  { name: 'Material Colors', href: 'https://material.colorion.co/', icon: 'grid' },
  { name: 'Mobile Palette', href: 'https://mobilepalette.colorion.co/', icon: 'mobile' },
  { name: 'Gradients', href: 'https://gradients.colorion.co/', icon: 'gradient' },
  { name: 'Gradient Buttons', href: 'https://gradientbuttons.colorion.co/', icon: 'button' },
  { name: 'CSS Loaders', href: 'https://cssloaders.colorion.co/', icon: 'loader' },
  { name: 'CSS Tooltips', href: 'https://tooltips.colorion.co/', icon: 'tooltip' },
  { name: 'Kinetics', href: 'https://kinetics.colorion.co/', icon: 'motion' },
] as const;
