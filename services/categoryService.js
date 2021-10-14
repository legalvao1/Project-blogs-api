const { Category } = require('../models');

const {
  validateCategory,
} = require('../middlewares/validationMiddlewares');

const createCategory = async ({ name }) => {
  if (validateCategory(name).err) return validateCategory(name);

  const { id } = await Category.create({ name });

  return { id, name };
};

const getCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  createCategory,
  getCategories,
};