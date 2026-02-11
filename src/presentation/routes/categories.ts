import { Router, Request, Response } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { CategoryService } from '@application/services';
import { CategoryRepository } from '@infrastructure/repositories';
import { getDatabase } from '@infrastructure/database';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const categoryRepository = new CategoryRepository(db);
    const categoryService = new CategoryService(categoryRepository);
    const categories = await categoryService.getAllCategories();

    res.render('categories', { categories });
  } catch (error) {
    res.status(500).render('error', {
      error: (error as Error).message,
    });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const db = await getDatabase();
  const categoryRepository = new CategoryRepository(db);
  const categoryService = new CategoryService(categoryRepository);
  const controller = new CategoryController(categoryService);

  await controller.create(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
  const db = await getDatabase();
  const categoryRepository = new CategoryRepository(db);
  const categoryService = new CategoryService(categoryRepository);
  const controller = new CategoryController(categoryService);

  await controller.getById(req, res);
});

router.get('/:id/edit', async (req: Request, res: Response) => {
  const db = await getDatabase();
  const categoryRepository = new CategoryRepository(db);
  const categoryService = new CategoryService(categoryRepository);
  const controller = new CategoryController(categoryService);

  await controller.showEditForm(req, res);
});

router.put('/:id', async (req: Request, res: Response) => {
  const db = await getDatabase();
  const categoryRepository = new CategoryRepository(db);
  const categoryService = new CategoryService(categoryRepository);
  const controller = new CategoryController(categoryService);

  await controller.update(req, res);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const db = await getDatabase();
  const categoryRepository = new CategoryRepository(db);
  const categoryService = new CategoryService(categoryRepository);
  const controller = new CategoryController(categoryService);

  await controller.delete(req, res);
});

export default router;
