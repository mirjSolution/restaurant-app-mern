import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Menu from '../models/menuModel.js';

// @description Fetch all menus
// @route       GET /api/menus
// @access      Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const menus = await Menu.find({});

    res.json(menus);
  })
);

// @description Fetch single menu
// @route       GET /api/menus/:id
// @access      Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const menu = await Menu.findById(req.params.id);

    if (menu) {
      res.json(menu);
    } else {
      res.status(404).json({ message: 'Menu not found' });
    }
  })
);

export default router;
