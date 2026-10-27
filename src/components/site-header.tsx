import Link from "next/link";
import { siteConfig } from "@/config/site";
import { SiteNavigation } from "@/components/site-navigation";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="institution-bar"><div className="site-container institution-content">
        <span>{siteConfig.institution}</span><span>{siteConfig.unit}</span>
      </div></div>
      <div className="site-container header-content">
        <Link href="/" className="site-brand" aria-label={`${siteConfig.name} — Início`}>
          <span className="brand-prefix">{siteConfig.identity.prefix}</span>
          <span className="brand-name">{siteConfig.identity.subject}<span className="brand-unit">/{siteConfig.identity.unit}</span></span>
        </Link>
        <SiteNavigation />
      </div>
    </header>
  );
}
