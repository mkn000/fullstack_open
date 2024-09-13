import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setBlog] = useState({ title: "", author: "", url: "" });

  const addBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setBlog({ title: "", author: "", url: "" });
  };
  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) =>
              setBlog({ ...newBlog, title: target.value })
            }
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) =>
              setBlog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) =>
              setBlog({ ...newBlog, url: target.value })
            }
          />
        </div>{" "}
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
