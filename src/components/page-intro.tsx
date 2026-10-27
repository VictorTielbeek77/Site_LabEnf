import { Icon } from "@/components/icon";
import type { ReactNode } from "react";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageIntro({ eyebrow, title, description, children }: PageIntroProps) {
  return (
    <div className="page-intro">
      <div className="intro-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="intro-description">{description}</p>
        {children}
      </div>
      <div className="intro-graphic" aria-hidden="true">
        <div className="graphic-orbit" />
        <div className="graphic-tile graphic-tile--book"><Icon name="book" /></div>
        <div className="graphic-tile graphic-tile--calendar"><Icon name="calendar" /></div>
        <div className="graphic-tile graphic-tile--clipboard"><Icon name="clipboard" /></div>
        <span className="graphic-dot" />
      </div>
    </div>
  );
}
