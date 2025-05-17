import { relations } from "drizzle-orm";
import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
  id: varchar({ length: 36 }).notNull().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  hashedPassword: varchar("hashed_password", { length: 60 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const linksTable = mysqlTable("links", {
  id: varchar({ length: 36 }).notNull().unique().primaryKey(),
  title: varchar({ length: 50 }).notNull(),
  url: varchar({ length: 255 }).notNull().unique(),
  userId: varchar("user_id", { length: 36 }).references(() => usersTable.id),
  shortCode: varchar("short_Code", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// Relationships

export const userRelations = relations(usersTable, ({ many }) => ({
  links: many(linksTable),
}));

export const linkRelations = relations(linksTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [linksTable.userId],
    references: [usersTable.id],
  }),
}));
