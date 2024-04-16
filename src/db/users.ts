import { drizzle } from "drizzle-orm/node-postgres";
import { InferInsertModel, InferSelectModel, eq } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { Pool } from "pg";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  pass: text("pass").notNull(),
  salt: text("salt"),
  session_token: text("session_token"),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

const pool = new Pool({
  connectionString: process.env["DB"],
});

const db = drizzle(pool);

export const getUsers = async () => await db.select({ id: users.id, username: users.username }).from(users);

export const getUserBySessionToken = async (session_token: string) =>
  await db.select().from(users).where(eq(users.session_token, session_token));

export const createUser = async (newUser: NewUser) =>
  await db.insert(users).values(newUser).returning({ id: users.id, username: users.username });

export const updateUserById = async (id: number, updatedUser: User) =>
  await db.update(users).set(updatedUser).where(eq(users.id, id)).returning({ id: users.id, username: users.username });
