import { Router, Request, Response } from 'express';
import { StockItemController } from '../controllers/StockItemController';
import { StockItemService, CategoryService } from '@application/services';
import {
  StockItemRepository,
  CategoryRepository,
} from '@infrastructure/repositories';
import { getDatabase } from '@infrastructure/database';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const stockItemRepository = new StockItemRepository(db);
    const categoryRepository = new CategoryRepository(db);
    const stockItemService = new StockItemService(stockItemRepository);
    const categoryService = new CategoryService(categoryRepository);

    const stockItems = await stockItemService.getAllStockItems();
    const categories = await categoryService.getAllCategories();

    res.render('stock_items', { stockItems, categories });
  } catch (error) {
    res.status(500).render('error', {
      error: (error as Error).message,
    });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const db = await getDatabase();
  const stockItemRepository = new StockItemRepository(db);
  const categoryRepository = new CategoryRepository(db);
  const stockItemService = new StockItemService(stockItemRepository);
  const categoryService = new CategoryService(categoryRepository);
  const controller = new StockItemController(stockItemService, categoryService);

  await controller.create(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
  const db = await getDatabase();
  const stockItemRepository = new StockItemRepository(db);
  const categoryRepository = new CategoryRepository(db);
  const stockItemService = new StockItemService(stockItemRepository);
  const categoryService = new CategoryService(categoryRepository);
  const controller = new StockItemController(stockItemService, categoryService);

  await controller.getById(req, res);
});

router.get('/:id/edit', async (req: Request, res: Response) => {
  const db = await getDatabase();
  const stockItemRepository = new StockItemRepository(db);
  const categoryRepository = new CategoryRepository(db);
  const stockItemService = new StockItemService(stockItemRepository);
  const categoryService = new CategoryService(categoryRepository);
  const controller = new StockItemController(stockItemService, categoryService);

  await controller.showEditForm(req, res);
});

router.put('/:id', async (req: Request, res: Response) => {
  const db = await getDatabase();
  const stockItemRepository = new StockItemRepository(db);
  const categoryRepository = new CategoryRepository(db);
  const stockItemService = new StockItemService(stockItemRepository);
  const categoryService = new CategoryService(categoryRepository);
  const controller = new StockItemController(stockItemService, categoryService);

  await controller.update(req, res);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const db = await getDatabase();
  const stockItemRepository = new StockItemRepository(db);
  const categoryRepository = new CategoryRepository(db);
  const stockItemService = new StockItemService(stockItemRepository);
  const categoryService = new CategoryService(categoryRepository);
  const controller = new StockItemController(stockItemService, categoryService);

  await controller.delete(req, res);
});

export default router;
