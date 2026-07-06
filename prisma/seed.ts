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
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
