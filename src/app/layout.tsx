import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={siteConfig.language}>
      <body className="site-body antialiased">
        <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
        <SiteHeader />
        <main id="conteudo" tabIndex={-1} className="site-container main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
