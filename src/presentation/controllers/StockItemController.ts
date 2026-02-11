import { Request, Response } from 'express';
import { StockItemService, CategoryService } from '@application/services';
import { CreateStockItemDTO, UpdateStockItemDTO } from '@application/dtos';

export class StockItemController {
  constructor(
    private stockItemService: StockItemService,
    private categoryService: CategoryService
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, categoryId, quantity, unit } = req.body;
      const dto = new CreateStockItemDTO(name, categoryId, quantity, unit);
      const result = await this.stockItemService.createStockItem(dto);

      res.status(201).render('partials/stock_item', result);
    } catch (error) {
      res.status(400).render('partials/error', {
        error: (error as Error).message,
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.stockItemService.getStockItemById(id);

      if (!result) {
        res.status(404).render('partials/error', {
          error: 'Item do estoque não encontrado',
        });
        return;
      }

      res.render('partials/stock_item', result);
    } catch (error) {
      res.status(500).render('partials/error', {
        error: (error as Error).message,
      });
    }
  }

  async showEditForm(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.stockItemService.getStockItemById(id);

      if (!result) {
        res.status(404).render('partials/error', {
          error: 'Item do estoque não encontrado',
        });
        return;
      }

      const categories = await this.categoryService.getAllCategories();
      res.render('partials/stock_item_edit_form', {
        ...result,
        categories,
      });
    } catch (error) {
      res.status(500).render('partials/error', {
        error: (error as Error).message,
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, categoryId, quantity, unit } = req.body;
      const dto = new UpdateStockItemDTO(id, name, categoryId, quantity, unit);
      const result = await this.stockItemService.updateStockItem(dto);

      res.render('partials/stock_item', result);
    } catch (error) {
      res.status(400).render('partials/error', {
        error: (error as Error).message,
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.stockItemService.deleteStockItem(id);

      res.status(200).send('');
    } catch (error) {
      res.status(500).render('partials/error', {
        error: (error as Error).message,
      });
    }
  }
}
