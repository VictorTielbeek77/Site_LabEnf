import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/agendamento", "/calendario", "/pops", "/emprestimos", "/sobre"];

test("auditoria: acesso direto, metadados, console e recursos das seis páginas", async ({ page }, testInfo) => {
  const errors: string[] = [];
  const failedRequests: string[] = [];
  const badResponses: string[] = [];
  const assets = new Set<string>();
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const observations: object[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`${message.text()} (${message.location().url})`);
  });
  page.on("requestfailed", (request) => failedRequests.push(`${request.url()}: ${request.failure()?.errorText}`));
  page.on("response", (response) => {
    if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`);
    if (["script", "stylesheet", "font", "image"].includes(response.request().resourceType())) assets.add(response.url());
  });
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    // Capture late prefetch/resource failures before moving to another document.
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    const title = await page.title();
    expect(title).toContain("Laboratório de Enfermagem/FS");
    expect(titles.has(title)).toBe(false);
    titles.add(title);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description!.length).toBeGreaterThan(30);
    expect(descriptions.has(description!)).toBe(false);
    descriptions.add(description!);
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute("content", /width=device-width/);
    await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
    expect(await page.locator("img").evaluateAll((images) => images.every((image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))).toBe(true);
    observations.push({ route, status: response?.status(), title, description });
  }
  expect(assets.size).toBeGreaterThan(0);
  await testInfo.attach("rotas-recursos-console", { body: JSON.stringify({ observations, assetCount: assets.size, errors, failedRequests, badResponses }, null, 2), contentType: "application/json" });
  expect(errors).toEqual([]);
  expect(failedRequests).toEqual([]);
  expect(badResponses).toEqual([]);
});

test("auditoria: rota inexistente retorna 404, noindex e permite voltar ao início", async ({ page }) => {
  const response = await page.goto("/auditoria/rota-que-nao-existe");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("não foi encontrado");
  await expect(page).toHaveTitle(/não encontrad[ao]|404/i);
  await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(1);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  const scan = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(scan.violations).toEqual([]);
  await page.getByRole("link", { name: "Voltar ao início", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Laboratório de Enfermagem/FS");
});

for (const menuOpen of [false, true]) {
  test(`auditoria: foco preservado ao ampliar celular para desktop (menu ${menuOpen ? "aberto" : "fechado"})`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/pops");
    const toggle = page.getByRole("button", { name: /menu/ });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    if (!menuOpen) {
      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
    }
    await toggle.focus();
    await expect(toggle).toBeFocused();
    await page.setViewportSize({ width: 1440, height: 1000 });
    const current = page.getByRole("navigation", { name: "Navegação principal" }).locator('[aria-current="page"]');
    await expect(current).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link", { name: "Empréstimos", exact: true })).toBeFocused();
  });
}

test("auditoria: texto a 200% mantém conteúdo e ações sem rolagem horizontal", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of routes) {
    await page.goto(route);
    await page.addStyleTag({ content: "html { font-size: 200%; }" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), route).toBe(true);
    const menu = page.getByRole("button", { name: /menu/ });
    const menuBox = (await menu.boundingBox())!;
    const brandText = await page.getByRole("banner").getByRole("link", { name: /— Início$/ }).evaluate((element) => {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const rectangles: { x: number; y: number; width: number; height: number }[] = [];
      let node: Node | null;
      while ((node = walker.nextNode())) {
        if (!node.textContent?.trim()) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        for (const rect of range.getClientRects()) rectangles.push({ x: rect.x, y: rect.y, width: rect.width, height: rect.height });
      }
      return rectangles;
    });
    for (const text of brandText) {
      const overlap = text.x < menuBox.x + menuBox.width && text.x + text.width > menuBox.x && text.y < menuBox.y + menuBox.height && text.y + text.height > menuBox.y;
      expect(overlap, `${route}: nome do laboratório sobreposto pelo menu`).toBe(false);
    }
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${route} com menu`).toBe(true);
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    for (const action of await page.locator("main .button").all()) {
      await expect(action).toBeVisible();
      expect(await action.evaluate((element) => element.scrollWidth <= element.clientWidth + 1), `${route}: ação com texto cortado`).toBe(true);
    }
  }
});

test("auditoria: tablet 1024px, contraste em foco/hover e ações pelo teclado", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of routes) {
    await page.goto(route);
    const action = page.getByRole("main").getByRole("link").first();
    await action.hover();
    await page.keyboard.press("Tab");
    await action.focus();
    await expect(action).toHaveCSS("outline-style", "solid");
    const scan = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(scan.violations, `${route}: ${JSON.stringify(scan.violations)}`).toEqual([]);
    expect(scan.incomplete.filter((result) => result.id === "color-contrast")).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await expect(page.getByRole("navigation", { name: "Navegação principal" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test("auditoria: calendário continua útil após bloqueio da navegação externa", async ({ page, context }) => {
  let blocked = 0;
  await context.route("https://outlook.office365.com/**", async (route) => {
    blocked++;
    await route.abort("blockedbyclient");
  });
  await page.goto("/calendario");
  const button = page.getByRole("main").getByRole("link", { name: /Consultar calendário oficial/ });
  const [popup] = await Promise.all([context.waitForEvent("page"), button.click()]);
  await expect.poll(() => blocked).toBeGreaterThan(0);
  await popup.close();
  await expect(button).toBeVisible();
  await expect(page.getByRole("complementary", { name: "Se o calendário não carregar" })).toContainText("não significa que não há atividades agendadas ou que um horário está livre");
  await expect(page.getByRole("main").locator("iframe, table")).toHaveCount(0);
  await page.getByRole("main").getByRole("link", { name: "Ir para agendamento" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Solicite um agendamento");
});
