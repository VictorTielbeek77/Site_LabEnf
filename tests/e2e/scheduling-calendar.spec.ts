import { expect, test } from "@playwright/test";

const schedulingUrl = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=oZs17AtjK024M8jm1I-AWTkrZBLET_hFqD2qWSep34xUQjU4SDJZM0hZRlFRSjJZS1JLWDBaSlRQRS4u";
const calendarUrl = "https://outlook.office365.com/owa/calendar/1f55ee17a1df4a88b43911ee2e6e16a3@unb.br/0532916ae588446d914aea293c0d36226926018211775067093/calendar.html";

test("agendamento apresenta calendário antes do Forms e explica o acesso institucional", async ({ page }) => {
  await page.goto("/agendamento");
  const main = page.getByRole("main");
  const steps = page.getByRole("region", { name: "Do calendário à solicitação" }).getByRole("listitem");
  await expect(steps).toHaveCount(2);
  await expect(steps.nth(0).getByRole("heading")).toHaveText("Consulte a disponibilidade");
  await expect(steps.nth(1).getByRole("heading")).toHaveText("Preencha o formulário oficial");
  await expect(steps.nth(0).getByRole("link")).toHaveAttribute("href", "/calendario");
  await expect(steps.nth(1).getByRole("link")).toHaveAttribute("href", schedulingUrl);
  await expect(main).toContainText("Microsoft Forms");
  const notice = page.getByRole("complementary", { name: "Acesso ao formulário", exact: true });
  await expect(notice).toContainText("@unb.br");
  await expect(notice).toContainText("A autenticação é feita pela Microsoft");
  await expect(notice).toContainText("não representa confirmação automática");
  await expect(main).toContainText("O envio do formulário não equivale à confirmação de uma reserva");
  await expect(main.locator("form, input, iframe")).toHaveCount(0);
});

test("calendário mantém acesso oficial sem simular eventos ou interpretar falhas como disponibilidade", async ({ page }) => {
  await page.goto("/calendario");
  const main = page.getByRole("main");
  await expect(main.getByRole("link", { name: /Consultar calendário oficial/ })).toHaveAttribute("href", calendarUrl);
  await expect(main).toContainText("disponibilidade de horários e os títulos das atividades");
  await expect(main).toContainText("A consulta ao calendário não faz uma reserva");
  await expect(page.getByRole("complementary", { name: "Se o calendário não carregar" })).toContainText("não significa que não há atividades agendadas ou que um horário está livre");
  await expect(main.getByRole("link", { name: "Ir para agendamento" })).toHaveAttribute("href", "/agendamento");
  await expect(main.locator("iframe, table, form")).toHaveCount(0);
  await expect(main).not.toContainText(/nenhuma atividade agendada|horário garantido|atualização automática por API/i);
});

for (const width of [320, 1440]) {
  test(`botões abrem nova aba e solicitam as URLs exatas a ${width}px (destinos interceptados)`, async ({ page, context }) => {
    await page.setViewportSize({ width, height: 900 });
    const requests: { url: string; method: string }[] = [];
    // No fake successful response: intercept and abort only the external navigation.
    // This proves the new-tab action and URL, not Microsoft availability or login.
    for (const pattern of ["https://forms.cloud.microsoft/**", "https://outlook.office365.com/**"]) {
      await context.route(pattern, async (route) => {
        requests.push({ url: route.request().url(), method: route.request().method() });
        await route.abort("blockedbyclient");
      });
    }
    for (const [path, label, expected] of [
      ["/agendamento", "Abrir formulário de agendamento", schedulingUrl],
      ["/calendario", "Consultar calendário oficial", calendarUrl],
    ]) {
      await page.goto(path);
      const link = page.getByRole("main").getByRole("link", { name: new RegExp(label) });
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
      await expect(link).toHaveAttribute("rel", /noreferrer/);
      await expect(link).toContainText("Abre em nova aba");
      const [popup] = await Promise.all([context.waitForEvent("page"), link.click()]);
      await expect.poll(() => requests.some((request) => request.url === expected && request.method === "GET")).toBe(true);
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(link).toBeVisible();
      await popup.close();
    }
    expect(requests.every((request) => request.method === "GET")).toBe(true);
    await page.getByRole("main").getByRole("link", { name: "Ir para agendamento" }).click();
    await expect(page).toHaveURL(/\/agendamento$/);
    await page.getByRole("link", { name: "Consultar o calendário antes de solicitar" }).click();
    await expect(page).toHaveURL(/\/calendario$/);
  });
}

test.describe("acesso estático", () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });
  test("os botões oficiais continuam disponíveis sem JavaScript", async ({ page }) => {
    for (const [path, url] of [["/agendamento", schedulingUrl], ["/calendario", calendarUrl]]) {
      await page.goto(path);
      await expect(page.getByRole("main").locator(`a[href="${url}"]`)).toBeVisible();
    }
  });
});
