import { useState } from "react";

const Blog = ({ blog, updateBlog }) => {
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
      </div>
    </div>
  );
};

export default Blog;

