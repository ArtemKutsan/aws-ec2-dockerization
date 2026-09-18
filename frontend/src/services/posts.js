import appConfig from '../config/app.js';

export const getPosts = async () => {
  const response = await fetch(`${appConfig.apiUrl}/posts`);

  if (!response.ok) throw new Error('Не удалось загрузить посты');

  return response.json();
};

export const createPost = async (postData) => {
  console.log('→ POST /posts: отправляем данные Post в backend');
  const response = await fetch(`${appConfig.apiUrl}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  });

  console.log(`← POST /posts: ${response.status} ${response.statusText}`);
  if (!response.ok) throw new Error('Не удалось сохранить пост');

  const post = await response.json();
  console.log(`✓ Backend создал Post #${post.id}`);
  return post;
};

export const deletePost = async (id) => {
  console.log(`→ DELETE /posts/${id}: удаляем Post`);
  const response = await fetch(`${appConfig.apiUrl}/posts/${id}`, { method: 'DELETE' });

  console.log(`← DELETE /posts/${id}: ${response.status} ${response.statusText}`);
  if (!response.ok) throw new Error('Не удалось удалить пост');
};
