import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
  id: varchar({ length: 36 }).notNull().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  hashedPassword: varchar("hashed_password", { length: 60 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
