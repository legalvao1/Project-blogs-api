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

const findCategoryById = async (id) => {
  const category = await Category.findByPk(id);
  if (category === null) {
    return { err: {
      status: 400,
      message: '"categoryIds" not found',
    } };
  }
  return true;
};

module.exports = {
  createCategory,
  getCategories,
  findCategoryById,
};