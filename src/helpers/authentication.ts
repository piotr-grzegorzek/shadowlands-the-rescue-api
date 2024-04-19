// src/helpers/authentication.ts
import { getUserBySessionToken } from "../db/users";
import { SESSION_TOKEN } from "../constants";
import express from "express";

export const checkSessionToken = async (req: express.Request) => {
  const sessionToken = req.cookies[SESSION_TOKEN];
  if (!sessionToken) {
    return false;
  }

  const result = await getUserBySessionToken(sessionToken);
  if (!result || result.length === 0) {
    return false;
  }

  if (result[0]) {
    req.params["username"] = result[0].username;
  }

  return true;
};
