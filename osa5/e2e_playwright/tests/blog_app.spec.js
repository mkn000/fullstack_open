const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await page.goto("http://localhost:5173");
    const header = await page.getByText("Log in to application");
    await expect(header).toBeVisible();
    const boxes = await page.getByRole("textbox").all();
    await expect(boxes).toHaveLength(2);
  });
});
