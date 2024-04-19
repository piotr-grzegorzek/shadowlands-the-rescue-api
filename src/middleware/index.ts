import express from "express";
import { checkSessionToken } from "../helpers/authentication";

export const isAuthenticatedMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (!(await checkSessionToken(req))) {
      return res.sendStatus(403);
    }
    return next();
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};
