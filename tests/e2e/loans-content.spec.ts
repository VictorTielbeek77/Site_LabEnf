import { expect, test } from "@playwright/test";

const loansUrl = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=oZs17AtjK024M8jm1I-AWTkrZBLET_hFqD2qWSep34xUM0hSVVZMUElSTkJZNUdDVlg1NkVXSjg1NC4u";
const schedulingUrl = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=oZs17AtjK024M8jm1I-AWTkrZBLET_hFqD2qWSep34xUQjU4SDJZM0hZRlFRSjJZS1JLWDBaSlRQRS4u";
const calendarUrl = "https://outlook.office365.com/owa/calendar/1f55ee17a1df4a88b43911ee2e6e16a3@unb.br/0532916ae588446d914aea293c0d36226926018211775067093/calendar.html";
const routes = ["/", "/agendamento", "/calendario", "/pops", "/emprestimos", "/sobre"];
const laboratoryName = "Laboratório de Enfermagem/FS";

test("empréstimos explica o Forms e distingue pedido de autorização e disponibilidade", async ({ page }) => {
  await page.goto("/emprestimos");
  const main = page.getByRole("main");
  await expect(main.getByRole("heading", { level: 1 })).toHaveText("Solicite um empréstimo");
  await expect(main).toContainText("Microsoft Forms");
  const access = main.getByRole("complementary", { name: "Acesso ao formulário" });
  await expect(access).toContainText("@unb.br");
  await expect(access).toContainText("A autenticação é feita pela Microsoft");
  await expect(access).toContainText("não representa confirmação automática");
  await expect(main.getByRole("complementary", { name: "Sobre sua solicitação" })).toContainText("não autoriza o empréstimo nem garante a disponibilidade dos materiais");
  await expect(main.getByText("Solicitar empréstimo de materiais", { exact: true })).toBeVisible();
  // No catalog, stock or operational policies were supplied for this version.
  await expect(main).not.toContainText(/catálogo|estoque|prazo|retirada|devolução/i);
  await expect(main.locator("form, input, textarea, select, table, iframe")).toHaveCount(0);
});

for (const width of [320, 1440]) {
  test(`empréstimos abre o formulário correto a ${width}px (destino interceptado)`, async ({ page, context }) => {
    await page.setViewportSize({ width, height: 900 });
    const requests: { url: string; method: string }[] = [];
    await context.route("https://forms.cloud.microsoft/**", async (route) => {
      requests.push({ url: route.request().url(), method: route.request().method() });
      // Proves new-tab navigation and destination, without submitting or faking Forms.
      await route.abort("blockedbyclient");
    });
    await page.goto("/emprestimos");
    const button = page.getByRole("main").getByRole("link", { name: /^Solicitar empréstimo de materiais/ });
    await expect(button).toHaveAttribute("href", loansUrl);
    await expect(button).toHaveAttribute("target", "_blank");
    await expect(button).toHaveAttribute("rel", /noopener/);
    await expect(button).toHaveAttribute("rel", /noreferrer/);
    await expect(button).toContainText("Abre em nova aba");
    expect(new URL(loansUrl).searchParams.get("id")).not.toBe(new URL(schedulingUrl).searchParams.get("id"));
    const [popup] = await Promise.all([context.waitForEvent("page"), button.click()]);
    await expect.poll(() => requests.some((request) => request.url === loansUrl)).toBe(true);
    expect(requests.every((request) => request.url === loansUrl && request.method === "GET")).toBe(true);
    await expect(page).toHaveURL(/\/emprestimos$/);
    await popup.close();
    await page.getByRole("main").getByRole("link", { name: "Ir para agendamento" }).click();
    await expect(page).toHaveURL(/\/agendamento$/);
    await expect(page.getByRole("main").getByRole("link", { name: /Abrir formulário de agendamento/ })).toHaveAttribute("href", schedulingUrl);
  });
}

test("seis páginas: identidade, links, avisos externos e ausência de coleta local", async ({ page, request, context, baseURL }) => {
  const externalUrls = new Set([loansUrl, schedulingUrl, calendarUrl]);
  const internalUrls = new Set<string>();
  const unexpectedRequests: string[] = [];
  const origin = new URL(baseURL!).origin;
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.origin !== origin || !["GET", "HEAD"].includes(request.method())) unexpectedRequests.push(`${request.method()} ${url.origin}${url.pathname}`);
  });
  await page.setViewportSize({ width: 1440, height: 1000 });

  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(page).toHaveTitle(new RegExp(laboratoryName));
    await expect(page.getByRole("banner").getByRole("link", { name: `${laboratoryName} — Início`, exact: true })).toBeVisible();
    await expect(page.getByRole("contentinfo").getByText(laboratoryName, { exact: true })).toBeVisible();
    await expect(page.getByRole("main")).not.toContainText(/lorem ipsum|em construção|em breve|conteúdo de demonstração|example\.com|contato@exemplo|a definir/i);
    await expect(page.locator("form, input, textarea, select")).toHaveCount(0);

    const links = page.getByRole("link", { includeHidden: true });
    for (let index = 0; index < await links.count(); index++) {
      const link = links.nth(index);
      const href = await link.getAttribute("href");
      expect(href, `${route}: link sem destino`).toBeTruthy();
      if (href!.startsWith("#")) {
        expect(href!.length).toBeGreaterThan(1);
        await expect(page.locator(href!)).toHaveCount(1);
      } else if (href!.startsWith("https://")) {
        expect(externalUrls.has(href!)).toBe(true);
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", /noopener/);
        await expect(link).toContainText("Abre em nova aba");
      } else {
        expect(href!.startsWith("/")).toBe(true);
        internalUrls.add(href!);
      }
    }
    expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length, databases: typeof indexedDB.databases }))).toEqual({ local: 0, session: 0, databases: "function" });
    expect(await page.evaluate(async () => (await indexedDB.databases()).length)).toBe(0);
    expect(await context.cookies()).toEqual([]);
  }
  for (const path of internalUrls) expect((await request.get(path)).status(), path).toBe(200);
  expect(unexpectedRequests).toEqual([]);
});
