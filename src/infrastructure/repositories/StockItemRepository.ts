import { Database } from 'sqlite';
import { StockItem } from '@domain/entities';
import { IStockItemRepository } from '@domain/interfaces';
import { generateId } from '../database/utils';

export class StockItemRepository implements IStockItemRepository {
  constructor(private db: Database) {}

  async create(item: StockItem): Promise<StockItem> {
    const id = item.id || generateId();
    const createdAt = item.createdAt || new Date();
    const updatedAt = item.updatedAt || new Date();

    await this.db.run(
      `INSERT INTO stock_items (id, name, category_id, quantity, unit, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        item.name,
        item.categoryId,
        item.quantity,
        item.unit,
        createdAt.toISOString(),
        updatedAt.toISOString(),
      ]
    );

    return new StockItem(
      id,
      item.name,
      item.categoryId,
      item.quantity,
      item.unit,
      createdAt,
      updatedAt
    );
  }

  async findById(id: string): Promise<StockItem | null> {
    const row = await this.db.get(
      `SELECT id, name, category_id, quantity, unit, created_at, updated_at 
       FROM stock_items WHERE id = ?`,
      [id]
    );

    if (!row) return null;

    return new StockItem(
      row.id,
      row.name,
      row.category_id,
      row.quantity,
      row.unit,
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findByCategoryId(categoryId: string): Promise<StockItem[]> {
    const rows = await this.db.all(
      `SELECT id, name, category_id, quantity, unit, created_at, updated_at 
       FROM stock_items WHERE category_id = ? ORDER BY name`,
      [categoryId]
    );

    return rows.map(
      (row: any) =>
        new StockItem(
          row.id,
          row.name,
          row.category_id,
          row.quantity,
          row.unit,
          new Date(row.created_at),
          new Date(row.updated_at)
        )
    );
  }

  async findAll(): Promise<StockItem[]> {
    const rows = await this.db.all(
      `SELECT id, name, category_id, quantity, unit, created_at, updated_at 
       FROM stock_items ORDER BY name`
    );

    return rows.map(
      (row: any) =>
        new StockItem(
          row.id,
          row.name,
          row.category_id,
          row.quantity,
          row.unit,
          new Date(row.created_at),
          new Date(row.updated_at)
        )
    );
  }

  async update(item: StockItem): Promise<StockItem> {
    const updatedAt = new Date();

    await this.db.run(
      `UPDATE stock_items SET name = ?, category_id = ?, quantity = ?, unit = ?, updated_at = ? 
       WHERE id = ?`,
      [item.name, item.categoryId, item.quantity, item.unit, updatedAt.toISOString(), item.id]
    );

    return new StockItem(
      item.id,
      item.name,
      item.categoryId,
      item.quantity,
      item.unit,
      item.createdAt,
      updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await this.db.run(`DELETE FROM stock_items WHERE id = ?`, [id]);
  }
}
