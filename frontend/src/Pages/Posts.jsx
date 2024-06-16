import { json, useLoaderData } from "react-router-dom";
import PostItem from "../Components/PostItem";

const Posts = () => {
  const posts = useLoaderData();

  return (
    <section className="posts">
      {posts.length > 0 &&
        posts.map((post) => <PostItem post={post} key={post.id} />)}
    </section>
  );
};

export default Posts;

export const loader = async () => {
  const res = await fetch(`${import.meta.env.VITE_DOMAIN}/posts`);
  if (!res.ok) {
    throw json({
      message: "Can't get our posts. Come back later",
    }, { status : 404});
  } else {
    const resData = await res.json();
    return resData.posts;
  }
};
