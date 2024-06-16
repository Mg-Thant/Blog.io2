import { createBrowserRouter, Form, RouterProvider } from "react-router-dom";
import Main from "./Layout/Main";
import { action as postCreateAction }  from "./Components/PostForm";
import { action as postUpdateAction }  from "./Components/PostForm";
import { action as authAction } from "./Pages/Auth";
import { loader as postsLoader } from "./Pages/Posts";
import { loader as logoutLoader } from "./Pages/Logout";
import  { action as deleteAction } from "./Pages/Details";
import { loader as detailsLoader } from "./Pages/Details";
import { checkTokenLoader, tokenLoader } from "./util/auth";
import { Error, Posts, Create, Auth, ReAsk, Details, Edit } from "./Pages/index";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <Error />,
      id : "root",
      loader : tokenLoader,
      children: [
        {
          index: true,
          element: <Posts />,
          loader: postsLoader,
        },
        {
          path: "/create-post",
          element: <Create />,
          action: postCreateAction,
          loader : checkTokenLoader,
        },
        {
          path : "/auth",
          element : <Auth />,
          action : authAction
        },
        {
          path : "/logout",
          loader : logoutLoader
        },
        {
          path : "/re-ask",
          element : <ReAsk />
        },
        {
          path: ":id",
          id: "post-detail",
          loader: detailsLoader,
          children: [
            {
              index : true,
              element: <Details />,
              action: deleteAction,
            },
            {
              path: "edit-post",
              element: <Edit />,
              action : postUpdateAction,
              loader : checkTokenLoader,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
