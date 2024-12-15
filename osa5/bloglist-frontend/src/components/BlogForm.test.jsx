import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

const blog = {
  title: "test blog",
  author: "test author",
  url: "https://testurl.net",
  likes: 123,
  user: { name: "test user" },
};

test("BlogForm calls callback with right data on submit", async () => {
  const user = userEvent.setup();
  const createBlog = vi.fn();

  const { container } = render(<BlogForm createBlog={createBlog} />);

  const titleInput = container.querySelector('[name="Title"]');
  const authorInput = container.querySelector('[name="Author"]');
  const urlInput = container.querySelector('[name="Url"]');
  const button = screen.getByText("create");

  await user.type(titleInput, blog.title);
  await user.type(authorInput, blog.author);
  await user.type(urlInput, blog.url);
  await user.click(button);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].author).toBe(blog.author);
  expect(createBlog.mock.calls[0][0].title).toBe(blog.title);
  expect(createBlog.mock.calls[0][0].url).toBe(blog.url);
});
