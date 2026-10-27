import { Icon } from "@/components/icon";
import { Notice } from "@/components/notice";
import { procedureFileUrl, type ProcedureDocument } from "@/config/procedures";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC",
});

export function ProcedureCard({ document }: { document: ProcedureDocument }) {
  const path = procedureFileUrl(document);
  const titleId = `pop-${document.id}`;
  return (
    <article className="surface procedure-card" aria-labelledby={titleId}>
      <div className="procedure-heading">
        <span className="card-icon"><Icon name="book" /></span>
        <div><p className="eyebrow">Procedimento Operacional Padrão</p><h3 id={titleId}>{document.title}</h3></div>
      </div>
      <dl className="procedure-metadata">
        <div><dt>Versão</dt><dd>{document.version}</dd></div>
        <div><dt>Elaboração</dt><dd><time dateTime={document.elaboratedAt}>{dateFormatter.format(new Date(`${document.elaboratedAt}T00:00:00Z`))}</time></dd></div>
        <div><dt>Extensão</dt><dd>{document.pages} {document.pages === 1 ? "página" : "páginas"}</dd></div>
        <div><dt>Formato</dt><dd>PDF</dd></div>
      </dl>
      {document.applicationNote && (
        <Notice title="Nota de aplicação">
          <p>Conforme o documento original:</p>
          <blockquote className="application-note">“{document.applicationNote}”</blockquote>
          <p>A disponibilização para consulta não equivale à aprovação institucional definitiva do documento.</p>
        </Notice>
      )}
      <div className="action-group procedure-actions">
        <a href={path} target="_blank" rel="noopener noreferrer" className="button button--primary" aria-label={`Consultar PDF: ${document.title}. Abre em nova aba`}>
          <span><span className="button-label">Consultar PDF<Icon name="external" /></span><span className="button-hint">Abre em nova aba</span></span>
        </a>
        <a href={`${path}?download=1`} download={document.fileName} className="button button--secondary" aria-label={`Baixar PDF: ${document.title}`}>
          Baixar PDF<Icon name="download" />
        </a>
      </div>
      <p className="procedure-help">O arquivo é o PDF original, disponibilizado integralmente. A abertura na nova aba pode variar conforme o navegador; você também pode usar a opção de download.</p>
    </article>
  );
}
