import { Post, User } from '#models';

const authorAttributes = ['id', 'fullname'];

const withAuthor = {
  model: User,
  as: 'user',
  attributes: authorAttributes,
};

// Создаёт запись Post в MySQL через Sequelize и возвращает созданную модель.
export const createPostRecord = ({ userId, title, text }) => Post.create({ userId, title, text });

export const deletePostRecord = async (id) => {
  const post = await Post.findByPk(id);

  if (!post) return null;

  await post.destroy();
  return post;
};

export const findPosts = () =>
  Post.findAll({
    include: [withAuthor],
    order: [['createdAt', 'DESC']],
  });

export const findPostById = (id) =>
  Post.findByPk(id, {
    include: [withAuthor],
  });
