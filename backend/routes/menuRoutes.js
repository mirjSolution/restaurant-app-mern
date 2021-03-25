import express from 'express';
const router = express.Router();
import {
  getMenus,
  getMenuById,
  deleteMenu,
} from '../controllers/menuController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getMenus);
router.route('/:id').get(getMenuById).delete(protect, admin, deleteMenu);

export default router;
