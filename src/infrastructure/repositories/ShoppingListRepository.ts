import { Database } from 'sqlite';
import { ShoppingList, type ResourceType } from '@domain/entities';
import { IShoppingListRepository } from '@domain/interfaces';
import { generateId } from '../database/utils';

export class ShoppingListRepository implements IShoppingListRepository {
  constructor(private db: Database) {}

  async create(list: ShoppingList): Promise<ShoppingList> {
    const id = list.id || generateId();
    const createdAt = list.createdAt || new Date();
    const updatedAt = list.updatedAt || new Date();

    await this.db.run(
      `INSERT INTO shopping_lists (id, name, description, resource_type, resource_date, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        list.name,
        list.description || null,
        list.resourceType || null,
        list.resourceDate ? list.resourceDate.toISOString() : null,
        createdAt.toISOString(),
        updatedAt.toISOString(),
      ]
    );

    return new ShoppingList(
      id,
      list.name,
      list.description,
      list.resourceType,
      list.resourceDate,
      createdAt,
      updatedAt
    );
  }

  async findById(id: string): Promise<ShoppingList | null> {
    const row = await this.db.get(
      `SELECT id, name, description, resource_type, resource_date, created_at, updated_at 
       FROM shopping_lists WHERE id = ?`,
      [id]
    );

    if (!row) return null;

    return new ShoppingList(
      row.id,
      row.name,
      row.description,
      row.resource_type as ResourceType,
      row.resource_date ? new Date(row.resource_date) : undefined,
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findAll(): Promise<ShoppingList[]> {
    const rows = await this.db.all(
      `SELECT id, name, description, resource_type, resource_date, created_at, updated_at 
       FROM shopping_lists ORDER BY created_at DESC`
    );

    return rows.map(
      (row: any) =>
        new ShoppingList(
          row.id,
          row.name,
          row.description,
          row.resource_type as ResourceType,
          row.resource_date ? new Date(row.resource_date) : undefined,
          new Date(row.created_at),
          new Date(row.updated_at)
        )
    );
  }

  async update(list: ShoppingList): Promise<ShoppingList> {
    const updatedAt = new Date();

    await this.db.run(
      `UPDATE shopping_lists SET name = ?, description = ?, resource_type = ?, resource_date = ?, updated_at = ? 
       WHERE id = ?`,
      [
        list.name,
        list.description || null,
        list.resourceType || null,
        list.resourceDate ? list.resourceDate.toISOString() : null,
        updatedAt.toISOString(),
        list.id,
      ]
    );

    return new ShoppingList(
      list.id,
      list.name,
      list.description,
      list.resourceType,
      list.resourceDate,
      list.createdAt,
      updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await this.db.run(`DELETE FROM shopping_lists WHERE id = ?`, [id]);
  }
}
