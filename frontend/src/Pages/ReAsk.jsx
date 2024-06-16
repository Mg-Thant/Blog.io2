import { Link, useNavigation } from "react-router-dom";

const ReAsk = () => {
    const {state} = useNavigation();
    const isLoading = state === "loading";
  return (
    <div>
      <p className="asking-text">
        You should be able to read the posts even if you are not logged in. But
        if you want to create, edit, delete posts, please login. Thank you for
        your interest in our website.         If you have a account, Click login or not
      </p>
      <p className="routing-link">

        <Link to={"/auth?mode=login"}>{isLoading ? <div className="loader"></div> : <span>Login here</span>}</Link>
        <Link to={"/auth?mode=signup"}>{isLoading ? <div className="loader"></div> : <span>Register here</span>}</Link>
      </p>
    </div>
  );
};

export default ReAsk;
