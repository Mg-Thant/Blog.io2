import React from 'react'
import PostForm from '../Components/PostForm';
import { useRouteLoaderData } from 'react-router-dom';

const Edit = () => {
  const post = useRouteLoaderData("post-detail");
  return (
    <>
      <PostForm header={"Edit your post..."} btnText={"Update Post"} oldData={post} method={"patch"} />
    </>
  )  
}

export default Edit; 
