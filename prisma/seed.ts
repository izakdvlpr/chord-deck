import { PrismaPg } from '@prisma/adapter-pg'

import {
  parseNotation,
  type BarrePos,
  type StringPos,
} from '../src/lib/chord-notation'
import { PrismaClient } from './generated/client.js'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

interface SeedChord {
  name: string
  sortOrder: number
  notation: string
  baseFret: number
  difficulty: number
  notes: string
  fingers: Record<number, number>
  barres?: BarrePos[]
}

const majorChords: SeedChord[] = [
  {
    name: 'C',
    sortOrder: 1,
    notation: 'x32010',
    baseFret: 1,
    difficulty: 1,
    notes: 'Dó maior aberto.',
    fingers: { 2: 3, 3: 2, 5: 1 },
  },
  {
    name: 'C#',
    sortOrder: 1.1,
    notation: 'x46664',
    baseFret: 4,
    difficulty: 4,
    notes: 'Dó sustenido maior com pestana na 4ª casa.',
    fingers: { 2: 1, 3: 3, 4: 3, 5: 3, 6: 1 },
    barres: [
      { fret: 4, finger: 1, fromString: 2, toString: 6 },
      { fret: 6, finger: 3, fromString: 3, toString: 5 },
    ],
  },
  {
    name: 'D',
    sortOrder: 2,
    notation: 'xx0232',
    baseFret: 1,
    difficulty: 2,
    notes: 'Ré maior aberto.',
    fingers: { 4: 1, 5: 3, 6: 2 },
  },
  {
    name: 'D#',
    sortOrder: 2.1,
    notation: 'x68886',
    baseFret: 6,
    difficulty: 4,
    notes: 'Ré sustenido maior com pestana na 6ª casa.',
    fingers: { 2: 1, 3: 3, 4: 3, 5: 3, 6: 1 },
    barres: [
      { fret: 6, finger: 1, fromString: 2, toString: 6 },
      { fret: 8, finger: 3, fromString: 3, toString: 5 },
    ],
  },
  {
    name: 'E',
    sortOrder: 3,
    notation: '022100',
    baseFret: 1,
    difficulty: 1,
    notes: 'Mi maior aberto.',
    fingers: { 2: 2, 3: 3, 4: 1 },
  },
  {
    name: 'F',
    sortOrder: 4,
    notation: '133211',
    baseFret: 1,
    difficulty: 4,
    notes: 'Fá maior com pestana na 1ª casa.',
    fingers: { 1: 1, 2: 3, 3: 4, 4: 2, 5: 1, 6: 1 },
    barres: [{ fret: 1, finger: 1, fromString: 1, toString: 6 }],
  },
  {
    name: 'F#',
    sortOrder: 4.1,
    notation: '244322',
    baseFret: 2,
    difficulty: 4,
    notes: 'Fá sustenido maior com pestana na 2ª casa.',
    fingers: { 1: 1, 2: 3, 3: 4, 4: 2, 5: 1, 6: 1 },
    barres: [{ fret: 2, finger: 1, fromString: 1, toString: 6 }],
  },
  {
    name: 'G',
    sortOrder: 5,
    notation: '320003',
    baseFret: 1,
    difficulty: 2,
    notes: 'Sol maior aberto.',
    fingers: { 1: 2, 2: 1, 6: 3 },
  },
  {
    name: 'G#',
    sortOrder: 5.1,
    notation: '466544',
    baseFret: 4,
    difficulty: 4,
    notes: 'Sol sustenido maior com pestana na 4ª casa.',
    fingers: { 1: 1, 2: 3, 3: 4, 4: 2, 5: 1, 6: 1 },
    barres: [{ fret: 4, finger: 1, fromString: 1, toString: 6 }],
  },
  {
    name: 'A',
    sortOrder: 6,
    notation: 'x02220',
    baseFret: 1,
    difficulty: 1,
    notes: 'Lá maior aberto.',
    fingers: { 3: 1, 4: 2, 5: 3 },
  },
  {
    name: 'A#',
    sortOrder: 6.1,
    notation: 'x13331',
    baseFret: 1,
    difficulty: 4,
    notes: 'Lá sustenido maior com pestana na 1ª casa.',
    fingers: { 2: 1, 3: 3, 4: 3, 5: 3, 6: 1 },
    barres: [
      { fret: 1, finger: 1, fromString: 2, toString: 6 },
      { fret: 3, finger: 3, fromString: 3, toString: 5 },
    ],
  },
  {
    name: 'B',
    sortOrder: 7,
    notation: 'x24442',
    baseFret: 2,
    difficulty: 4,
    notes: 'Si maior com pestana na 2ª casa.',
    fingers: { 2: 1, 3: 3, 4: 3, 5: 3, 6: 1 },
    barres: [
      { fret: 2, finger: 1, fromString: 2, toString: 6 },
      { fret: 4, finger: 3, fromString: 3, toString: 5 },
    ],
  },
]

