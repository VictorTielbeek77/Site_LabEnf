import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { ProcedureCard } from "@/components/procedure-card";
import { procedures } from "@/config/procedures";

export const metadata: Metadata = {
  title: "Procedimentos Operacionais Padrão",
  description: "Consulte e baixe o PDF original de Gerenciamento e descarte seguro de resíduos, com sua nota de aplicação e dados de versão.",
};

export default function ProceduresPage() {
  return (
    <>
      <PageIntro eyebrow="Documentação" title="Procedimentos Operacionais Padrão" description="Consulte os POPs do laboratório em sua versão original e baixe os arquivos para leitura. Confira os dados de cada documento e sua nota de aplicação." />
      <section aria-labelledby="documentos-disponiveis">
        <div className="section-heading"><h2 id="documentos-disponiveis">Documentos disponíveis</h2><span>Consulta e download do documento integral</span></div>
        <div className="procedures-list">{procedures.map((document) => <ProcedureCard key={document.id} document={document} />)}</div>
      </section>
    </>
  );
}
