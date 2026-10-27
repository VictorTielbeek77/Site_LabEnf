import Link from "next/link";
import type { SitePath } from "@/config/site";
import { Icon, type IconName } from "@/components/icon";

export function ServiceCard({ href, title, description, icon }: { href: SitePath; title: string; description: string; icon: IconName }) {
  return (
    <Link href={href} className="service-card">
      <span className="card-icon"><Icon name={icon} /></span>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="card-action" aria-hidden="true">Acessar <Icon name="arrow" /></span>
    </Link>
  );
}
