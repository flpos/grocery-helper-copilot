export type PriorityLevel = 'high' | 'medium' | 'low';

export class ShoppingListItem {
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
