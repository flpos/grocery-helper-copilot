import { ShoppingListItem } from '@domain/entities';
import { IShoppingListItemRepository } from '@domain/interfaces';
import {
  CreateShoppingListItemDTO,
  UpdateShoppingListItemDTO,
  ShoppingListItemResponseDTO,
} from '@application/dtos';
import { generateId } from '@infrastructure/database/utils';

export class ShoppingListItemService {
  constructor(private shoppingListItemRepository: IShoppingListItemRepository) {}

  async createShoppingListItem(
    dto: CreateShoppingListItemDTO
  ): Promise<ShoppingListItemResponseDTO> {
    const item = new ShoppingListItem(
      generateId(),
      dto.shoppingListId,
      dto.stockItemId,
      dto.quantity,
      dto.priority,
      false,
      new Date()
    );

    const created = await this.shoppingListItemRepository.create(item);

    return this.mapToResponse(created);
  }

  async getShoppingListItemById(id: string): Promise<ShoppingListItemResponseDTO | null> {
    const item = await this.shoppingListItemRepository.findById(id);
    if (!item) return null;

    return this.mapToResponse(item);
  }

  async getShoppingListItemsByList(
    shoppingListId: string
  ): Promise<ShoppingListItemResponseDTO[]> {
    const items = await this.shoppingListItemRepository.findByShoppingListId(
      shoppingListId
    );

    return items.map((item) => this.mapToResponse(item));
  }

  async getAllShoppingListItems(): Promise<ShoppingListItemResponseDTO[]> {
    const items = await this.shoppingListItemRepository.findAll();

    return items.map((item) => this.mapToResponse(item));
  }

  async updateShoppingListItem(
    dto: UpdateShoppingListItemDTO
  ): Promise<ShoppingListItemResponseDTO> {
    const item = await this.shoppingListItemRepository.findById(dto.id);
    if (!item) throw new Error(`Shopping list item with id ${dto.id} not found`);

    item.quantity = dto.quantity;
    item.priority = dto.priority;
    item.purchased = dto.purchased;

    const updated = await this.shoppingListItemRepository.update(item);

    return this.mapToResponse(updated);
  }

  async markAsPurchased(id: string): Promise<ShoppingListItemResponseDTO> {
    const item = await this.shoppingListItemRepository.findById(id);
    if (!item) throw new Error(`Shopping list item with id ${id} not found`);

    item.purchased = true;

    const updated = await this.shoppingListItemRepository.update(item);

    return this.mapToResponse(updated);
  }

  async deleteShoppingListItem(id: string): Promise<void> {
    await this.shoppingListItemRepository.delete(id);
  }

  private mapToResponse(item: ShoppingListItem): ShoppingListItemResponseDTO {
    return new ShoppingListItemResponseDTO(
      item.id,
      item.shoppingListId,
      item.stockItemId,
      item.quantity,
      item.priority,
      item.purchased,
      item.createdAt
    );
  }
}