const minorChords: SeedChord[] = [
  {
    name: 'Cm',
    sortOrder: 1.1,
    notation: 'x35543',
    baseFret: 3,
    difficulty: 4,
    notes: 'Dó menor com pestana na 3ª casa.',
    fingers: { 2: 1, 3: 3, 4: 4, 5: 2, 6: 1 },
    barres: [{ fret: 3, finger: 1, fromString: 2, toString: 6 }],
  },
  {
    name: 'C#m',
    sortOrder: 1.2,
    notation: 'x46654',
    baseFret: 4,
    difficulty: 4,
    notes: 'Dó sustenido menor com pestana na 4ª casa.',
    fingers: { 2: 1, 3: 3, 4: 4, 5: 2, 6: 1 },
    barres: [{ fret: 4, finger: 1, fromString: 2, toString: 6 }],
  },
  {
    name: 'Dm',
    sortOrder: 2.1,
    notation: 'xx0231',
    baseFret: 1,
    difficulty: 2,
    notes: 'Ré menor aberto.',
    fingers: { 4: 2, 5: 3, 6: 1 },
  },
  {
    name: 'D#m',
    sortOrder: 2.2,
    notation: 'x68876',
    baseFret: 6,
    difficulty: 4,
    notes: 'Ré sustenido menor com pestana na 6ª casa.',
    fingers: { 2: 1, 3: 3, 4: 4, 5: 2, 6: 1 },
    barres: [{ fret: 6, finger: 1, fromString: 2, toString: 6 }],
  },
  {
    name: 'Em',
    sortOrder: 3,
    notation: '022000',
    baseFret: 1,
    difficulty: 1,
    notes: 'Mi menor aberto.',
    fingers: { 2: 2, 3: 3 },
  },
  {
    name: 'Fm',
    sortOrder: 4,
    notation: '133111',
    baseFret: 1,
    difficulty: 4,
    notes: 'Fá menor com pestana na 1ª casa.',
    fingers: { 1: 1, 2: 3, 3: 4, 4: 1, 5: 1, 6: 1 },
    barres: [{ fret: 1, finger: 1, fromString: 1, toString: 6 }],
  },
  {
    name: 'F#m',
    sortOrder: 4.1,
    notation: '244222',
    baseFret: 2,
    difficulty: 4,
    notes: 'Fá sustenido menor com pestana na 2ª casa.',
    fingers: { 1: 1, 2: 3, 3: 4, 4: 1, 5: 1, 6: 1 },
    barres: [{ fret: 2, finger: 1, fromString: 1, toString: 6 }],
  },
  {
    name: 'Gm',
    sortOrder: 5.1,
    notation: '355333',
    baseFret: 3,
    difficulty: 4,
    notes: 'Sol menor com pestana na 3ª casa.',
    fingers: { 1: 1, 2: 3, 3: 4, 4: 1, 5: 1, 6: 1 },
    barres: [{ fret: 3, finger: 1, fromString: 1, toString: 6 }],
  },
  {
    name: 'G#m',
    sortOrder: 5.2,
    notation: '466444',
    baseFret: 4,
    difficulty: 4,
    notes: 'Sol sustenido menor com pestana na 4ª casa.',
    fingers: { 1: 1, 2: 3, 3: 4, 4: 1, 5: 1, 6: 1 },
    barres: [{ fret: 4, finger: 1, fromString: 1, toString: 6 }],
  },
  {
    name: 'Am',
    sortOrder: 6,
    notation: 'x02210',
    baseFret: 1,
    difficulty: 1,
    notes: 'Lá menor aberto.',
    fingers: { 3: 2, 4: 3, 5: 1 },
  },
  {
    name: 'A#m',
    sortOrder: 6.1,
    notation: 'x13321',
    baseFret: 1,
    difficulty: 4,
    notes: 'Lá sustenido menor com pestana na 1ª casa.',
    fingers: { 2: 1, 3: 3, 4: 4, 5: 2, 6: 1 },
    barres: [{ fret: 1, finger: 1, fromString: 2, toString: 6 }],
  },
  {
    name: 'Bm',
    sortOrder: 7,
    notation: 'x24432',
    baseFret: 2,
    difficulty: 4,
    notes: 'Si menor com pestana na 2ª casa.',
    fingers: { 2: 1, 3: 3, 4: 4, 5: 2, 6: 1 },
    barres: [{ fret: 2, finger: 1, fromString: 2, toString: 6 }],
  },
]

