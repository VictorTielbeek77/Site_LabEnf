import { siteConfig } from "@/config/site";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-content">
          <div className="footer-identity">
            <p className="footer-kicker">{siteConfig.institution}</p>
            <p className="footer-name">{siteConfig.name}</p>
            <p>{siteConfig.unit}<br />{siteConfig.location}</p>
          </div>
          <nav aria-label="Navegação do rodapé">
            <p className="footer-kicker">Explore o site</p>
            <ul className="footer-links">{siteConfig.navigation.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
          </nav>
        </div>
        <div className="footer-bottom"><p>Ensino, prática e simulação.</p><p>Formulários com acesso institucional {siteConfig.institutionalEmailDomain}</p></div>
      </div>
    </footer>
  );
}
