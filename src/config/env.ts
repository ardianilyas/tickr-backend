import dotenv from "dotenv";
dotenv.config();

const required = [
  "DATABASE_URL",
  "JWT_SECRET",
  "RESEND_API_KEY",
] as const;

const warnIfMissing = (key: string, value: any) => {
  if (!value) {
    console.warn(`⚠️  [ENV WARNING] ${key} is missing or empty.`);
  }
};

const getEnv = (key: string, fallback?: any) => {
  const value = process.env[key];
  if (!value) warnIfMissing(key, value);
  return value ?? fallback;
};

export const env = {
  PORT: getEnv("PORT", 8000),
  NODE_ENV: getEnv("NODE_ENV", "development"),
  LOG_LEVEL: getEnv("LOG_LEVEL", "info"),

  DATABASE_URL: getEnv("DATABASE_URL"),
  JWT_SECRET: getEnv("JWT_SECRET"),
  RESEND_API_KEY: getEnv("RESEND_API_KEY"),

  REDIS_PORT: getEnv("REDIS_PORT", 6379),
  REDIS_HOST: getEnv("REDIS_HOST", "localhost"),
  REDIS_PASSWORD: getEnv("REDIS_PASSWORD", ""),
};