import { siteConfig } from "@/config/site";
import { Notice } from "@/components/notice";

export function InstitutionalAccessNotice({ plural = false }: { plural?: boolean }) {
  return (
    <Notice title={plural ? "Acesso aos formulários" : "Acesso ao formulário"}>
      {plural ? "Os formulários de agendamento e empréstimo exigem uma conta institucional" : "O formulário exige uma conta institucional"} {siteConfig.institutionalEmailDomain}.
      A autenticação é feita pela Microsoft. O envio registra uma solicitação e não representa confirmação automática.
    </Notice>
  );
}
