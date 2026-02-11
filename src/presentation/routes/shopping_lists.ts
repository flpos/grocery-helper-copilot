import { Router, Request, Response } from 'express';
import { ShoppingListController } from '../controllers/ShoppingListController';
import { ShoppingListService } from '@application/services';
import { ShoppingListRepository } from '@infrastructure/repositories';
import { getDatabase } from '@infrastructure/database';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const shoppingListRepository = new ShoppingListRepository(db);
    const shoppingListService = new ShoppingListService(shoppingListRepository);

    const shoppingLists = await shoppingListService.getAllShoppingLists();

    res.render('shopping_lists', { shoppingLists });
  } catch (error) {
    res.status(500).render('error', {
      error: (error as Error).message,
    });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const db = await getDatabase();
  const shoppingListRepository = new ShoppingListRepository(db);
  const shoppingListService = new ShoppingListService(shoppingListRepository);
  const controller = new ShoppingListController(shoppingListService);

  await controller.create(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
  const db = await getDatabase();
  const shoppingListRepository = new ShoppingListRepository(db);
  const shoppingListService = new ShoppingListService(shoppingListRepository);
  const controller = new ShoppingListController(shoppingListService);

  await controller.getById(req, res);
});

router.get('/:id/edit', async (req: Request, res: Response) => {
  const db = await getDatabase();
  const shoppingListRepository = new ShoppingListRepository(db);
  const shoppingListService = new ShoppingListService(shoppingListRepository);
  const controller = new ShoppingListController(shoppingListService);

  await controller.showEditForm(req, res);
});

router.put('/:id', async (req: Request, res: Response) => {
  const db = await getDatabase();
  const shoppingListRepository = new ShoppingListRepository(db);
  const shoppingListService = new ShoppingListService(shoppingListRepository);
  const controller = new ShoppingListController(shoppingListService);

  await controller.update(req, res);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const db = await getDatabase();
  const shoppingListRepository = new ShoppingListRepository(db);
  const shoppingListService = new ShoppingListService(shoppingListRepository);
  const controller = new ShoppingListController(shoppingListService);

  await controller.delete(req, res);
});

export default router;
