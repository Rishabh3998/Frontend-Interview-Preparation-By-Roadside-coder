import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import "./App.css";
import Posts, { postLoader } from "./pages/Posts";
import PostComments from "./pages/PostComments";

// The new way is to use createBrowserRouter
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/posts", element: <Posts />, loader: postLoader },
      { path: "/posts/:postId", element: <PostComments /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
