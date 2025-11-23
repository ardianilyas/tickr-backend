import pino from "pino";
import path from "path";
import fs from "fs";

// create logs folder if needed
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

// file stream
export const devFileStream = pino.destination({
  dest: path.join(logDir, "app.log"),
  sync: false,
});

// console transport (pretty)
export const devConsoleTransport = pino.transport({
  target: "pino-pretty",
  options: {
    colorize: true,
    translateTime: "SYS:standard",
  },
});