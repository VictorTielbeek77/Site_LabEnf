import type { ReactNode } from "react";
import { LinkButton } from "@/components/link-button";
import { Icon } from "@/components/icon";

type ExternalLinkProps = {
  href: `https://${string}`;
  children: ReactNode;
};

export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <LinkButton href={href}>
      <span><span className="button-label">{children}<Icon name="external" /></span><span className="button-hint">Abre em nova aba</span></span>
    </LinkButton>
  );
}
