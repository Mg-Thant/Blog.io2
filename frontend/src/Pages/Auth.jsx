import React from "react";
import AuthForm from "../Components/AuthForm";
import { json, redirect } from "react-router-dom";

const Auth = () => {
  return (
    <section>
      <AuthForm />
    </section>
  );
};

export default Auth;

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  let mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({message : "Oops sorry..."})
  }

  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const res = await fetch(`${import.meta.env.VITE_DOMAIN}/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (res.status === 422 || res.status === 401) {
    return res;
  }

  if (!res.ok) {
    throw json({message : "Something went wrong"})
  }

  const resData = await res.json();
  const authToken = resData.token;

  localStorage.setItem("token", authToken);
  const expDate = new Date();
  expDate.setHours(expDate.getHours() + 1);
  localStorage.setItem("exp", expDate.toISOString());

  return redirect("/");
};