const majorSeventhChords: SeedChord[] = [
  {
    name: 'C7',
    sortOrder: 1,
    notation: 'x32310',
    baseFret: 1,
    difficulty: 2,
    notes: 'Dó maior com sétima aberto.',
    fingers: { 2: 3, 3: 2, 4: 4, 5: 1 },
  },
  {
    name: 'C#7',
    sortOrder: 1.1,
    notation: 'x46464',
    baseFret: 4,
    difficulty: 4,
    notes: 'Dó sustenido maior com sétima e pestana na 4ª casa.',
    fingers: { 2: 1, 3: 3, 4: 1, 5: 4, 6: 1 },
    barres: [{ fret: 4, finger: 1, fromString: 2, toString: 6 }],
  },
  {
    name: 'D7',
    sortOrder: 2,
    notation: 'xx0212',
    baseFret: 1,
    difficulty: 2,
    notes: 'Ré maior com sétima aberto.',
    fingers: { 4: 2, 5: 1, 6: 3 },
  },
  {
    name: 'D#7',
    sortOrder: 2.1,
    notation: 'x68686',
    baseFret: 6,
    difficulty: 4,
    notes: 'Ré sustenido maior com sétima e pestana na 6ª casa.',
    fingers: { 2: 1, 3: 3, 4: 1, 5: 4, 6: 1 },
    barres: [{ fret: 6, finger: 1, fromString: 2, toString: 6 }],
  },
  {
    name: 'E7',
    sortOrder: 3,
    notation: '020100',
    baseFret: 1,
    difficulty: 1,
    notes: 'Mi maior com sétima aberto.',
    fingers: { 2: 2, 4: 1 },
  },
  {
    name: 'F7',
    sortOrder: 4,
    notation: '131211',
    baseFret: 1,
    difficulty: 4,
    notes: 'Fá maior com sétima e pestana na 1ª casa.',
    fingers: { 1: 1, 2: 3, 3: 1, 4: 2, 5: 1, 6: 1 },
    barres: [{ fret: 1, finger: 1, fromString: 1, toString: 6 }],
  },
  {
    name: 'F#7',
    sortOrder: 4.1,
    notation: '242322',
    baseFret: 2,
    difficulty: 4,
    notes: 'Fá sustenido maior com sétima e pestana na 2ª casa.',
    fingers: { 1: 1, 2: 3, 3: 1, 4: 2, 5: 1, 6: 1 },
    barres: [{ fret: 2, finger: 1, fromString: 1, toString: 6 }],
  },
  {
    name: 'G7',
    sortOrder: 5,
    notation: '320001',
    baseFret: 1,
    difficulty: 2,
    notes: 'Sol maior com sétima aberto.',
    fingers: { 1: 3, 2: 2, 6: 1 },
  },
  {
    name: 'G#7',
    sortOrder: 5.1,
    notation: '464544',
    baseFret: 4,
    difficulty: 4,
    notes: 'Sol sustenido maior com sétima e pestana na 4ª casa.',
    fingers: { 1: 1, 2: 3, 3: 1, 4: 2, 5: 1, 6: 1 },
    barres: [{ fret: 4, finger: 1, fromString: 1, toString: 6 }],
  },
  {
    name: 'A7',
    sortOrder: 6,
    notation: 'x02020',
    baseFret: 1,
    difficulty: 1,
    notes: 'Lá maior com sétima aberto.',
    fingers: { 3: 2, 5: 3 },
  },
  {
    name: 'A#7',
    sortOrder: 6.1,
    notation: 'x13131',
    baseFret: 1,
    difficulty: 4,
    notes: 'Lá sustenido maior com sétima e pestana na 1ª casa.',
    fingers: { 2: 1, 3: 3, 4: 1, 5: 4, 6: 1 },
    barres: [{ fret: 1, finger: 1, fromString: 2, toString: 6 }],
  },
  {
    name: 'B7',
    sortOrder: 7,
    notation: 'x21202',
    baseFret: 1,
    difficulty: 3,
    notes: 'Si maior com sétima aberto.',
    fingers: { 2: 2, 3: 1, 4: 3, 6: 4 },
  },
]

