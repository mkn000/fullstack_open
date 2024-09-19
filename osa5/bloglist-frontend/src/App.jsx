import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const Notification = ({ notification }) => {
  if (notification) {
    const { msg, style } = notification;
    if (msg === '') {
      return null;
    }

    return <div className={style}>{msg}</div>;
  }
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('currentUser');
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
    console.log('logging in with', username, password);

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('currentUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setNotification({ msg: 'wrong credentials', style: 'error' });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem('currentUser');
    setUser(null);
    location.reload();
  };
  const createBlog = async (blogObject) => {
    console.log('creating new blog');
    try {
      const blog = await blogService.create(blogObject);

      setBlogs(blogs.concat(blog));
      blogFormRef.current.toggleVisibility();
      setNotification({
        msg: `a new blog ${blog.title} by ${blog.author} added`,
        style: 'success',
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setNotification({
        msg: `${error}`,
        style: 'error',
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject);
      setBlogs(
        blogs.map((blog) => (blog.id !== blogObject.id ? blog : updatedBlog)),
      );
    } catch (error) {
      setNotification({ msg: 'update operation failed', style: 'error' });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const removeBlog = async (blogObject) => {
    try {
      const remove = window.confirm(
        `Remove ${blogObject.title} by ${blogObject.author}?`,
      );
      if (remove) {
        await blogService.remove(blogObject.id);

        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
        setNotification({ msg: 'blog removed successfully', style: 'success' });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    } catch (error) {
      setNotification({ msg: 'could not remove blog', style: 'error' });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <div>
      {' '}
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
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            isOwner={blog.user.username === user.username}
          />
        ))}
    </div>
  );
  return (
    <div>
      {!user && loginForm()}

      <Notification notification={notification} />
      {user && (
        <div>
          <p>
            {user.name} logged in{' '}
            <button onClick={handleLogout}>log out</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogsRender()}
        </div>
      )}
    </div>
  );
};

export default App;
