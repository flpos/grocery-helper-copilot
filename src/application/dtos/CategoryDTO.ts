export class CreateCategoryDTO {
  constructor(
    public name: string,
    public description?: string
  ) {}
}

export class UpdateCategoryDTO {
  constructor(
    public id: string,
    public name: string,
    public description?: string
  ) {}
}

export class CategoryResponseDTO {
  constructor(
    public id: string,
    public name: string,
    public description?: string,
    public createdAt?: Date
  ) {}
}
