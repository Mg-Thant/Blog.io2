import { CalendarDaysIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";

const PostDetails = ({ post }) => {
  const { title, description, date, image } = post;
  const isToken = useRouteLoaderData("root");
  const submit = useSubmit();

  const postDeleteHandler = () => {
    const confirmStatus = window.confirm(
      "Are you sure want to delete this post?"
    );

    if (confirmStatus) {
      submit(null, {
        method: "DELETE",
      });
    } else {
      return ;
    }
  };

  return (
    <section className="details">
      <div className="details-header">
        <div>
          <p className="details-title">{title}</p>
          <p className="date">
            <CalendarDaysIcon className="clock-icon" /> <span>{date}</span>
          </p>
        </div>
        <Link to={"/"}>
          <ArrowLeftIcon className="arrow-left-icon" />
        </Link>
      </div>
      <img src={image} alt={title} />
      <p className="description">{description}</p>
      {
        isToken && <div className="details-footer">
        <Link to={`edit-post`}>
          <p className="sm">Edit</p>
        </Link>
        <p className="sm" onClick={postDeleteHandler}>
          Delete
        </p>
      </div>
      }
    </section>
  );
};

export default PostDetails;
