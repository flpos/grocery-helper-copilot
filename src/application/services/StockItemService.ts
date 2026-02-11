import { StockItem } from '@domain/entities';
import { IStockItemRepository } from '@domain/interfaces';
import {
  CreateStockItemDTO,
  UpdateStockItemDTO,
  StockItemResponseDTO,
} from '@application/dtos';
import { generateId } from '@infrastructure/database/utils';

export class StockItemService {
  constructor(private stockItemRepository: IStockItemRepository) {}

  async createStockItem(dto: CreateStockItemDTO): Promise<StockItemResponseDTO> {
    const item = new StockItem(
      generateId(),
      dto.name,
      dto.categoryId,
      dto.quantity,
      dto.unit,
      new Date(),
      new Date()
    );

    const created = await this.stockItemRepository.create(item);

    return this.mapToResponse(created);
  }

  async getStockItemById(id: string): Promise<StockItemResponseDTO | null> {
    const item = await this.stockItemRepository.findById(id);
    if (!item) return null;

    return this.mapToResponse(item);
  }

  async getStockItemsByCategory(categoryId: string): Promise<StockItemResponseDTO[]> {
    const items = await this.stockItemRepository.findByCategoryId(categoryId);

    return items.map((item) => this.mapToResponse(item));
  }

  async getAllStockItems(): Promise<StockItemResponseDTO[]> {
    const items = await this.stockItemRepository.findAll();

    return items.map((item) => this.mapToResponse(item));
  }

  async updateStockItem(dto: UpdateStockItemDTO): Promise<StockItemResponseDTO> {
    const item = new StockItem(
      dto.id,
      dto.name,
      dto.categoryId,
      dto.quantity,
      dto.unit,
      new Date(),
      new Date()
    );

    const updated = await this.stockItemRepository.update(item);

    return this.mapToResponse(updated);
  }

  async updateStockQuantity(id: string, quantity: number): Promise<StockItemResponseDTO> {
    const item = await this.stockItemRepository.findById(id);
    if (!item) throw new Error(`Stock item with id ${id} not found`);

    item.quantity = quantity;
    item.updatedAt = new Date();

    const updated = await this.stockItemRepository.update(item);

    return this.mapToResponse(updated);
  }

  async deleteStockItem(id: string): Promise<void> {
    await this.stockItemRepository.delete(id);
  }

  private mapToResponse(item: StockItem): StockItemResponseDTO {
    return new StockItemResponseDTO(
      item.id,
      item.name,
      item.categoryId,
      item.quantity,
      item.unit,
      item.createdAt,
      item.updatedAt
    );
  }
}
