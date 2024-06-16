import React from "react";
import {
  Link,
  Form,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

const AuthForm = () => {
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <section className="form-section">
      <p>{isLogin ? "Login to your account" : "Create your account"}</p>
      <Form method="post">
        <div className="form-input">
          {data?.message && <p>{data.message}</p>}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="post-input"
          />
        </div>
        <div className="form-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="post-input"
          />
        </div>
        <button className="btn login-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="spinner"></span>
          ) : isLogin ? (
            "Login"
          ) : (
            "Register"
          )}
        </button>
      </Form>
      {isLogin ? (
        <p className="create-acc">
          Don't have an account?{" "}
          <Link to={"/auth?mode=signup"}>Register here</Link>
        </p>
      ) : (
        <p className="create-acc">
          Already have an account?{" "}
          <Link to={"/auth?mode=login"}>Login here</Link>
        </p>
      )}
    </section>
  );
};

export default AuthForm;
