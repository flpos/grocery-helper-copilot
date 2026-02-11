import { Database } from 'sqlite';
import { Category } from '@domain/entities';
import { ICategoryRepository } from '@domain/interfaces';
import { generateId, toCamelCase } from '../database/utils';

export class CategoryRepository implements ICategoryRepository {
  constructor(private db: Database) {}

  async create(category: Category): Promise<Category> {
    const id = category.id || generateId();
    const createdAt = category.createdAt || new Date();

    await this.db.run(
      `INSERT INTO categories (id, name, description, created_at) VALUES (?, ?, ?, ?)`,
      [id, category.name, category.description || null, createdAt.toISOString()]
    );

    return new Category(id, category.name, category.description, createdAt);
  }

  async findById(id: string): Promise<Category | null> {
    const row = await this.db.get(
      `SELECT id, name, description, created_at FROM categories WHERE id = ?`,
      [id]
    );

    if (!row) return null;

    return new Category(
      row.id,
      row.name,
      row.description,
      new Date(row.created_at)
    );
  }

  async findAll(): Promise<Category[]> {
    const rows = await this.db.all(
      `SELECT id, name, description, created_at FROM categories ORDER BY name`
    );

    return rows.map(
      (row: any) =>
        new Category(
          row.id,
          row.name,
          row.description,
          new Date(row.created_at)
        )
    );
  }

  async update(category: Category): Promise<Category> {
    await this.db.run(
      `UPDATE categories SET name = ?, description = ? WHERE id = ?`,
      [category.name, category.description || null, category.id]
    );

    return new Category(
      category.id,
      category.name,
      category.description,
      category.createdAt
    );
  }

  async delete(id: string): Promise<void> {
    await this.db.run(`DELETE FROM categories WHERE id = ?`, [id]);
  }
}
