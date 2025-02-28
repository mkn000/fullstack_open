const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Testi Käyttäjä",
        username: "testuser",
        password: "testpw",
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

  describe("Login", async () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.goto("http://localhost:5173");
      const boxes = await page.getByRole("textbox").all();
      await boxes[0].fill("testuser");
      await boxes[1].fill("testpw");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("Testi Käyttäjä logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.goto("http://localhost:5173");
      const boxes = await page.getByRole("textbox").all();
      await boxes[0].fill("asjdhka");
      await boxes[1].fill("jdlakj");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("wrong credentials")).toBeVisible();
    });
  });
});
