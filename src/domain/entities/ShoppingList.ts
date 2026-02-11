export type ResourceType = 'salary' | 'food_voucher' | 'other';

export class ShoppingList {
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
