import { Database } from 'sqlite';
import { ShoppingListItem, type PriorityLevel } from '@domain/entities';
import { IShoppingListItemRepository } from '@domain/interfaces';
import { generateId } from '../database/utils';

export class ShoppingListItemRepository implements IShoppingListItemRepository {
  constructor(private db: Database) {}

  async create(item: ShoppingListItem): Promise<ShoppingListItem> {
    const id = item.id || generateId();
    const createdAt = item.createdAt || new Date();

    await this.db.run(
      `INSERT INTO shopping_list_items (id, shopping_list_id, stock_item_id, quantity, priority, purchased, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        item.shoppingListId,
        item.stockItemId,
        item.quantity,
        item.priority,
        item.purchased ? 1 : 0,
        createdAt.toISOString(),
      ]
    );

    return new ShoppingListItem(
      id,
      item.shoppingListId,
      item.stockItemId,
      item.quantity,
      item.priority,
      item.purchased,
      createdAt
    );
  }

  async findById(id: string): Promise<ShoppingListItem | null> {
    const row = await this.db.get(
      `SELECT id, shopping_list_id, stock_item_id, quantity, priority, purchased, created_at 
       FROM shopping_list_items WHERE id = ?`,
      [id]
    );

    if (!row) return null;

    return new ShoppingListItem(
      row.id,
      row.shopping_list_id,
      row.stock_item_id,
      row.quantity,
      row.priority as PriorityLevel,
      Boolean(row.purchased),
      new Date(row.created_at)
    );
  }

  async findByShoppingListId(shoppingListId: string): Promise<ShoppingListItem[]> {
    const rows = await this.db.all(
      `SELECT id, shopping_list_id, stock_item_id, quantity, priority, purchased, created_at 
       FROM shopping_list_items WHERE shopping_list_id = ? ORDER BY priority DESC, created_at`,
      [shoppingListId]
    );

    return rows.map(
      (row: any) =>
        new ShoppingListItem(
          row.id,
          row.shopping_list_id,
          row.stock_item_id,
          row.quantity,
          row.priority as PriorityLevel,
          Boolean(row.purchased),
          new Date(row.created_at)
        )
    );
  }

  async findAll(): Promise<ShoppingListItem[]> {
    const rows = await this.db.all(
      `SELECT id, shopping_list_id, stock_item_id, quantity, priority, purchased, created_at 
       FROM shopping_list_items ORDER BY created_at DESC`
    );

    return rows.map(
      (row: any) =>
        new ShoppingListItem(
          row.id,
          row.shopping_list_id,
          row.stock_item_id,
          row.quantity,
          row.priority as PriorityLevel,
          Boolean(row.purchased),
          new Date(row.created_at)
        )
    );
  }

  async update(item: ShoppingListItem): Promise<ShoppingListItem> {
    await this.db.run(
      `UPDATE shopping_list_items SET quantity = ?, priority = ?, purchased = ? 
       WHERE id = ?`,
      [item.quantity, item.priority, item.purchased ? 1 : 0, item.id]
    );

    return item;
  }

  async delete(id: string): Promise<void> {
    await this.db.run(`DELETE FROM shopping_list_items WHERE id = ?`, [id]);
  }
}
