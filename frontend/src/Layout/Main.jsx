import {
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import NavBar from "../Components/NavBar";
import { useEffect } from "react";
import { getExpDuration } from "../util/auth";
const Main = () => {
  const token = useLoaderData();
  const submit = useSubmit();
  const navigation = useNavigation();
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "Token has expired") {
      submit(null, { action: "/logout", method: "post" });
    }

    const duration = getExpDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, duration);
  }, [token, submit]);
  return (
    <>
      <NavBar />
      <section className="main">
        {navigation.state === "loading" ? (
          <div className="loader"></div>
        ) : (
          <Outlet />
        )}
      </section>
    </>
  );
};

export default Main;
