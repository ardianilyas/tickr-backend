import { Resend } from "resend";
import { env } from "../config/env";

const resendApiKey = env.RESEND_API_KEY;

export const resend = new Resend(resendApiKey);