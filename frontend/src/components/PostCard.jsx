function PostCard({ post, onDelete }) {
  return (
    <article className="post-card">
      <div>
        <p>
          POST #{post.id} · USER #{post.userId}
        </p>
        <h3>{post.title}</h3>
        <p>{post.text}</p>
      </div>

      <button type="button" onClick={() => onDelete(post.id)}>
        Удалить пост
      </button>
    </article>
  );
}

export default PostCard;
