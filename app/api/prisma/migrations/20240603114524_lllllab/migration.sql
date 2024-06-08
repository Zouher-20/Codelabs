/*
  Warnings:

  - Added the required column `endAt` to the `Rom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rom" ADD COLUMN     "endAt" TIMESTAMP(3) NOT NULL;
