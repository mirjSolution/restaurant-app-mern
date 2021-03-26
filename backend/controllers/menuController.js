import fs from 'fs';
import path from 'path';
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
  const __dirname = path.resolve();

  if (menu.image) {
    fs.unlink(path.join(__dirname, menu.image), (err) => {
      console.log(err);
    });
  }

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
    orderCount: 0,
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

    fs.unlink(menu.image, (err) => {
      console.log(err);
    });

    const updatedMenu = await menu.save();
    res.json(updatedMenu);
  } else {
    res.status(404);
    throw new Error('Menu not found');
  }
});

// @desc    Create new review
// @route   POST /api/menu/:id/reviews
// @access  Private
const createMenuReview = asyncHandler(async (req, res) => {
  const { rating, comment, userId, name } = req.body;

  const menu = await await Menu.findById(req.params.id);

  if (menu) {
    const alreadyReviewed = menu.reviews.find(
      (r) => r.user.toString() === userId.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Menu already reviewed');
    }

    const review = {
      name,
      rating: Number(rating),
      comment,
      user: userId,
    };

    menu.reviews.push(review);

    menu.numReviews = menu.reviews.length;

    menu.rating =
      menu.reviews.reduce((acc, item) => item.rating + acc, 0) /
      menu.reviews.length;

    await menu.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Menu not found');
  }
});

export {
  getMenuById,
  getMenus,
  deleteMenu,
  createMenu,
  updateMenu,
  createMenuReview,
};
