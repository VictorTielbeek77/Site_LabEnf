import { expect, test } from "@playwright/test";

const destinations = new Map([
  ["/", "Laboratório de Enfermagem/FS"],
  ["/agendamento", "Solicite um agendamento"],
  ["/calendario", "Calendário e disponibilidade"],
  ["/pops", "Procedimentos Operacionais Padrão"],
  ["/emprestimos", "Solicite um empréstimo"],
  ["/sobre", "Sobre o laboratório"],
]);

const officialLinks = new Map([
  ["/agendamento", "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=oZs17AtjK024M8jm1I-AWTkrZBLET_hFqD2qWSep34xUQjU4SDJZM0hZRlFRSjJZS1JLWDBaSlRQRS4u"],
  ["/calendario", "https://outlook.office365.com/owa/calendar/1f55ee17a1df4a88b43911ee2e6e16a3@unb.br/0532916ae588446d914aea293c0d36226926018211775067093/calendar.html"],
  ["/emprestimos", "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=oZs17AtjK024M8jm1I-AWTkrZBLET_hFqD2qWSep34xUM0hSVVZMUElSTkJZNUdDVlg1NkVXSjg1NC4u"],
]);

for (const width of [320, 390, 1440]) {
  test(`todos os acessos de Início e Sobre funcionam a ${width}px`, async ({ page, request }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    for (const source of ["/", "/sobre"]) {
      await page.goto(source);
      const main = page.getByRole("main");
      const links = await main.getByRole("link").evaluateAll((elements) => elements.map((element) => element.getAttribute("href")));
      expect(links.length).toBeGreaterThan(0);
      expect(new Set(links)).toEqual(source === "/" ? new Set(["/calendario", "/agendamento", "/pops", "/emprestimos", "/sobre"]) : new Set(["/calendario", "/agendamento", "/pops", "/emprestimos"]));

      // Verify every shared header/footer destination, without requesting external services.
      const allTargets = new Set(await page.getByRole("link", { includeHidden: true }).evaluateAll((elements) => elements.map((element) => element.getAttribute("href"))));
      for (const target of allTargets) {
        expect(target).not.toBeNull();
        if (target?.startsWith("#")) {
          await expect(page.locator(target)).toHaveCount(1);
        } else {
          expect(destinations.has(target!)).toBe(true);
          expect((await request.get(target!)).status()).toBe(200);
        }
      }

      // Click every content link, including repeated calls to action and the steps.
      for (let index = 0; index < links.length; index++) {
        const target = links[index]!;
        await page.goto(source);
        const link = page.getByRole("main").getByRole("link").nth(index);
        await expect(link).toBeVisible();
        await link.click();
        await expect(page).toHaveURL(new RegExp(`${target === "/" ? "/" : target}$`));
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(destinations.get(target)!);
        if (officialLinks.has(target)) {
          const external = page.getByRole("main").locator(`a[href="${officialLinks.get(target)}"]`);
          await expect(external).toBeVisible();
          await expect(external).toHaveAttribute("target", "_blank");
          await expect(external).toContainText("Abre em nova aba");
        }
      }
    }
    expect(errors).toEqual([]);
  });
}

test("percurso calendário → formulário, aviso institucional e dados confirmados", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Laboratório de Enfermagem/FS");
  const steps = page.getByRole("region", { name: "Como solicitar uma atividade prática" }).getByRole("listitem");
  await expect(steps).toHaveCount(2);
  await expect(steps.nth(0)).toContainText("Consulte o calendário");
  await expect(steps.nth(1)).toContainText("Preencha o formulário");
  await expect(steps.nth(0).getByRole("link")).toHaveAttribute("href", "/calendario");
  await expect(steps.nth(1).getByRole("link")).toHaveAttribute("href", "/agendamento");

  for (const route of ["/", "/sobre"]) {
    await page.goto(route);
    const notice = page.getByRole("complementary", { name: "Acesso aos formulários" });
    await expect(notice).toContainText("agendamento e empréstimo");
    await expect(notice).toContainText("@unb.br");
    await expect(notice).toContainText("Microsoft");
    await expect(notice).toContainText("não representa confirmação automática");
  }

  const facts = page.getByLabel("Identificação e localização", { exact: true });
  await expect(facts).toContainText("Universidade de Brasília");
  await expect(facts).toContainText("Faculdade de Ciências da Saúde");
  await expect(facts).toContainText("Campus UnB Asa Norte");
  // Optional content is intentionally absent until real information is supplied.
  await expect(page.getByRole("heading", { name: /^(Contatos|Espaços do laboratório|Fotos do laboratório)$/ })).toHaveCount(0);
  await expect(page.getByRole("main").locator('a[href^="mailto:"], a[href^="tel:"], img')).toHaveCount(0);
  await expect(page.getByRole("main")).not.toContainText(/lorem ipsum|a definir|em breve|telefone:|horário de funcionamento:/i);
});
