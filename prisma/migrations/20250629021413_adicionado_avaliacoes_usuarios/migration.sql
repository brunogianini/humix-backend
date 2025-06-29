-- AlterTable
ALTER TABLE "Banda" ALTER COLUMN "foto" DROP DEFAULT;

-- CreateTable
CREATE TABLE "AvaliacaoAlbum" (
    "id" TEXT NOT NULL,
    "nota" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "AvaliacaoAlbum_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AvaliacaoAlbum_userId_albumId_key" ON "AvaliacaoAlbum"("userId", "albumId");

-- AddForeignKey
ALTER TABLE "AvaliacaoAlbum" ADD CONSTRAINT "AvaliacaoAlbum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliacaoAlbum" ADD CONSTRAINT "AvaliacaoAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
