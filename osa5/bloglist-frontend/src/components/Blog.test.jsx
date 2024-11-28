import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

const blog = {
  title: "test blog",
  author: "test author",
  url: "https://testurl.net",
  likes: 123,
  user: { name: "test user" },
};

test("renders title", () => {
  render(
    <Blog
      blog={blog}
      updateBlog={() => {}}
      removeBlog={() => {}}
      isOwner={false}
    />,
  );

  const element = screen.getByText("test blog", { exact: false });
  expect(element).toBeDefined();
});

test("render all details", async () => {
  render(
    <Blog
      blog={blog}
      updateBlog={() => {}}
      removeBlog={() => {}}
      isOwner={false}
    />,
  );
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  for (const [key, value] of Object.entries(blog)) {
    if (typeof value === "object") break;
    const element = screen.getByText(`${value}`, { exact: false });
    expect(element).toBeDefined();
  }

  const element = screen.getByText(`${blog.user.name}`, { exact: false });
  expect(element).toBeDefined();
});
test("register clicks on like button", async () => {
  const updateHandler = vi.fn();
  render(
    <Blog
      blog={blog}
      updateBlog={updateHandler}
      removeBlog={() => {}}
      isOwner={false}
    />,
  );
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const likeButton = screen.getByText("like");
  for (let i = 0; i < 2; i++) {
    await user.click(likeButton);
  }

  expect(updateHandler.mock.calls).toHaveLength(2);
});
