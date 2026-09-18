import { useState } from 'react';
import { createPost } from '../services/posts.js';

function PostForm({ onCreated }) {
  const [userId, setUserId] = useState('1');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !text.trim()) {
      setStatus('Заполните заголовок и текст');
      return;
    }

    setIsSaving(true);

    try {
      setStatus('Сохраняем пост...');
      const post = await createPost({ userId: Number(userId), title, text });

      // Сразу добавляем новый Post в список на странице.
      onCreated(post);

      // Очищаем поля формы после успешного создания Post.
      setTitle('');
      setText('');
      event.target.reset();

      // Показываем пользователю результат операции.
      setStatus('Пост создан');
    } catch (error) {
      // Показываем ошибку, если создание Post завершилось неуспешно.
      setStatus(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <label>
        ID пользователя
        <input
          type="number"
          min="1"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
      </label>

      <label>
        Заголовок
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Например, Мой первый пост"
        />
      </label>

      <label>
        Текст
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="О чём этот пост?"
          rows="3"
        />
      </label>

      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Сохраняем...' : 'Создать пост'}
      </button>

      {status && <p className="status">{status}</p>}
    </form>
  );
}

export default PostForm;
