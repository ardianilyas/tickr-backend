import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";

const ACCESS_SECRET = env.JWT_SECRET as string;
if(!ACCESS_SECRET) throw new Error("ACCESS_TOKEN_SECRET is not defined");

export function signAccessToken(payload: JwtPayload) {
  const options: SignOptions = { expiresIn: "1d"};
  return jwt.sign(payload, ACCESS_SECRET, options);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
}