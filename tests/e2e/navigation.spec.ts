import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/agendamento", "/calendario", "/pops", "/emprestimos", "/sobre"];

test("menu móvel: teclado, Escape, seleção e histórico", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Navegação principal" });
  const toggle = page.getByRole("button", { name: /menu/ });
  await expect(nav).toBeHidden();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Pular para o conteúdo" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();

  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(nav).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(nav.getByRole("link", { name: "Início", exact: true })).toBeFocused();
  await expect(nav.getByRole("link", { name: "Início", exact: true })).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();

  await page.keyboard.press("Space");
  await nav.getByRole("link", { name: "Agendamento", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/agendamento$/);
  await expect(nav).toBeHidden();
  await expect(page.getByRole("button", { name: "Abrir menu" })).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(nav.locator('[aria-current="page"]')).toHaveAttribute("href", "/agendamento");
  await page.goBack();
  await expect(nav).toBeHidden();
});

test("menu fecha ao clicar fora, sair com Tab e mudar o tamanho da tela", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Navegação principal" });
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page.getByRole("heading", { level: 1 }).click();
  await expect(nav).toBeHidden();
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await nav.getByRole("link").last().focus();
  await page.keyboard.press("Tab");
  await expect(nav).toBeHidden();
  await expect(page.getByRole("main").getByRole("link").first()).toBeFocused();

  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(nav).toBeVisible();
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeHidden();
  await nav.getByRole("link").last().focus();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(nav).toBeHidden();
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
  await page.setViewportSize({ width: 1440, height: 1000 });
  const contentLink = page.getByRole("main").getByRole("link").first();
  await contentLink.focus();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(contentLink).toBeFocused();
});

for (const width of [320, 390, 768, 1152, 1440]) {
  test(`seis rotas sem rolagem horizontal a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const menu = page.getByRole("button", { name: "Abrir menu" });
      if (width < 1152) await menu.click();
      const nav = page.getByRole("navigation", { name: "Navegação principal" });
      await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
      await expect(nav.locator('[aria-current="page"]')).toHaveAttribute("href", route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      if (width < 1152) {
        await page.keyboard.press("Escape");
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      }
    }
  });
}

for (const width of [390, 1440]) {
  test(`acessibilidade automática e contraste nas seis rotas a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of routes) {
      await page.goto(route);
      if (width < 1152) await page.getByRole("button", { name: "Abrir menu" }).click();
      const scan = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      expect(scan.violations, `${route}: ${JSON.stringify(scan.violations)}`).toEqual([]);
      expect(scan.incomplete.filter((result) => result.id === "color-contrast"), `${route}: contraste inconclusivo`).toEqual([]);
    }
  });
}

test("preferência por movimento reduzido desativa animações e transições", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("main").getByRole("link").first().hover();
  const motion = await page.evaluate(() => Array.from(document.querySelectorAll("*"), (node) => {
    const style = getComputedStyle(node);
    return { animation: style.animationName, transition: style.transitionDuration };
  }));
  expect(motion.every((style) => style.animation === "none" && style.transition.split(",").every((value) => parseFloat(value) === 0))).toBe(true);
});

test("navegação desktop por teclado e ausência de erros JavaScript", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const nav = page.getByRole("navigation", { name: "Navegação principal" });
  await expect(nav.getByRole("link", { name: "Início", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/agendamento$/);
  await expect(nav.locator('[aria-current="page"]')).toHaveText("Agendamento");
  expect(errors).toEqual([]);
});
