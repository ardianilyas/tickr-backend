import { attachWorkerEvents, createWorker } from "./lib/bullmq";

import { ticketWorker } from "./features/ticket/ticket.worker";

const workers = [
  ticketWorker,
];

workers.forEach((w) => {
  const worker = createWorker(w.queueName, w.processor);

  attachWorkerEvents(worker, w.queueName);

  console.log(`🚀 Worker started for queue: ${w.queueName}`);
});