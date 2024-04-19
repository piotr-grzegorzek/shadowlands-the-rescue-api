import express from "express";
import { isAuthenticated, login, register } from "../controllers/authentication";
import { isAuthenticatedMiddleware } from "../middleware";
import { getAllUsers } from "../controllers/users";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth", isAuthenticated);
router.get("/users", isAuthenticatedMiddleware, getAllUsers);

export default router;
