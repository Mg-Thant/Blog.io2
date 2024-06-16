import React from "react";
import { Form, Link, json, redirect, useActionData, useNavigation } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import uuid from "react-uuid";
import { getToken } from "../util/auth";

const PostForm = ({ header, btnText, oldData, method }) => {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <section className="form-section">
      <div className="details-header">
        <p>{header}</p>
        <Link to={"/"}>
          <ArrowLeftIcon className="arrow-left-icon" />
        </Link>
      </div>
      <Form method={method}>
        <div className="form-input">
          {data?.errors?.title && <p className="error">{data.errors.title}</p>}
          <label htmlFor="form-title">Title</label>
          <input
            type="text"
            id="form-title"
            name="title"
            defaultValue={oldData ? oldData.title : ""}
            className="post-input"
          />
        </div>

        <div>
          {data?.errors?.image && <p className="error">{data.errors.image}</p>}
          <label htmlFor="form-image">Image Url</label>
          <input
            type="url"
            id="form-image"
            name="image"
            defaultValue={oldData ? oldData.image : ""}
            className="post-input"
          />
        </div>
        <div>
          {data?.errors?.date && <p className="error">{data.errors.date}</p>}
          <label htmlFor="form-date">Date</label>
          <input
            type="date"
            id="form-date"
            name="date"
            defaultValue={oldData && oldData.date}
            className="post-input"
          />
        </div>
        <div>
          {data?.errors?.description && <p className="error">{data.errors.description}</p>}
          <label htmlFor="form-description">Description</label>
          <textarea
            name="description"
            id="form-description"
            cols="20"
            rows="3"
            defaultValue={oldData ? oldData.description : ""}
            className="post-input"
          ></textarea>
        </div>
        <button type="submit" className="btn">
          {
            isSubmitting ? <span className="spinner"></span> : btnText  
          }
        </button>
      </Form>
    </section>
  );
};

export default PostForm;

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const method = request.method;
  const token = getToken();
  const postData = {
    id: uuid(),
    title: data.get("title"),
    description: data.get("description"),
    image: data.get("image"),
    date: data.get("date"),
  };

  let url = `${import.meta.env.VITE_DOMAIN}/posts`;
  if (method === "PATCH") {
    const id = params.id;
    url = `${import.meta.env.VITE_DOMAIN}/posts/${id}`;
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization : "Bearer " + token
    },
    body: JSON.stringify(postData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Post can't load. Try again later" });
  } else {
    return redirect("/");
  }
};
