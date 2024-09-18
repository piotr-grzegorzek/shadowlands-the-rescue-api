import express from "express";
import { getUserByName, createUser, updateUserById } from "../db/users";
import { authentication, random } from "../helpers";
import { /*DOMAIN,*/ SESSION_TOKEN } from "../constants";
import { checkSessionToken } from "../helpers/authentication";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, pass } = req.body;
    if (!username || !pass) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }

    const result = await getUserByName(username);
    if (result && result.length > 0) {
      return res.status(400).json({
        message: "Username already exists.",
      });
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
    return res.status(500).json({
      message: "Error registering user.",
    });
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { username, pass } = req.body;
    if (!username || !pass) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }

    const result = await getUserByName(username);
    if (!result || result.length === 0) {
      return res.status(403).json({
        message: "Username or password is incorrect.",
      });
    }

    const user = result[0];
    if (!user || !user.salt || !pass || user.pass !== authentication(user.salt, pass)) {
      return res.status(403).json({
        message: "Username or password is incorrect.",
      });
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
    return res.status(500).json({
      message: "Error logging in.",
    });
  }
};

export const isAuthenticated = async (req: express.Request, res: express.Response) => {
  try {
    if (!(await checkSessionToken(req))) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }
    return res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "An error occurred while authenticating user",
    });
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  const username = req.params["username"];
  if (!username) {
    return res.status(400).json({
      message: "Username is required.",
    });
  }

  const result = await getUserByName(username);
  if (!result) {
    return res.status(400).json({
      message: "Username not found.",
    });
  }

  const user = result[0];
  if (!user) {
    return res.status(400).json({
      message: "Username not found.",
    });
  }

  user.session_token = authentication(random(), user.pass);
  await updateUserById(user.id, user);

  return res.sendStatus(200);
};
