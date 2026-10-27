import { expect, test } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

// Recorded from the original attachment, independently of the page's catalog.
const originalSha256 = "fc2276351426f5a40e87e4bc809738bef1bdf5b00798c99d2e2ad20c67b10a72";
const fileName = "POP_LABS_ENF_UnB_.pdf";
const pdfUrl = `/documents/${fileName}`;
const documentTitle = "Gerenciamento e descarte seguro de resíduos";
const note = "A adequação desse fluxo deverá ser validada com a SeMA/CGR antes da implementação definitiva deste POP.";
const sha256 = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");

test("PDF original e respostas HTTP de consulta e download preservam os mesmos bytes", async ({ request }) => {
  const localFile = await readFile(`public/documents/${fileName}`);
  expect(localFile.length).toBe(150290);
  expect(sha256(localFile)).toBe(originalSha256);

  for (const [url, disposition] of [[pdfUrl, "inline"], [`${pdfUrl}?download=1`, "attachment"]]) {
    const response = await request.get(url);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/^application\/pdf\b/);
    expect(response.headers()["content-disposition"]).toBe(disposition);
    expect(response.headers()["x-content-type-options"]).toBe("nosniff");
    const bytes = await response.body();
    expect(bytes.length).toBe(150290);
    expect(sha256(bytes)).toBe(originalSha256);
    expect(bytes.equals(localFile)).toBe(true);
    const head = await request.head(url);
    expect(head.status()).toBe(200);
    expect(head.headers()["content-type"]).toMatch(/^application\/pdf\b/);
    expect(head.headers()["content-disposition"]).toBe(disposition);
  }

  const range = await request.get(pdfUrl, { headers: { Range: "bytes=0-15" } });
  expect(range.status()).toBe(206);
  expect(range.headers()["content-range"]).toBe("bytes 0-15/150290");
  expect((await range.body()).equals(localFile.subarray(0, 16))).toBe(true);
});

for (const width of [320, 1440]) {
  test(`metadados, consulta em nova aba e download íntegro a ${width}px`, async ({ page, context }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/pops");
    const article = page.getByRole("article", { name: documentTitle });
    await expect(article.getByRole("heading", { name: documentTitle, exact: true })).toBeVisible();
    await expect(article.getByText("01", { exact: true })).toBeVisible();
    await expect(article.getByText("4 páginas", { exact: true })).toBeVisible();
    await expect(article.locator("time")).toHaveText("19/10/2026");
    await expect(article.locator("time")).toHaveAttribute("datetime", "2026-10-19");
    const notice = article.getByRole("complementary", { name: "Nota de aplicação" });
    await expect(notice).toBeVisible();
    await expect(notice).toContainText(note);
    await expect(notice).toContainText("não equivale à aprovação institucional definitiva");
    await expect(page.getByRole("main").locator("iframe, object, embed")).toHaveCount(0);

    const consult = article.getByRole("link", { name: `Consultar PDF: ${documentTitle}. Abre em nova aba`, exact: true });
    await expect(consult).toHaveAttribute("href", pdfUrl);
    await expect(consult).toHaveAttribute("target", "_blank");
    await expect(consult).toHaveAttribute("rel", /noopener/);
    await expect(consult).toContainText("Abre em nova aba");
    const [popup, response] = await Promise.all([
      context.waitForEvent("page"),
      context.waitForEvent("response", (response) => new URL(response.url()).pathname === pdfUrl && response.status() === 200),
      consult.click(),
    ]);
    expect(response.headers()["content-type"]).toMatch(/^application\/pdf\b/);
    expect(response.headers()["content-disposition"]).toBe("inline");
    await expect(page).toHaveURL(/\/pops$/);
    if (!popup.isClosed()) await popup.close();

    const downloadLink = article.getByRole("link", { name: `Baixar PDF: ${documentTitle}`, exact: true });
    await expect(downloadLink).toHaveAttribute("href", `${pdfUrl}?download=1`);
    await expect(downloadLink).toHaveAttribute("download", fileName);
    const [download] = await Promise.all([page.waitForEvent("download"), downloadLink.click()]);
    expect(await download.failure()).toBeNull();
    expect(download.suggestedFilename()).toBe(fileName);
    const downloadedPath = await download.path();
    expect(downloadedPath).not.toBeNull();
    const savedBytes = await readFile(downloadedPath!);
    expect(savedBytes.length).toBe(150290);
    expect(sha256(savedBytes)).toBe(originalSha256);
    await expect(page).toHaveURL(/\/pops$/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}
