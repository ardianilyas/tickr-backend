-- CreateEnum
CREATE TYPE "TicketPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "priority" "TicketPriority" NOT NULL DEFAULT 'LOW';
