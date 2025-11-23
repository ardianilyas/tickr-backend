import pino from "pino";

export const prodTransport = pino.transport({
  target: "pino/file", // Pino internal file transport
  options: {},
});