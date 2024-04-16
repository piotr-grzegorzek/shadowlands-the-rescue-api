import crypto from "crypto";

export const authentication = (salt: string, pass: string): string => {
  const secret = process.env["SECRET"] || (new Date().getTime() / 1000).toString();
  return crypto.createHmac("sha256", [salt, pass].join("-")).update(secret).digest("hex");
};

export const random = () => crypto.randomBytes(128).toString("base64");
