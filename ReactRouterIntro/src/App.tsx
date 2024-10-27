import {
  // BrowserRouter,
  createBrowserRouter,
  // Route,
  RouterProvider,
  // Routes,
} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import "./App.css";
import Posts, { postLoader } from "./pages/Posts";
import PostComments from "./pages/PostComments";
import Error from "./components/Error";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import RequireAuth from "./components/RequireAuth";
import Product from "./pages/Product";
// import Header from "./components/Header";

// The new way is to use createBrowserRouter
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/sign-up", element: <SignUp /> },
        ],
      },
      {
        path: "/posts",
        element: (
          <RequireAuth>
            <Posts />
          </RequireAuth>
        ),
        loader: postLoader,
      },
      {
        path: "/posts/:postId",
        element: (
          <RequireAuth>
            <PostComments />
          </RequireAuth>
        ),
      },
      {
        path: "/product",
        element: <Product />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;

  // Old way
  // return (
  //   <BrowserRouter>
  //     <Header />
  //     <Routes>
  //       <Route element={<Home />} path="/" />
  //       <Route element={<Posts />} path="/posts" />
  //       <Route element={<PostComments />} path="/posts/:postId" />
  //     </Routes>
  //   </BrowserRouter>
  // );
}

export default App;
