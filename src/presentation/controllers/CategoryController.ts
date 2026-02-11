import { Request, Response } from 'express';
import { CategoryService } from '@application/services';
import { CreateCategoryDTO, UpdateCategoryDTO } from '@application/dtos';

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, description } = req.body;
      const dto = new CreateCategoryDTO(name, description);
      const result = await this.categoryService.createCategory(dto);

      res.status(201).render('partials/category-item', result);
    } catch (error) {
      res.status(400).render('partials/error', {
        error: (error as Error).message,
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.categoryService.getCategoryById(id);

      if (!result) {
        res.status(404).render('partials/error', {
          error: 'Categoria não encontrada',
        });
        return;
      }

      res.render('partials/category-item', result);
    } catch (error) {
      res.status(500).render('partials/error', {
        error: (error as Error).message,
      });
    }
  }

  async showEditForm(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.categoryService.getCategoryById(id);

      if (!result) {
        res.status(404).render('partials/error', {
          error: 'Categoria não encontrada',
        });
        return;
      }

      res.render('partials/category-edit-form', result);
    } catch (error) {
      res.status(500).render('partials/error', {
        error: (error as Error).message,
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const dto = new UpdateCategoryDTO(id, name, description);
      const result = await this.categoryService.updateCategory(dto);

      res.render('partials/category-item', result);
    } catch (error) {
      res.status(400).render('partials/error', {
        error: (error as Error).message,
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.categoryService.deleteCategory(id);

      res.status(200).send('');
    } catch (error) {
      res.status(500).render('partials/error', {
        error: (error as Error).message,
      });
    }
  }
}
