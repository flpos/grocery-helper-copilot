import type { PriorityLevel } from '@domain/entities';

export class CreateShoppingListItemDTO {
  constructor(
    public shoppingListId: string,
    public stockItemId: string,
    public quantity: number,
    public priority: PriorityLevel
  ) {}
}

export class UpdateShoppingListItemDTO {
  constructor(
    public id: string,
    public quantity: number,
    public priority: PriorityLevel,
    public purchased: boolean
  ) {}
}

export class ShoppingListItemResponseDTO {
  constructor(
    public id: string,
    public shoppingListId: string,
    public stockItemId: string,
    public quantity: number,
    public priority: PriorityLevel,
    public purchased: boolean,
    public createdAt: Date
  ) {}
}
