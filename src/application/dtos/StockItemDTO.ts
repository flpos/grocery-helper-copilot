export class CreateStockItemDTO {
  constructor(
    public name: string,
    public categoryId: string,
    public quantity: number,
    public unit: string
  ) {}
}

export class UpdateStockItemDTO {
  constructor(
    public id: string,
    public name: string,
    public categoryId: string,
    public quantity: number,
    public unit: string
  ) {}
}

export class StockItemResponseDTO {
  constructor(
    public id: string,
    public name: string,
    public categoryId: string,
    public quantity: number,
    public unit: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
