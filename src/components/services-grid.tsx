import { siteConfig, type SitePath } from "@/config/site";
import type { IconName } from "@/components/icon";
import { ServiceCard } from "@/components/service-card";

const icons: Record<Exclude<SitePath, "/" | "/sobre">, IconName> = {
  "/calendario": "calendar", "/agendamento": "clipboard", "/pops": "book", "/emprestimos": "box",
};

export function ServicesGrid() {
  return <div className="service-grid">{siteConfig.services.map((service) => <ServiceCard key={service.href} href={service.href} title={service.title} description={service.description} icon={icons[service.href]} />)}</div>;
}
