import { ShoppingList } from '../entities/ShoppingList';

export interface IShoppingListRepository {
  create(list: ShoppingList): Promise<ShoppingList>;
  findById(id: string): Promise<ShoppingList | null>;
  findAll(): Promise<ShoppingList[]>;
  update(list: ShoppingList): Promise<ShoppingList>;
  delete(id: string): Promise<void>;
}