const minorSeventhChords: SeedChord[] = [
  {
    name: 'Cm7',
    sortOrder: 1.1,
    notation: 'x35343',
    baseFret: 3,
    difficulty: 4,
    notes: 'Dó menor com sétima e pestana na 3ª casa.',
    fingers: { 2: 1, 3: 3, 4: 1, 5: 2, 6: 1 },
    barres: [{ fret: 3, finger: 1, fromString: 2, toString: 6 }],
  },
  {
    name: 'C#m7',
    sortOrder: 1.2,
    notation: 'x46454',
    baseFret: 4,
    difficulty: 4,
    notes: 'Dó sustenido menor com sétima e pestana na 4ª casa.',
    fingers: { 2: 1, 3: 3, 4: 1, 5: 2, 6: 1 },
    barres: [{ fret: 4, finger: 1, fromString: 2, toString: 6 }],
  },
  {
    name: 'Dm7',
    sortOrder: 2.1,
    notation: 'xx0211',
    baseFret: 1,
    difficulty: 2,
    notes: 'Ré menor com sétima aberto.',
    fingers: { 4: 2, 5: 1, 6: 1 },
    barres: [{ fret: 1, finger: 1, fromString: 5, toString: 6 }],
  },
  {
    name: 'D#m7',
    sortOrder: 2.2,
    notation: 'x68676',
    baseFret: 6,
    difficulty: 4,
    notes: 'Ré sustenido menor com sétima e pestana na 6ª casa.',
    fingers: { 2: 1, 3: 3, 4: 1, 5: 2, 6: 1 },
    barres: [{ fret: 6, finger: 1, fromString: 2, toString: 6 }],
  },
  {
    name: 'Em7',
    sortOrder: 3,
    notation: '020000',
    baseFret: 1,
    difficulty: 1,
    notes: 'Mi menor com sétima aberto.',
    fingers: { 2: 2 },
  },
  {
    name: 'Fm7',
    sortOrder: 4,
    notation: '131111',
    baseFret: 1,
    difficulty: 4,
    notes: 'Fá menor com sétima e pestana na 1ª casa.',
    fingers: { 1: 1, 2: 3, 3: 1, 4: 1, 5: 1, 6: 1 },
    barres: [{ fret: 1, finger: 1, fromString: 1, toString: 6 }],
  },
  {
    name: 'F#m7',
    sortOrder: 4.1,
    notation: '242222',
    baseFret: 2,
    difficulty: 4,
    notes: 'Fá sustenido menor com sétima e pestana na 2ª casa.',
    fingers: { 1: 1, 2: 3, 3: 1, 4: 1, 5: 1, 6: 1 },
    barres: [{ fret: 2, finger: 1, fromString: 1, toString: 6 }],
  },
  {
    name: 'Gm7',
    sortOrder: 5.1,
    notation: '353333',
    baseFret: 3,
    difficulty: 4,
    notes: 'Sol menor com sétima e pestana na 3ª casa.',
    fingers: { 1: 1, 2: 3, 3: 1, 4: 1, 5: 1, 6: 1 },
    barres: [{ fret: 3, finger: 1, fromString: 1, toString: 6 }],
  },
  {
    name: 'G#m7',
    sortOrder: 5.2,
    notation: '464444',
    baseFret: 4,
    difficulty: 4,
    notes: 'Sol sustenido menor com sétima e pestana na 4ª casa.',
    fingers: { 1: 1, 2: 3, 3: 1, 4: 1, 5: 1, 6: 1 },
    barres: [{ fret: 4, finger: 1, fromString: 1, toString: 6 }],
  },
  {
    name: 'Am7',
    sortOrder: 6,
    notation: 'x02010',
    baseFret: 1,
    difficulty: 1,
    notes: 'Lá menor com sétima aberto.',
    fingers: { 3: 2, 5: 1 },
  },
  {
    name: 'A#m7',
    sortOrder: 6.1,
    notation: 'x13121',
    baseFret: 1,
    difficulty: 4,
    notes: 'Lá sustenido menor com sétima e pestana na 1ª casa.',
    fingers: { 2: 1, 3: 3, 4: 1, 5: 2, 6: 1 },
    barres: [{ fret: 1, finger: 1, fromString: 2, toString: 6 }],
  },
  {
    name: 'Bm7',
    sortOrder: 7,
    notation: 'x24232',
    baseFret: 2,
    difficulty: 4,
    notes: 'Si menor com sétima e pestana na 2ª casa.',
    fingers: { 2: 1, 3: 3, 4: 1, 5: 2, 6: 1 },
    barres: [{ fret: 2, finger: 1, fromString: 2, toString: 6 }],
  },
]

