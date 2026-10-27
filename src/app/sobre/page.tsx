import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/config/site";
import { laboratoryContent } from "@/config/laboratory-content";
import { LaboratoryDetails } from "@/components/laboratory-details";
import { ServicesGrid } from "@/components/services-grid";
import { InstitutionalAccessNotice } from "@/components/institutional-access-notice";

export const metadata: Metadata = {
  title: "Sobre o laboratório",
  description: `Conheça o ${siteConfig.name}, no ${siteConfig.location}, e encontre os acessos aos serviços do laboratório.`,
};

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow={siteConfig.institution} title="Sobre o laboratório" description={siteConfig.name} />
      <section aria-labelledby="apresentacao" className="about-overview">
        <div className="prose-block">
          <p className="eyebrow">Identificação institucional</p>
          <h2 id="apresentacao">O laboratório na UnB</h2>
          <p>O {siteConfig.name} faz parte da {siteConfig.unit} da {siteConfig.institution}, no {siteConfig.location}.</p>
          <p>Este site reúne os caminhos para consultar a disponibilidade, solicitar atividades práticas, acessar a página de POPs e solicitar empréstimos de materiais.</p>
        </div>
        <dl className="info-grid surface" aria-label="Identificação e localização">
          <div><dt>Laboratório</dt><dd>{siteConfig.name}</dd></div>
          <div><dt>Instituição</dt><dd>{siteConfig.institution}</dd></div>
          <div><dt>Unidade</dt><dd>{siteConfig.unit}</dd></div>
          <div><dt>Localização</dt><dd>{siteConfig.location}</dd></div>
        </dl>
      </section>
      <section className="content-section" aria-labelledby="guia-servicos">
        <div className="section-heading"><h2 id="guia-servicos">Encontre o serviço que você precisa</h2></div>
        <p className="section-description">Para atividades práticas, consulte primeiro o calendário e depois acesse o agendamento. Para materiais, use o formulário específico de empréstimos.</p>
        <ServicesGrid />
      </section>
      <div className="content-section"><InstitutionalAccessNotice plural /></div>
      <LaboratoryDetails content={laboratoryContent} />
    </>
  );
}
