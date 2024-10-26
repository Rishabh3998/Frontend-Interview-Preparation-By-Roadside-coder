/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostComments = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState<any>([]);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { postId } = useParams();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [postResponse, commentsResponse] = await Promise.all([
        axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`),
        axios.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        ),
      ]);
      setPost(postResponse.data);
      setComments(commentsResponse.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  return (
    <div>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div>
          {post && (
            <div className="post-card">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          )}
          <h2>Comments</h2>
          <ul>
            {comments?.map((comment: any) => {
              return (
                <li key={comment.id}>
                  <strong>{comment.name}</strong>: {comment.body}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default PostComments;
