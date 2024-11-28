import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateBlog, removeBlog, isOwner }) => {
  const [showDetails, setShowDetails] = useState(false);

  const changeView = () => {
    setShowDetails(!showDetails);
  };
  const addLike = async () => {
    updateBlog({
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    });
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {" "}
      {blog.title} {blog.author}{" "}
      <button onClick={changeView}>{showDetails ? "hide" : "view"}</button>
      <div style={{ display: showDetails ? "block" : "none" }}>
        {blog.url}
        <br />
        likes {blog.likes}{" "}
        <button type="button" onClick={addLike}>
          like
        </button>
        <br />
        {blog.user.name}
        <br />
        <button
          type="button"
          onClick={() => removeBlog(blog)}
          style={{ display: isOwner ? "block" : "none" }}
        >
          remove
        </button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  isOwner: PropTypes.bool.isRequired,
};

export default Blog;
