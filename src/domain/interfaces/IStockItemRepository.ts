import { StockItem } from '../entities/StockItem';

export interface IStockItemRepository {
  create(item: StockItem): Promise<StockItem>;
  findById(id: string): Promise<StockItem | null>;
  findByCategoryId(categoryId: string): Promise<StockItem[]>;
  findAll(): Promise<StockItem[]>;
  update(item: StockItem): Promise<StockItem>;
  delete(id: string): Promise<void>;
}
