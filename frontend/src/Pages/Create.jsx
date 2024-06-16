import React from "react";
import PostForm from "../Components/PostForm";


const Create = () => {
  return (
    <>
      <PostForm header={"Create your blog post..."} btnText={"Create Post"} method={"post"}/>
    </>
  );
};

export default Create;

