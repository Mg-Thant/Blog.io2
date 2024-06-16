import { redirect } from "react-router-dom";

export const getExpDuration = () => {
  const currentDateMili = new Date();
  const expDate = localStorage.getItem("exp");
  const expDateMili = new Date(expDate);

  const expiredTime = expDateMili - currentDateMili;

  return expiredTime;
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const expiredTime = getExpDuration();
  if (expiredTime < 0) {
    return "Token has expired";
  }

  return token;
};

export const tokenLoader = () => {
  return getToken();
};

export const checkTokenLoader = () => {
  const token = getToken();

  if (!token) {
    return redirect("/re-ask");
  }

  return token;
};
