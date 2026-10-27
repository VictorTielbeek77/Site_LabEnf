import { LinkButton } from "@/components/link-button";
import { PageIntro } from "@/components/page-intro";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "Este endereço não foi encontrado. Volte ao início para acessar os serviços do laboratório.",
};

export default function NotFound() {
  return (
    <>
      <PageIntro eyebrow="Página não encontrada" title="Este endereço não foi encontrado" description="Use o menu para acessar os serviços do laboratório ou volte à página inicial." />
      <LinkButton href="/" variant="secondary">Voltar ao início</LinkButton>
    </>
  );
}
