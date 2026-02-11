import { Database } from 'sqlite';
import { randomUUID } from 'crypto';

export function generateId(): string {
  return randomUUID();
}

export function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

export function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export async function getTableSchema(
  db: Database,
  tableName: string
): Promise<Array<{ name: string; type: string }>> {
  const result = await db.all(`PRAGMA table_info(${tableName})`);
  return result.map((row: any) => ({
    name: row.name,
    type: row.type,
  }));
}
