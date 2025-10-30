import { Router } from 'express';
import { getAll } from '../controllers/categoryController.js';

const router = Router();

router.get('/', getAll);

export default router;