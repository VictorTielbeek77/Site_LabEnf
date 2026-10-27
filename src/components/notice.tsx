import type { ReactNode } from "react";
import { Icon } from "@/components/icon";

export function Notice({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside aria-label={title} className="notice">
      <Icon name="info" />
      <div><p className="notice-title">{title}</p><div className="notice-content">{children}</div></div>
    </aside>
  );
}
