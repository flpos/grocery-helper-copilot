import type { ResourceType } from '@domain/entities';

export class CreateShoppingListDTO {
  constructor(
    public name: string,
    public description?: string,
    public resourceType?: ResourceType,
    public resourceDate?: Date
  ) {}
}

export class UpdateShoppingListDTO {
  constructor(
    public id: string,
    public name: string,
    public description?: string,
    public resourceType?: ResourceType,
    public resourceDate?: Date
  ) {}
}

export class ShoppingListResponseDTO {
  constructor(
    public id: string,
    public name: string,
    public description?: string,
    public resourceType?: ResourceType,
    public resourceDate?: Date,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
