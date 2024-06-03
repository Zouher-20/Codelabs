-- AlterTable
ALTER TABLE "ClassProject" ADD COLUMN     "memberClassId" TEXT;

-- AddForeignKey
ALTER TABLE "ClassProject" ADD CONSTRAINT "ClassProject_memberClassId_fkey" FOREIGN KEY ("memberClassId") REFERENCES "MemberClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;
