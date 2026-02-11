import { Request, Response } from 'express';
import { ShoppingListService } from '@application/services';
import { CreateShoppingListDTO, UpdateShoppingListDTO } from '@application/dtos';

export class ShoppingListController {
  constructor(private shoppingListService: ShoppingListService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, resourceType, resourceDate } = req.body;
      const dto = new CreateShoppingListDTO(
        name,
        description,
        resourceType,
        resourceDate ? new Date(resourceDate) : undefined
      );
      const result = await this.shoppingListService.createShoppingList(dto);

      res.status(201).render('partials/shopping_list', result);
    } catch (error) {
      res.status(400).render('partials/error', {
        error: (error as Error).message,
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.shoppingListService.getShoppingListById(id);

      if (!result) {
        res.status(404).render('partials/error', {
          error: 'Lista de compras não encontrada',
        });
        return;
      }

      res.render('partials/shopping_list', result);
    } catch (error) {
      res.status(500).render('partials/error', {
        error: (error as Error).message,
      });
    }
  }

  async showEditForm(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.shoppingListService.getShoppingListById(id);

      if (!result) {
        res.status(404).render('partials/error', {
          error: 'Lista de compras não encontrada',
        });
        return;
      }

      res.render('partials/shopping_list_edit_form', result);
    } catch (error) {
      res.status(500).render('partials/error', {
        error: (error as Error).message,
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, description, resourceType, resourceDate } = req.body;
      const dto = new UpdateShoppingListDTO(
        id,
        name,
        description,
        resourceType,
        resourceDate ? new Date(resourceDate) : undefined
      );
      const result = await this.shoppingListService.updateShoppingList(dto);

      res.render('partials/shopping_list', result);
    } catch (error) {
      res.status(400).render('partials/error', {
        error: (error as Error).message,
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.shoppingListService.deleteShoppingList(id);

      res.status(200).send('');
    } catch (error) {
      res.status(500).render('partials/error', {
        error: (error as Error).message,
      });
    }
  }
}
