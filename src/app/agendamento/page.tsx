import type { Metadata } from "next";
import { LinkButton } from "@/components/link-button";
import { Icon } from "@/components/icon";
import { ExternalLink } from "@/components/external-link";
import { InstitutionalAccessNotice } from "@/components/institutional-access-notice";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Agendamento de atividades práticas",
  description: `Consulte o calendário e solicite uma atividade prática pelo Microsoft Forms com sua conta ${siteConfig.institutionalEmailDomain}.`,
};

export default function SchedulingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Atividades práticas"
        title="Solicite um agendamento"
        description="O pedido de atividade prática é feito pelo Microsoft Forms. Comece consultando a disponibilidade do laboratório e depois abra o formulário oficial."
      />
      <section aria-labelledby="etapas-agendamento">
        <div className="section-heading"><h2 id="etapas-agendamento">Do calendário à solicitação</h2></div>
        <ol className="request-flow" role="list">
          <li className="surface request-step">
            <div className="request-step-heading"><span className="step-number" aria-hidden="true">01</span><h3>Consulte a disponibilidade</h3></div>
            <p className="section-description">Confira os horários e os títulos das atividades no calendário antes de preencher seu pedido.</p>
            <LinkButton href="/calendario" variant="secondary"><Icon name="calendar" />Consultar o calendário antes de solicitar</LinkButton>
          </li>
          <li className="surface request-step">
            <div className="request-step-heading"><span className="step-number" aria-hidden="true">02</span><h3>Preencha o formulário oficial</h3></div>
            <p className="section-description">Abra o Microsoft Forms em uma nova aba e preencha sua solicitação com a conta institucional.</p>
            <InstitutionalAccessNotice />
            <ExternalLink href={siteConfig.links.scheduling}>Abrir formulário de agendamento</ExternalLink>
            <p className="request-disclaimer">O envio do formulário não equivale à confirmação de uma reserva.</p>
          </li>
        </ol>
      </section>
    </>
  );
}
