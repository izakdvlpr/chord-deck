-- CreateTable
CREATE TABLE "Chord" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "baseFret" INTEGER NOT NULL DEFAULT 1,
    "difficulty" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChordString" (
    "id" TEXT NOT NULL,
    "chordId" TEXT NOT NULL,
    "stringNum" INTEGER NOT NULL,
    "fret" INTEGER,
    "finger" INTEGER,
    "muted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ChordString_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barre" (
    "id" TEXT NOT NULL,
    "chordId" TEXT NOT NULL,
    "fret" INTEGER NOT NULL,
    "finger" INTEGER NOT NULL,
    "fromString" INTEGER NOT NULL,
    "toString" INTEGER NOT NULL,

    CONSTRAINT "Barre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeckChord" (
    "deckId" TEXT NOT NULL,
    "chordId" TEXT NOT NULL,

    CONSTRAINT "DeckChord_pkey" PRIMARY KEY ("deckId","chordId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChordString_chordId_stringNum_key" ON "ChordString"("chordId", "stringNum");

-- CreateIndex
CREATE INDEX "Barre_chordId_idx" ON "Barre"("chordId");

-- CreateIndex
CREATE UNIQUE INDEX "Deck_slug_key" ON "Deck"("slug");

-- AddForeignKey
ALTER TABLE "ChordString" ADD CONSTRAINT "ChordString_chordId_fkey" FOREIGN KEY ("chordId") REFERENCES "Chord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barre" ADD CONSTRAINT "Barre_chordId_fkey" FOREIGN KEY ("chordId") REFERENCES "Chord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeckChord" ADD CONSTRAINT "DeckChord_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeckChord" ADD CONSTRAINT "DeckChord_chordId_fkey" FOREIGN KEY ("chordId") REFERENCES "Chord"("id") ON DELETE CASCADE ON UPDATE CASCADE;
