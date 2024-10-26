import { Link } from "react-router-dom";

const PostCard = ({
  post,
}: {
  post: { id: number; title: string; body: string };
}) => {
  return (
    <div
      style={{
        color: "#fff",
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h3 className="text-wrap" style={{ color: "#fff" }}>
        {post?.title}
      </h3>
      <p className="text-wrap">{post?.body}</p>
      <Link to={`/posts/${post.id}`}>View comments</Link>
    </div>
  );
};

export default PostCard;
