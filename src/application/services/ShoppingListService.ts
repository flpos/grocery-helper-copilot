import { ShoppingList } from '@domain/entities';
import { IShoppingListRepository } from '@domain/interfaces';
import {
  CreateShoppingListDTO,
  UpdateShoppingListDTO,
  ShoppingListResponseDTO,
} from '@application/dtos';
import { generateId } from '@infrastructure/database/utils';

export class ShoppingListService {
  constructor(private shoppingListRepository: IShoppingListRepository) {}

  async createShoppingList(
    dto: CreateShoppingListDTO
  ): Promise<ShoppingListResponseDTO> {
    const list = new ShoppingList(
      generateId(),
      dto.name,
      dto.description,
      dto.resourceType,
      dto.resourceDate,
      new Date(),
      new Date()
    );

    const created = await this.shoppingListRepository.create(list);

    return this.mapToResponse(created);
  }

  async getShoppingListById(id: string): Promise<ShoppingListResponseDTO | null> {
    const list = await this.shoppingListRepository.findById(id);
    if (!list) return null;

    return this.mapToResponse(list);
  }

  async getAllShoppingLists(): Promise<ShoppingListResponseDTO[]> {
    const lists = await this.shoppingListRepository.findAll();

    return lists.map((list) => this.mapToResponse(list));
  }

  async updateShoppingList(
    dto: UpdateShoppingListDTO
  ): Promise<ShoppingListResponseDTO> {
    const list = new ShoppingList(
      dto.id,
      dto.name,
      dto.description,
      dto.resourceType,
      dto.resourceDate,
      new Date(),
      new Date()
    );

    const updated = await this.shoppingListRepository.update(list);

    return this.mapToResponse(updated);
  }

  async deleteShoppingList(id: string): Promise<void> {
    await this.shoppingListRepository.delete(id);
  }

  private mapToResponse(list: ShoppingList): ShoppingListResponseDTO {
    return new ShoppingListResponseDTO(
      list.id,
      list.name,
      list.description,
      list.resourceType,
      list.resourceDate,
      list.createdAt,
      list.updatedAt
    );
  }
}
