const { test, expect, beforeEach, describe } = require("@playwright/test");
const { before } = require("node:test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Testi Käyttäjä",
        username: "testuser",
        password: "testpw",
      },
    });
    await request.post("/api/users", {
      data: {
        name: "Toinen Käyttäjä",
        username: "anotheruser",
        password: "anotherpw",
      },
    });
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await page.goto("/");
    const header = await page.getByText("Log in to application");
    await expect(header).toBeVisible();
    const boxes = await page.getByRole("textbox").all();
    await expect(boxes).toHaveLength(2);
  });

  describe("Login", async () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.goto("/");
      const boxes = await page.getByRole("textbox").all();
      await boxes[0].fill("testuser");
      await boxes[1].fill("testpw");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("Testi Käyttäjä logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.goto("/");
      const boxes = await page.getByRole("textbox").all();
      await boxes[0].fill("asjdhka");
      await boxes[1].fill("jdlakj");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("wrong credentials")).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.goto("/");
      const boxes = await page.getByRole("textbox").all();
      await boxes[0].fill("testuser");
      await boxes[1].fill("testpw");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      const boxes = await page.getByRole("textbox").all();
      await boxes[0].fill("test blogtitle");
      await boxes[1].fill("test blogauthor");
      await boxes[2].fill("test blogurl");
      await page.getByRole("button", { name: "create" }).click();

      await expect(
        page.locator(
          "div:has-text('test blogtitle test blogauthor'):below(h2:has-text('blogs'))",
        ),
      ).toBeVisible();
    });

    describe("and when blog exists", () => {
      beforeEach(async ({ page }) => {
        await page.getByRole("button", { name: "new blog" }).click();
        const boxes = await page.getByRole("textbox").all();
        await boxes[0].fill("test blogtitle");
        await boxes[1].fill("test blogauthor");
        await boxes[2].fill("test blogurl");
        await page.getByRole("button", { name: "create" }).click();
      });

      test("blog can be liked", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();
        await expect(page.getByText("likes 0")).toBeVisible();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("likes 1")).toBeVisible();
      });

      test("blog can be removed", async ({ page }) => {
        page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "view" }).click();
        await page.getByRole("button", { name: "remove" }).click();
        await expect(page.getByText("blog removed successfully")).toBeVisible();
      });

      describe("but when logged in as another user", () => {
        beforeEach(async ({ page }) => {
          await page.goto("/");

          await page.getByRole("button", { name: "log out" }).click();
          const boxes = await page.getByRole("textbox").all();
          await boxes[0].fill("anotheruser");
          await boxes[1].fill("anotherpw");
          await page.getByRole("button", { name: "login" }).click();
        });
        test("remove button is unavailable", async ({ page }) => {
          await page.getByRole("button", { name: "view" }).click();
          await expect(
            page.getByRole("button", { name: "like" }),
          ).toBeVisible();
          await expect(
            page.getByRole("button", { name: "remove" }),
          ).not.toBeVisible();
        });
      });
    });
  });
});
