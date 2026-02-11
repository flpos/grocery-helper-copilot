import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import fs from 'fs';
import config from '../config/environment';

let db: Database | null = null;

export async function initializeDatabase(): Promise<Database> {
  if (db) {
    return db;
  }

  const dbPath = config.database.path;
  const dbDir = path.dirname(dbPath);

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec('PRAGMA foreign_keys = ON');

  await runMigrations(db);

  return db;
}

export async function getDatabase(): Promise<Database> {
  if (!db) {
    return initializeDatabase();
  }
  return db;
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
  }
}

async function runMigrations(database: Database): Promise<void> {
  const migrations = [
    createCategoriesTable,
    createStockItemsTable,
    createShoppingListsTable,
    createShoppingListItemsTable,
  ];

  for (const migration of migrations) {
    await migration(database);
  }
}

async function createCategoriesTable(database: Database): Promise<void> {
  await database.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function createStockItemsTable(database: Database): Promise<void> {
  await database.exec(`
    CREATE TABLE IF NOT EXISTS stock_items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category_id TEXT NOT NULL,
      quantity REAL NOT NULL DEFAULT 0,
      unit TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
    )
  `);
}

async function createShoppingListsTable(database: Database): Promise<void> {
  await database.exec(`
    CREATE TABLE IF NOT EXISTS shopping_lists (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      resource_type TEXT CHECK(resource_type IN ('salary', 'food_voucher', 'other')),
      resource_date DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function createShoppingListItemsTable(
  database: Database
): Promise<void> {
  await database.exec(`
    CREATE TABLE IF NOT EXISTS shopping_list_items (
      id TEXT PRIMARY KEY,
      shopping_list_id TEXT NOT NULL,
      stock_item_id TEXT NOT NULL,
      quantity REAL NOT NULL,
      priority TEXT NOT NULL CHECK(priority IN ('high', 'medium', 'low')),
      purchased BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (shopping_list_id) REFERENCES shopping_lists(id) ON DELETE CASCADE,
      FOREIGN KEY (stock_item_id) REFERENCES stock_items(id) ON DELETE RESTRICT
    )
  `);
}
