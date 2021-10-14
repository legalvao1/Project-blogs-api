const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    if (category.err) {
      return res.status(category.err.status).json({ message: category.err.message });
    }
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCategories = async (_req, res) => {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
};