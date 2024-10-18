-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('HAPPY', 'NORMAL', 'SAD');

-- CreateTable
CREATE TABLE "Feeling" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mood" "Mood" NOT NULL,

    CONSTRAINT "Feeling_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feeling_userId_date_key" ON "Feeling"("userId", "date");

-- AddForeignKey
ALTER TABLE "Feeling" ADD CONSTRAINT "Feeling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
