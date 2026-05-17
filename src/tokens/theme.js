/**
 * Master design token system — single source of truth.
 * Colors extracted from logo.svg: parrot green #1ded54 + sky blue #00b7fb + dark navy #000e4b
 */

export const colorPalette = {
  green: {
    200: '#a3f7bb',
    300: '#7df59a',
    400: '#3df46b',
    500: '#1ded54',  // parrot green from logo
    600: '#0fc845',
    700: '#0ab83e',  // darker for light-theme readability
    800: '#087d2b',
  },
  blue: {
    300: '#7dd9fc',
    400: '#3dc7fb',
    500: '#00b7fb',  // sky blue from logo
    600: '#0099d4',
    700: '#0079a8',
  },
  navy: {
    950: '#000e4b',  // logo text / dark navy
    900: '#020814',  // dark bg
    800: '#060f1e',
    700: '#0a1628',
    600: '#0e1f38',
    500: '#142848',
  },
  light: {
    50:  '#FFFFFF',
    100: '#f0f9ff',  // very subtle sky-blue tint
    200: '#e8f4ff',
    300: '#d4ebff',
  },
  neutral: {
    darkText1: '#e8f0ff',
    darkText2: '#7faad0',
    darkText3: '#5a80aa',  // visible muted (prev fix carried forward)
    lightText1: '#000e4b',
    lightText2: '#2a4a8a',
    lightText3: '#5a70a8',
  },
}

export const spacing = {
  section: { y: '5rem', ySm: '3.5rem' },
  container: { maxWidth: '1280px', px: '1.5rem' },
  card: { pad: '1.75rem', padSm: '1.25rem' },
  radius: { sm: '8px', md: '12px', lg: '16px', xl: '24px', '2xl': '32px', full: '9999px' },
}

export const typography = {
  fonts: {
    display: "'Playfair Display', serif",
    body:    "'Inter', sans-serif",
    accent:  "'Cormorant Garamond', serif",
  },
}

export const effects = {
  glow: {
    green:       '0 0 40px rgba(29,237,84,0.22)',
    greenStrong: '0 0 80px rgba(29,237,84,0.38), 0 0 40px rgba(29,237,84,0.18)',
    blue:        '0 0 40px rgba(0,183,251,0.22)',
  },
  shadow: {
    card:        '0 4px 24px rgba(0,0,0,0.10)',
    cardDark:    '0 8px 40px rgba(0,0,0,0.50)',
    cardHover:   '0 20px 60px rgba(0,0,0,0.18)',
    cardHoverDark:'0 24px 80px rgba(0,0,0,0.65)',
  },
}

export const gradients = {
  logo:       'linear-gradient(135deg, #00b7fb 0%, #1ded54 100%)',
  logoAngled: 'linear-gradient(90deg, #00b7fb 0%, #1ded54 100%)',
  darkBg:     'linear-gradient(160deg, #020814 0%, #060f1e 100%)',
  heroDark:   'linear-gradient(to bottom right, rgba(2,8,20,0.82) 0%, rgba(2,8,20,0.60) 50%, rgba(6,15,30,0.90) 100%)',
  heroLight:  'linear-gradient(to bottom right, rgba(255,255,255,0.55) 0%, rgba(240,249,255,0.45) 50%, rgba(255,255,255,0.75) 100%)',
}

// Mirrored in index.css :root / .dark
export const themes = {
  light: {
    '--accent':             colorPalette.green[700],
    '--accent-light':       colorPalette.green[500],
    '--accent-dark':        colorPalette.green[800],
    '--accent-secondary':   colorPalette.blue[600],
    '--bg-primary':         colorPalette.light[50],
    '--bg-secondary':       colorPalette.light[100],
    '--surface':            colorPalette.light[50],
    '--surface-raised':     colorPalette.light[200],
    '--glass-bg':           'rgba(255,255,255,0.80)',
    '--glass-bg-hover':     'rgba(255,255,255,0.94)',
    '--border-subtle':      'rgba(0,0,0,0.07)',
    '--border-gold':        'rgba(0,183,251,0.24)',
    '--accent-tint':        'rgba(0,183,251,0.10)',
    '--text-primary':       colorPalette.navy[950],
    '--text-secondary':     colorPalette.neutral.lightText2,
    '--text-muted':         colorPalette.neutral.lightText3,
    '--shadow-card':        effects.shadow.card,
    '--shadow-card-hover':  effects.shadow.cardHover,
    '--glow-gold':          'none',
    '--glow-gold-strong':   `0 8px 32px rgba(29,237,84,0.18)`,
    '--gold-gradient':      gradients.logo,
    '--hero-overlay':       gradients.heroLight,
  },
  dark: {
    '--accent':             colorPalette.green[500],
    '--accent-light':       colorPalette.green[400],
    '--accent-dark':        colorPalette.green[700],
    '--accent-secondary':   colorPalette.blue[500],
    '--bg-primary':         colorPalette.navy[900],
    '--bg-secondary':       colorPalette.navy[800],
    '--surface':            colorPalette.navy[700],
    '--surface-raised':     colorPalette.navy[600],
    '--glass-bg':           'rgba(255,255,255,0.05)',
    '--glass-bg-hover':     'rgba(255,255,255,0.08)',
    '--border-subtle':      'rgba(255,255,255,0.07)',
    '--border-gold':        'rgba(29,237,84,0.26)',
    '--accent-tint':        'rgba(29,237,84,0.12)',
    '--text-primary':       colorPalette.neutral.darkText1,
    '--text-secondary':     colorPalette.neutral.darkText2,
    '--text-muted':         colorPalette.neutral.darkText3,
    '--shadow-card':        effects.shadow.cardDark,
    '--shadow-card-hover':  effects.shadow.cardHoverDark,
    '--glow-gold':          effects.glow.green,
    '--glow-gold-strong':   effects.glow.greenStrong,
    '--gold-gradient':      gradients.logo,
    '--hero-overlay':       gradients.heroDark,
  },
}
