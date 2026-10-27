import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { ServicesGrid } from "@/components/services-grid";
import { LinkButton } from "@/components/link-button";
import { Icon } from "@/components/icon";
import { InstitutionalAccessNotice } from "@/components/institutional-access-notice";

export default function HomePage() {
  return (
    <>
      <PageIntro eyebrow={`${siteConfig.unit} · ${siteConfig.location}`} title={siteConfig.name} description={siteConfig.description}>
        <div className="action-group">
          <LinkButton href="/calendario"><Icon name="calendar" />Consultar disponibilidade</LinkButton>
          <LinkButton href="/agendamento" variant="secondary">Solicitar agendamento<Icon name="arrow" /></LinkButton>
        </div>
      </PageIntro>
      <section aria-labelledby="servicos">
        <div className="section-heading"><h2 id="servicos">O que você precisa fazer?</h2><span>Consultas e solicitações em um só lugar</span></div>
        <ServicesGrid />
      </section>
      <div className="planning-grid content-section">
        <section aria-labelledby="como-agendar">
          <div className="section-heading"><h2 id="como-agendar">Como solicitar uma atividade prática</h2></div>
          <ol className="scheduling-steps" role="list">
            <li><span className="step-number" aria-hidden="true">01</span><div><h3>Consulte o calendário</h3><p>Verifique a disponibilidade e os títulos das atividades antes de fazer sua solicitação.</p><Link href="/calendario" className="text-link">Consultar calendário<Icon name="arrow" /></Link></div></li>
            <li><span className="step-number" aria-hidden="true">02</span><div><h3>Preencha o formulário</h3><p>Na página de agendamento, abra o Microsoft Forms e preencha o formulário com sua conta institucional.</p><Link href="/agendamento" className="text-link">Ir para agendamento<Icon name="arrow" /></Link></div></li>
          </ol>
        </section>
        <div className="access-panel"><InstitutionalAccessNotice plural /></div>
      </div>
      <section className="about-band" aria-labelledby="conheca-laboratorio">
        <div><p className="eyebrow">{siteConfig.institution}</p><h2 id="conheca-laboratorio">Conheça o laboratório</h2><p>{siteConfig.unit} · {siteConfig.location}</p></div>
        <LinkButton href="/sobre" variant="secondary">Sobre o laboratório<Icon name="arrow" /></LinkButton>
      </section>
    </>
  );
}
