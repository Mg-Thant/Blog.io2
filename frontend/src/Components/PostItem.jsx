import { Link } from "react-router-dom";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";

const PostItem = ({ post }) => {
  const { id, title, date, image } = post;

  return (
    <section className="post">
      <div className="post-inner">
      <Link to={`${id}`}>
        <img src={image} alt={title} />
      </Link>
      <Link to={`${id}`}>
        <p className="title">{title}</p>
      </Link>
      <p className="date">
        <CalendarDaysIcon className="clock-icon" /><span>{date}</span>
      </p>
      </div>
    </section>
  );
};

export default PostItem;
