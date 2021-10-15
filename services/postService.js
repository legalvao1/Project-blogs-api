const { BlogPost, User } = require('../models');
const categoryService = require('./categoryService');

const { 
  validateContent,
  validateTitle,
  validateCategoryId,
 } = require('../middlewares/validationMiddlewares');

const verifyCategories = async (categoryIds) => {
  const categoryExist = Promise.all(categoryIds.map((id) => categoryService.findCategoryById(id)));
  return (await categoryExist)[0];
};

const createPost = async ({ title, content, categoryIds }, { id: userId }) => {
  if (validateTitle(title).err) return validateTitle(title);
  if (validateContent(content).err) return validateContent(content);
  if (validateCategoryId(categoryIds).err) return validateCategoryId(categoryIds);

  const verifyCategory = await verifyCategories(categoryIds);
  if (verifyCategory.err) return verifyCategory;

  const { id } = await BlogPost.create({ userId, title, content, categoryIds });
  return { id, userId, title, content };
};

const getPosts = async () => {
  const posts = await BlogPost.findAll(
    { 
      include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
    },
  );
  return posts;
};

module.exports = {
  createPost,
  getPosts,
};