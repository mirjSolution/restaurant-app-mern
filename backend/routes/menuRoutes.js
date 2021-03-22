import express from 'express';

const router = express.Router();

import { getMenus, getMenuById } from '../controllers/menuController.js';

router.route('/').get(getMenus);
router.route('/:id').get(getMenuById);

export default router;
