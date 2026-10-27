import type { Metadata } from "next";
import { ExternalLink } from "@/components/external-link";
import { InstitutionalAccessNotice } from "@/components/institutional-access-notice";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/config/site";
import { Notice } from "@/components/notice";
import { Icon } from "@/components/icon";
import { LinkButton } from "@/components/link-button";

export const metadata: Metadata = {
  title: "Empréstimos de materiais",
  description: `Solicite empréstimos de materiais pelo formulário oficial no Microsoft Forms, com sua conta institucional ${siteConfig.institutionalEmailDomain}. O envio não autoriza o empréstimo nem garante disponibilidade.`,
};

export default function LoansPage() {
  return (
    <>
      <PageIntro
        eyebrow="Materiais do laboratório"
        title="Solicite um empréstimo"
        description="A solicitação de empréstimo de materiais é feita pelo Microsoft Forms. Use o formulário oficial com sua conta institucional."
      />
      <div className="loans-layout">
        <section className="surface loans-access" aria-labelledby="formulario-emprestimos">
          <span className="card-icon"><Icon name="box" /></span>
          <div className="section-heading"><h2 id="formulario-emprestimos">Formulário de empréstimos</h2></div>
          <p className="section-description">Abra o formulário oficial em uma nova aba para preencher seu pedido de empréstimo de materiais.</p>
          <InstitutionalAccessNotice />
          <ExternalLink href={siteConfig.links.loans}>Solicitar empréstimo de materiais</ExternalLink>
        </section>
        <div className="loans-next-steps">
          <Notice title="Sobre sua solicitação">
            O preenchimento do formulário não autoriza o empréstimo nem garante a disponibilidade dos materiais.
          </Notice>
          <section className="surface prose-block" aria-labelledby="atividades-praticas">
            <p className="eyebrow">Outro serviço</p>
            <h2 id="atividades-praticas">Agendamento de atividades práticas</h2>
            <p>Para solicitar uma atividade prática no laboratório, acesse a página de agendamento. Ela leva a um formulário específico para essa finalidade.</p>
            <div className="action-group"><LinkButton href="/agendamento" variant="secondary">Ir para agendamento<Icon name="arrow" /></LinkButton></div>
          </section>
        </div>
      </div>
    </>
  );
}
