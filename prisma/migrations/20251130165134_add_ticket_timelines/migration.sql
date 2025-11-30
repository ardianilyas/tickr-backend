-- CreateEnum
CREATE TYPE "TimelineEventType" AS ENUM ('CREATED', 'ASSIGNED', 'COMMENTED', 'STATUS_CHANGED', 'RESOLVED');

-- CreateTable
CREATE TABLE "ticket_timelines" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventType" "TimelineEventType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ticket_timelines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ticket_timelines" ADD CONSTRAINT "ticket_timelines_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_timelines" ADD CONSTRAINT "ticket_timelines_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
