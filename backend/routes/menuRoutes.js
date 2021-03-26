import express from 'express';
const router = express.Router();
import {
  getMenus,
  getMenuById,
  deleteMenu,
  createMenu,
  updateMenu,
  createMenuReview,
} from '../controllers/menuController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getMenus).post(protect, admin, createMenu);
router.route('/:id/reviews').post(protect, createMenuReview);
router
  .route('/:id')
  .get(getMenuById)
  .delete(protect, admin, deleteMenu)
  .put(protect, admin, updateMenu);

export default router;