const extraChords: SeedChord[] = [
  {
    name: 'C/E',
    sortOrder: 100,
    notation: '032010',
    baseFret: 1,
    difficulty: 2,
    notes: 'Dó maior com baixo em Mi.',
    fingers: { 2: 3, 3: 2, 5: 1 },
  },
  {
    name: 'Dm/C',
    sortOrder: 101,
    notation: 'x30231',
    baseFret: 1,
    difficulty: 3,
    notes: 'Ré menor com baixo em Dó.',
    fingers: { 2: 3, 4: 2, 5: 4, 6: 1 },
  },
  {
    name: 'G/B',
    sortOrder: 102,
    notation: 'x20003',
    baseFret: 1,
    difficulty: 2,
    notes: 'Sol maior com baixo em Si.',
    fingers: { 2: 1, 6: 3 },
  },
  {
    name: 'A/C#',
    sortOrder: 103,
    notation: 'x42220',
    baseFret: 1,
    difficulty: 3,
    notes: 'Lá maior com baixo em Dó sustenido.',
    fingers: { 2: 4, 3: 1, 4: 2, 5: 3 },
  },
  {
    name: 'Bb/D',
    sortOrder: 104,
    notation: 'x5333x',
    baseFret: 3,
    difficulty: 4,
    notes: 'Si bemol maior com baixo em Ré.',
    fingers: { 2: 3, 3: 1, 4: 1, 5: 1 },
    barres: [{ fret: 3, finger: 1, fromString: 3, toString: 5 }],
  },
  {
    name: 'F/C',
    sortOrder: 105,
    notation: 'x33211',
    baseFret: 1,
    difficulty: 4,
    notes: 'Fá maior com baixo em Dó.',
    fingers: { 2: 3, 3: 4, 4: 2, 5: 1, 6: 1 },
    barres: [{ fret: 1, finger: 1, fromString: 5, toString: 6 }],
  },
  {
    name: 'D/F#',
    sortOrder: 106,
    notation: '2x0232',
    baseFret: 1,
    difficulty: 2,
    notes: 'Ré maior com baixo em Fá sustenido.',
    fingers: { 1: 1, 4: 2, 5: 4, 6: 3 },
  },
  {
    name: 'F/A',
    sortOrder: 107,
    notation: 'x03211',
    baseFret: 1,
    difficulty: 3,
    notes: 'Fá maior com baixo em Lá.',
    fingers: { 3: 3, 4: 2, 5: 1, 6: 1 },
    barres: [{ fret: 1, finger: 1, fromString: 5, toString: 6 }],
  },
  {
    name: 'A7/C#',
    sortOrder: 108,
    notation: 'x42020',
    baseFret: 1,
    difficulty: 3,
    notes: 'Lá maior com sétima e baixo em Dó sustenido.',
    fingers: { 2: 3, 3: 1, 5: 2 },
  },
  {
    name: 'Bb6',
    sortOrder: 109,
    notation: 'x1303x',
    baseFret: 1,
    difficulty: 2,
    notes: 'Si bemol maior com sexta.',
    fingers: { 2: 1, 3: 2, 5: 3 },
  },
  {
    name: 'A7(sus4)',
    sortOrder: 110,
    notation: 'x02030',
    baseFret: 1,
    difficulty: 2,
    notes: 'Lá com sétima e quarta suspensa.',
    fingers: { 3: 1, 5: 3 },
  },
  {
    name: 'Bbmaj7',
    sortOrder: 111,
    notation: 'x1323x',
    baseFret: 1,
    difficulty: 4,
    notes: 'Si bemol maior com sétima maior.',
    fingers: { 2: 1, 3: 3, 4: 2, 5: 4 },
  },
  {
    name: 'Dm7+',
    sortOrder: 112,
    notation: 'xx0221',
    baseFret: 1,
    difficulty: 3,
    notes: 'Ré menor com sétima maior.',
    fingers: { 4: 2, 5: 3, 6: 1 },
  },
  {
    name: 'Dm6',
    sortOrder: 113,
    notation: 'xx0201',
    baseFret: 1,
    difficulty: 2,
    notes: 'Ré menor com sexta.',
    fingers: { 4: 2, 6: 1 },
  },
  {
    name: 'C79',
    sortOrder: 114,
    notation: 'x32333',
    baseFret: 1,
    difficulty: 4,
    notes: 'Dó com sétima e nona.',
    fingers: { 2: 2, 3: 1, 4: 3, 5: 3, 6: 3 },
    barres: [{ fret: 3, finger: 3, fromString: 4, toString: 6 }],
  },
  {
    name: 'F7+',
    sortOrder: 115,
    notation: 'xx3210',
    baseFret: 1,
    difficulty: 2,
    notes: 'Fá maior com sétima maior.',
    fingers: { 3: 3, 4: 2, 5: 1 },
  },
  {
    name: 'D79',
    sortOrder: 116,
    notation: 'x54555',
    baseFret: 5,
    difficulty: 4,
    notes: 'Ré com sétima e nona.',
    fingers: { 2: 2, 3: 1, 4: 3, 5: 3, 6: 3 },
    barres: [{ fret: 5, finger: 3, fromString: 4, toString: 6 }],
  },
  {
    name: 'A4',
    sortOrder: 117,
    notation: 'x02230',
    baseFret: 1,
    difficulty: 1,
    notes: 'Lá com quarta suspensa.',
    fingers: { 3: 1, 4: 2, 5: 3 },
  },
  {
    name: 'Bb',
    sortOrder: 118,
    notation: 'x13331',
    baseFret: 1,
    difficulty: 4,
    notes: 'Si bemol maior (enarmônico de Lá sustenido).',
    fingers: { 2: 1, 3: 3, 4: 3, 5: 3, 6: 1 },
    barres: [
      { fret: 1, finger: 1, fromString: 2, toString: 6 },
      { fret: 3, finger: 3, fromString: 3, toString: 5 },
    ],
  },
  {
    name: 'Eb',
    sortOrder: 119,
    notation: 'x68886',
    baseFret: 6,
    difficulty: 4,
    notes: 'Mi bemol maior (enarmônico de Ré sustenido).',
    fingers: { 2: 1, 3: 3, 4: 3, 5: 3, 6: 1 },
    barres: [
      { fret: 6, finger: 1, fromString: 2, toString: 6 },
      { fret: 8, finger: 3, fromString: 3, toString: 5 },
    ],
  },
  {
    name: 'D6',
    sortOrder: 120,
    notation: 'xx0202',
    baseFret: 1,
    difficulty: 2,
    notes: 'Ré maior com sexta.',
    fingers: { 4: 1, 6: 2 },
  },
]

