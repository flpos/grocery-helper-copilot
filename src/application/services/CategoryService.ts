import { Category } from '@domain/entities';
import { ICategoryRepository } from '@domain/interfaces';
import { CreateCategoryDTO, UpdateCategoryDTO, CategoryResponseDTO } from '@application/dtos';
import { generateId } from '@infrastructure/database/utils';

export class CategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  async createCategory(dto: CreateCategoryDTO): Promise<CategoryResponseDTO> {
    const category = new Category(generateId(), dto.name, dto.description);
    const created = await this.categoryRepository.create(category);

    return new CategoryResponseDTO(
      created.id,
      created.name,
      created.description,
      created.createdAt
    );
  }

  async getCategoryById(id: string): Promise<CategoryResponseDTO | null> {
    const category = await this.categoryRepository.findById(id);
    if (!category) return null;

    return new CategoryResponseDTO(
      category.id,
      category.name,
      category.description,
      category.createdAt
    );
  }

  async getAllCategories(): Promise<CategoryResponseDTO[]> {
    const categories = await this.categoryRepository.findAll();

    return categories.map(
      (category) =>
        new CategoryResponseDTO(
          category.id,
          category.name,
          category.description,
          category.createdAt
        )
    );
  }

  async updateCategory(dto: UpdateCategoryDTO): Promise<CategoryResponseDTO> {
    const category = new Category(dto.id, dto.name, dto.description);
    const updated = await this.categoryRepository.update(category);

    return new CategoryResponseDTO(
      updated.id,
      updated.name,
      updated.description,
      updated.createdAt
    );
  }

  async deleteCategory(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
