import { JobsOptions, Queue, QueueEvents, Worker } from "bullmq"
import { redis } from "./redis"

export const createQueue = (name: string) => {
    return new Queue(name, {
        connection: redis,
    });
}

export const createWorker = (
    name: string,
    processor: (job: any) => Promise<any>
) => {
    return new Worker(name, processor, {
        connection: redis,
    });
}

export const createQueueEvents = (name: string) => {
    return new QueueEvents(name, {
        connection: redis,
    });
}

export const defaultJobOptions: JobsOptions = {
    attempts: 3,
    backoff: { type: "exponential", delay: 2000 },
    removeOnComplete: true,
    removeOnFail: false,
}

export function attachWorkerEvents(worker: Worker, queueName: string) {
    worker.on("completed", (job) => {
      console.log(`✅ [${queueName}] Job completed: ${job.id}`);
    });
  
    worker.on("failed", (job, err) => {
      console.error(`❌ [${queueName}] Job failed: ${job?.id} - ${err.message}`);
    });
  
    worker.on("progress", (job, progress) => {
      console.log(`🔄 [${queueName}] Job progress ${job.id}:`, progress);
    });
  
    worker.on("error", (err) => {
      console.error(`💥 [${queueName}] Worker error:`, err);
    });
  
    worker.on("stalled", (jobId) => {
      console.warn(`⚠️ [${queueName}] Job stalled: ${jobId}`);
    });
  
    worker.on("drained", () => {
      console.log(`📭 [${queueName}] Queue drained — no more jobs`);
    });
  
    worker.on("closing", () => {
      console.log(`🚪 [${queueName}] Worker closing...`);
    });
  
    worker.on("closed", () => {
      console.log(`🔒 [${queueName}] Worker closed`);
    });
}