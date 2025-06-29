-- CreateTable
CREATE TABLE "_UserSegue" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserSegue_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserSegue_B_index" ON "_UserSegue"("B");

-- AddForeignKey
ALTER TABLE "_UserSegue" ADD CONSTRAINT "_UserSegue_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSegue" ADD CONSTRAINT "_UserSegue_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
