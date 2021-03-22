import asyncHandler from 'express-async-handler';
import Menu from '../models/menuModel.js';

// @desc    Fetch all menus
// @route   GET /api/menus
// @access  Public
const getMenus = asyncHandler(async (req, res) => {
  const menus = await Menu.find({});
  res.json(menus);
});

// @desc    Fetch single menu
// @route   GET /api/menus/:id
// @access  Public

const getMenuById = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);

  if (menu) {
    res.json(menu);
  } else {
    res.status(404);
  }
  throw new Error('Menu ot found');
});

export { getMenuById, getMenus };
