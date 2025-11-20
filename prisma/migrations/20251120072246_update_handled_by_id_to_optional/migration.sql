-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_handledById_fkey";

-- AlterTable
ALTER TABLE "tickets" ALTER COLUMN "handledById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_handledById_fkey" FOREIGN KEY ("handledById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
