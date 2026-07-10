import type { DesignStyle, DiagnosticResult, Product } from '@/types'
import { DESIGN_STYLES } from './styles'

// Mock products database - replace with real data from DB
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Poltrona Arne Jacobsen',
    description: 'Poltrona moderna con design minimalista, perfetta per spazi contemporanei',
    price: 599.99,
    url: 'https://www.maisonsdumonde.com',
    image: '/products/poltrona-1.jpg',
    images: [],
    category: 'Sedie',
    styles: ['moderno', 'minimalista', 'contemporaneo'],
    colors: ['nero', 'bianco', 'grigio'],
    materials: ['plastica', 'metallo'],
    inStock: true,
  },
  {
    id: 'prod-2',
    name: 'Tavolo Legno Massello Rustico',
    description: 'Tavolo rustico in legno massello, ideale per stili etnici e bohémien',
    price: 799.99,
    url: 'https://www.maisonsdumonde.com',
    image: '/products/tavolo-2.jpg',
    images: [],
    category: 'Tavoli',
    styles: ['etnico', 'bohemien', 'provenzale'],
    colors: ['marrone', 'nocciola'],
    materials: ['legno'],
    inStock: true,
  },
  {
    id: 'prod-3',
    name: 'Letto in Ferro Battuto Vintage',
    description: 'Letto delicato in ferro, perfetto per shabby chic e stili vintage',
    price: 899.99,
    url: 'https://www.maisonsdumonde.com',
    image: '/products/letto-3.jpg',
    images: [],
    category: 'Letti',
    styles: ['shabby-chic', 'provenzale', 'anni-70-80-90'],
    colors: ['bianco', 'grigio'],
    materials: ['ferro'],
    inStock: true,
  },
  {
    id: 'prod-4',
    name: 'Lampada Industriale Metallo',
    description: 'Lampada nello stile industriale con struttura in metallo grezzo',
    price: 149.99,
    url: 'https://www.maisonsdumonde.com',
    image: '/products/lampada-4.jpg',
    images: [],
    category: 'Illuminazione',
    styles: ['industriale', 'moderno', 'eclettico'],
    colors: ['nero', 'grigio', 'ottone'],
    materials: ['metallo', 'vetro'],
    inStock: true,
  },
  {
    id: 'prod-5',
    name: 'Tappeto Scandinavo Lana',
    description: 'Tappeto in lana naturale con pattern geometrico minimalista',
    price: 399.99,
    url: 'https://www.maisonsdumonde.com',
    image: '/products/tappeto-5.jpg',
    images: [],
    category: 'Tappeti',
    styles: ['scandinavo', 'japandi', 'minimalista'],
    colors: ['bianco', 'grigio', 'beige'],
    materials: ['lana'],
    inStock: true,
  },
  {
    id: 'prod-6',
    name: 'Cuscino Etnico Ricamato',
    description: 'Cuscino con ricami tradizionali e colori vivaci, stile bohémien',
    price: 79.99,
    url: 'https://www.maisonsdumonde.com',
    image: '/products/cuscino-6.jpg',
    images: [],
    category: 'Tessuti',
    styles: ['etnico', 'bohemien', 'eclettico'],
    colors: ['rosso', 'blu', 'giallo', 'multicolore'],
    materials: ['cotone', 'seta'],
    inStock: true,
  },
  {
    id: 'prod-7',
    name: 'Scaffale Minimal Bianco',
    description: 'Scaffale minimalista con linee pulite, perfetto per interni moderni',
    price: 199.99,
    url: 'https://www.maisonsdumonde.com',
    image: '/products/scaffale-7.jpg',
    images: [],
    category: 'Mobili',
    styles: ['minimalista', 'moderno', 'scandinavo'],
    colors: ['bianco', 'nero', 'grigio'],
    materials: ['legno', 'metallo'],
    inStock: true,
  },
  {
    id: 'prod-8',
    name: 'Specchio Vintage Dorato',
    description: 'Specchio con cornice dorata stile provenzale, aggiunge eleganza agli spazi',
    price: 249.99,
    url: 'https://www.maisonsdumonde.com',
    image: '/products/specchio-8.jpg',
    images: [],
    category: 'Accessori',
    styles: ['provenzale', 'shabby-chic', 'contemporaneo'],
    colors: ['oro', 'bianco crema'],
    materials: ['legno', 'vetro'],
    inStock: true,
  },
]

export function analyzeAnswers(
  answers: Record<string, string | number>
): DiagnosticResult {
  // Calculate style scores based on answers
  const styleScores: Record<DesignStyle, number> = {
    'moderno': 0,
    'contemporaneo': 0,
    'industriale': 0,
    'etnico': 0,
    'scandinavo': 0,
    'japandi': 0,
    'cozy': 0,
    'minimalista': 0,
    'shabby-chic': 0,
    'provenzale': 0,
    'bohemien': 0,
    'eclettico': 0,
    'anni-70-80-90': 0,
  }

  // Simple scoring algorithm based on answers
  const paletteAnswer = answers['q1']
  if (paletteAnswer === 'neutral') {
    styleScores.minimalista += 3
    styleScores.moderno += 2
  } else if (paletteAnswer === 'warm') {
    styleScores.cozy += 3
    styleScores.provenzale += 2
    styleScores.industriale += 1
  } else if (paletteAnswer === 'vibrant') {
    styleScores.bohemien += 3
    styleScores.eclettico += 2
    styleScores['anni-70-80-90'] += 2
  }

  const modernAnswer = answers['q2'] as number
  if (modernAnswer > 7) {
    styleScores.moderno += 2
    styleScores.minimalista += 1
  } else if (modernAnswer < 3) {
    styleScores['shabby-chic'] += 2
    styleScores.provenzale += 2
  }

  const materialsAnswer = answers['q3']
  if (materialsAnswer === 'wood') {
    styleScores.scandinavo += 2
    styleScores.contemporaneo += 1
  } else if (materialsAnswer === 'industrial') {
    styleScores.industriale += 3
  } else if (materialsAnswer === 'mixed') {
    styleScores.eclettico += 2
  }

  // Get top style
  const topStyle = Object.entries(styleScores).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0] as DesignStyle

  const totalScore = Object.values(styleScores).reduce((a, b) => a + b, 0)
  const percentage = Math.round((styleScores[topStyle] / totalScore) * 100)

  // Filter products matching the style
  const recommendations = MOCK_PRODUCTS.filter((product) =>
    product.styles.includes(topStyle)
  ).slice(0, 6)

  return {
    primaryStyle: topStyle,
    stylePercentage: Math.max(percentage, 30), // Min 30%
    recommendations,
    matchingFactors: [
      `Forte affinity con ${DESIGN_STYLES[topStyle].name}`,
      'Preferenze di colori corrispondono allo stile',
      'Scelta materiali allineata con il tuo gusto',
    ],
  }
}
