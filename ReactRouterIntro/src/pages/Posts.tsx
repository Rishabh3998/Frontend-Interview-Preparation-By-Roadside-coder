/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoaderData } from "react-router-dom";
import PostCard from "../components/PostCard";
import axios from "axios";

const Posts = () => {
  // The fetched data will be received from the loader component i.e. postLoader
  // Now the data will be only rendered when it will be fetched.
  const { data: posts } = useLoaderData();
  // This is the old way to fetch the data, now we can use loader from react router
  //   const [posts, setPosts] = useState([]);
  //   const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const data = await fetch(
  //         "https://jsonplaceholder.typicode.com/posts?_limit=10"
  //       );
  //       const jsonData = await data.json();
  //       setPosts(jsonData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }
  return (
    <div>
      {posts?.map((post: any) => (
        <div key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export async function postLoader() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts?_limit=10"
  );
  return response;
}

export default Posts;
