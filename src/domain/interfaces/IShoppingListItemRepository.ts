import { ShoppingListItem } from '../entities/ShoppingListItem';

export interface IShoppingListItemRepository {
  create(item: ShoppingListItem): Promise<ShoppingListItem>;
  findById(id: string): Promise<ShoppingListItem | null>;
  findByShoppingListId(shoppingListId: string): Promise<ShoppingListItem[]>;
  findAll(): Promise<ShoppingListItem[]>;
  update(item: ShoppingListItem): Promise<ShoppingListItem>;
  delete(id: string): Promise<void>;
}
