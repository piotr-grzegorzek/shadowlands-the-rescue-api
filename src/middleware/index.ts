import express from "express";
import { checkSessionToken } from "../helpers/authentication";

export const isAuthenticatedMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (!(await checkSessionToken(req))) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }
    return next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "An error occurred while authenticating user",
    });
  }
};
