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

// @desc    Delete a menu
// @route   DELETE /api/menus/:id
// @access  Private/Admin
const deleteMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);

  if (menu) {
    await menu.remove();
    res.json({ message: 'Menu removed' });
  } else {
    res.status(404);
    throw new Error('Menu not found');
  }
});

// @desc    Create a menu
// @route   POST /api/menus
// @access  Private/Admin
const createMenu = asyncHandler(async (req, res) => {
  const menu = new Menu({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'Breakfast',
    orderStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdMenu = await menu.save();
  res.status(201).json(createdMenu);
});

// @desc    Update a menu
// @route   PUT /api/menus/:id
// @access  Private/Admin
const updateMenu = asyncHandler(async (req, res) => {
  const { name, price, description, image, category, orderStock } = req.body;

  const menu = await Menu.findById(req.params.id);

  if (menu) {
    menu.name = name;
    menu.price = price;
    menu.description = description;
    menu.image = image;
    menu.category = category;
    menu.orderStock = orderStock;

    const updatedMenu = await menu.save();
    res.json(updatedMenu);
  } else {
    res.status(404);
    throw new Error('Menu not found');
  }
});

export { getMenuById, getMenus, deleteMenu, createMenu, updateMenu };
