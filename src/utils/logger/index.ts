import pino, { Logger } from "pino";
import { devConsoleTransport, devFileStream } from "./transports.dev";
import { prodTransport } from "./transports.prod";

const isDev = process.env.NODE_ENV !== "production";

let logger: Logger;

if (isDev) {
  logger = pino(
    {
      level: "debug",
    },
    pino.multistream([
      { stream: devConsoleTransport },
      { stream: devFileStream }
    ])
  );
} else {
  logger = pino(
    {
      level: "info",
    },
    prodTransport
  );
}

export { logger };