function stringsWithFingers(chord: SeedChord): StringPos[] {
  return parseNotation(chord.notation).map((string) => ({
    ...string,
    finger: chord.fingers[string.stringNum] ?? null,
  }))
}

async function main() {
  await prisma.deckChord.deleteMany()
  await prisma.deck.deleteMany()
  await prisma.chord.deleteMany()

  const majorChordsCreated = await Promise.all(
    majorChords.map((chord) =>
      prisma.chord.create({
        data: {
          name: chord.name,
          sortOrder: chord.sortOrder,
          baseFret: chord.baseFret,
          difficulty: chord.difficulty,
          notes: chord.notes,
          strings: {
            create: stringsWithFingers(chord),
          },
          barres: {
            create: chord.barres ?? [],
          },
        },
      }),
    ),
  )

  const minorChordsCreated = await Promise.all(
    minorChords.map((chord) =>
      prisma.chord.create({
        data: {
          name: chord.name,
          sortOrder: chord.sortOrder,
          baseFret: chord.baseFret,
          difficulty: chord.difficulty,
          notes: chord.notes,
          strings: {
            create: stringsWithFingers(chord),
          },
          barres: {
            create: chord.barres ?? [],
          },
        },
      }),
    ),
  )

  const majorSeventhChordsCreated = await Promise.all(
    majorSeventhChords.map((chord) =>
      prisma.chord.create({
        data: {
          name: chord.name,
          sortOrder: chord.sortOrder,
          baseFret: chord.baseFret,
          difficulty: chord.difficulty,
          notes: chord.notes,
          strings: {
            create: stringsWithFingers(chord),
          },
          barres: {
            create: chord.barres ?? [],
          },
        },
      }),
    ),
  )

  const minorSeventhChordsCreated = await Promise.all(
    minorSeventhChords.map((chord) =>
      prisma.chord.create({
        data: {
          name: chord.name,
          sortOrder: chord.sortOrder,
          baseFret: chord.baseFret,
          difficulty: chord.difficulty,
          notes: chord.notes,
          strings: {
            create: stringsWithFingers(chord),
          },
          barres: {
            create: chord.barres ?? [],
          },
        },
      }),
    ),
  )

  await Promise.all(
    extraChords.map((chord) =>
      prisma.chord.create({
        data: {
          name: chord.name,
          sortOrder: chord.sortOrder,
          baseFret: chord.baseFret,
          difficulty: chord.difficulty,
          notes: chord.notes,
          strings: {
            create: stringsWithFingers(chord),
          },
          barres: {
            create: chord.barres ?? [],
          },
        },
      }),
    ),
  )

  await prisma.deck.create({
    data: {
      slug: 'acordes-menores',
      name: 'Acordes menores',
      description: 'Deck com os acordes menores do violão.',
      deckChords: {
        create: minorChordsCreated.map((chord) => ({
          chord: { connect: { id: chord.id } },
        })),
      },
    },
  })

  await prisma.deck.create({
    data: {
      slug: 'acordes-maiores',
      name: 'Acordes maiores',
      description: 'Deck com os acordes maiores do violão.',
      deckChords: {
        create: majorChordsCreated.map((chord) => ({
          chord: { connect: { id: chord.id } },
        })),
      },
    },
  })

  await prisma.deck.create({
    data: {
      slug: 'acordes-maiores-setima',
      name: 'Acordes maiores com sétima',
      description: 'Deck com os acordes maiores com sétima do violão.',
      deckChords: {
        create: majorSeventhChordsCreated.map((chord) => ({
          chord: { connect: { id: chord.id } },
        })),
      },
    },
  })

  await prisma.deck.create({
    data: {
      slug: 'acordes-menores-setima',
      name: 'Acordes menores com sétima',
      description: 'Deck com os acordes menores com sétima do violão.',
      deckChords: {
        create: minorSeventhChordsCreated.map((chord) => ({
          chord: { connect: { id: chord.id } },
        })),
      },
    },
  })
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
