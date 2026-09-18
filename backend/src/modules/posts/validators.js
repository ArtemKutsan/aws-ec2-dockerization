import { hasRequiredFields, hasText, isPositiveInteger } from '#utils';

// Проверяет body создания Post и возвращает нормализованные данные или null.
export const validateCreatePost = (body = {}) => {
  const data = body ?? {};
  const { userId, title, text } = data;
  const parsedUserId = Number(userId);

  if (
    !hasRequiredFields(data, ['userId', 'title', 'text']) ||
    !isPositiveInteger(parsedUserId) ||
    !hasText(title) ||
    !hasText(text)
  ) {
    return null;
  }

  return {
    userId: parsedUserId,
    title: title.trim(),
    text: text.trim(),
  };
};
