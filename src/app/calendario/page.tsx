import type { Metadata } from "next";
import { ExternalLink } from "@/components/external-link";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/icon";
import { LinkButton } from "@/components/link-button";
import { Notice } from "@/components/notice";

export const metadata: Metadata = {
  title: "Calendário e disponibilidade",
  description: "Consulte a disponibilidade e os títulos das atividades no calendário oficial do laboratório, antes de solicitar um agendamento.",
};

export default function CalendarPage() {
  return (
    <>
      <PageIntro eyebrow="Planeje sua atividade" title="Calendário e disponibilidade" description="Consulte a disponibilidade de horários e os títulos das atividades no calendário institucional do laboratório, publicado no Outlook." />
      <div className="calendar-layout">
        <section className="surface calendar-access" aria-labelledby="calendario-oficial">
          <span className="card-icon"><Icon name="calendar" /></span>
          <div className="section-heading"><h2 id="calendario-oficial">Consulte o calendário oficial</h2></div>
          <p className="section-description">Abra o calendário no Outlook e consulte o período desejado. Os horários e os títulos das atividades são exibidos na página oficial.</p>
          <ExternalLink href={siteConfig.links.calendar}>Consultar calendário oficial</ExternalLink>
          <div className="calendar-guidance">
            <h3>Como usar a consulta</h3>
            <ul role="list">
              <li>Procure o dia e o horário em que pretende realizar sua atividade.</li>
              <li>Confira a disponibilidade e os títulos das atividades publicadas.</li>
              <li>Depois da consulta, acesse a página de agendamento para preencher sua solicitação.</li>
            </ul>
          </div>
        </section>
        <div className="calendar-next-steps">
          <Notice title="Se o calendário não carregar">
            Uma falha ao abrir o calendário não significa que não há atividades agendadas ou que um horário está livre. Tente abrir o link oficial novamente antes de fazer sua solicitação.
          </Notice>
          <section className="surface prose-block" aria-labelledby="proxima-etapa">
            <p className="eyebrow">Depois da consulta</p>
            <h2 id="proxima-etapa">Solicite sua atividade</h2>
            <p>A consulta ao calendário não faz uma reserva. O pedido é feito pelo Microsoft Forms com sua conta institucional {siteConfig.institutionalEmailDomain}.</p>
            <div className="action-group"><LinkButton href="/agendamento" variant="secondary">Ir para agendamento<Icon name="arrow" /></LinkButton></div>
          </section>
        </div>
      </div>
    </>
  );
}
