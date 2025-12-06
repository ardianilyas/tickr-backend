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