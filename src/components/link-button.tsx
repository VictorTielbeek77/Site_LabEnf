import Link from "next/link";
import type { ReactNode } from "react";
import type { SitePath } from "@/config/site";

type LinkButtonProps = {
  href: SitePath | `https://${string}`;
  variant?: "primary" | "secondary";
  children: ReactNode;
};

export function LinkButton({ href, variant = "primary", children }: LinkButtonProps) {
  const className = `button button--${variant}`;
  return href.startsWith("https://")
    ? <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>
    : <Link href={href} className={className}>{children}</Link>;
}
