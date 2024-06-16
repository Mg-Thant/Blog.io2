import React from "react";
import { json, redirect, useRouteLoaderData } from "react-router-dom";
import PostDetails from "../Components/PostDetails";
import { getToken } from "../util/auth";

const Details = () => {
  const post = useRouteLoaderData("post-detail");

  return (
    <section>
      <PostDetails post={post} />
    </section>
  );
};

export default Details;

export const loader = async ({ params }) => {
  const res = await fetch(`${import.meta.env.VITE_DOMAIN}/posts/${params.id}`);
  if (!res.ok) {
    throw json({ message: "Not Found" });
  } else {
    const data = await res.json();
    return data.post;
  }
};

export const action = async ({ request, params }) => {
  const token = getToken();
  const res = await fetch(`${import.meta.env.VITE_DOMAIN}/posts/${params.id}`, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    // error handling
    throw json({ message: "Failed to delete" });
  } else {
    return redirect("/");
  }
};
