export class StockItem {
  constructor(
    public id: string,
    public name: string,
    public categoryId: string,
    public quantity: number,
    public unit: string, // kg, un, l, ml, etc
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
