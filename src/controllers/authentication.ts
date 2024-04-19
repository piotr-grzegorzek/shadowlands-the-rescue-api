import express from "express";
import { getUserByName, createUser, updateUserById } from "../db/users";
import { authentication, random } from "../helpers";
import { /*DOMAIN,*/ SESSION_TOKEN } from "../constants";
import { checkSessionToken } from "../helpers/authentication";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, pass } = req.body;
    if (!username || !pass) {
      return res.sendStatus(400);
    }

    const result = await getUserByName(username);
    if (!result || result.length > 0) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      username,
      pass: authentication(salt, pass),
      salt,
    });

    return res.status(200).json(user).end();
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { username, pass } = req.body;
    if (!username || !pass) {
      return res.sendStatus(400);
    }

    const result = await getUserByName(username);
    if (!result || result.length === 0) {
      return res.sendStatus(400);
    }

    const user = result[0];
    if (!user || !user.salt || !pass || user.pass !== authentication(user.salt, pass)) {
      return res.sendStatus(403);
    }

    user.session_token = authentication(random(), user.pass);

    const updatedUser = await updateUserById(user.id, user);

    res.cookie(SESSION_TOKEN, user.session_token, {
      //domain: DOMAIN,
      path: "/",
      expires: new Date(Date.now() + 900000),
    });

    return res.status(200).json(updatedUser).end();
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const isAuthenticated = async (req: express.Request, res: express.Response) => {
  try {
    if (!(await checkSessionToken(req))) {
      return res.sendStatus(403);
    }
    return res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};
