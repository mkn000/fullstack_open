import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const Notification = ({ notification }) => {
  if (notification) {
    const { msg, style } = notification;
    if (msg === "") {
      return null;
    }

    return <div className={style}>{msg}</div>;
  }
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("currentUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("currentUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification({ msg: "wrong credentials", style: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("currentUser");
    setUser(null);
    location.reload();
  };
  const createBlog = async (event) => {
    event.preventDefault();
    console.log("creating new blog");
    try {
      const blog = await blogService.create({ title, author, url });
      setNotification({
        msg: `a new blog ${title} by ${author} added`,
        style: "success",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      setUrl("");
      setBlogs([...blogs, blog]);
      setAuthor("");
      setTitle("");
    } catch (exception) {}
  };

  const loginForm = () => (
    <div>
      {" "}
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
  const blogsRender = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
  const blogForm = () => (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={createBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>{" "}
        <button type="submit">create</button>
      </form>
    </div>
  );
  return (
    <div>
      {!user && loginForm()}

      <Notification notification={notification} />
      {user && (
        <div>
          <p>
            {user.name} logged in{" "}
            <button onClick={handleLogout}>log out</button>
          </p>
          {blogForm()}
          {blogsRender()}
        </div>
      )}
    </div>
  );
};

export default App;
